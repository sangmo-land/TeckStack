import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import { Bell, X, Check, CheckCheck } from 'lucide-react';

export default function NotificationsDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            fetchNotifications();
        }
    }, [isOpen]);

    useEffect(() => {
        // Fetch unread count on mount
        fetchNotifications();
        
        // Poll for new notifications every 30 seconds
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const fetchNotifications = async () => {
        try {
            const response = await fetch('/api/notifications');
            const data = await response.json();
            setNotifications(data.notifications || []);
            setUnreadCount(data.unreadCount || 0);
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        }
    };

    const markAsRead = async (id) => {
        try {
            await fetch(`/notifications/${id}/read`, { method: 'POST' });
            fetchNotifications();
        } catch (error) {
            console.error('Failed to mark as read:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            await fetch('/notifications/read-all', { method: 'POST' });
            fetchNotifications();
        } catch (error) {
            console.error('Failed to mark all as read:', error);
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'enrollment':
                return '🎓';
            case 'review':
                return '⭐';
            case 'course_update':
                return '📚';
            case 'announcement':
                return '📢';
            default:
                return '🔔';
        }
    };

    const getTimeAgo = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        
        if (seconds < 60) return 'just now';
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
        if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
        return new Date(date).toLocaleDateString();
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200"
            >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl overflow-hidden z-50">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700 bg-slate-900">
                        <div>
                            <h3 className="text-white font-semibold">Notifications</h3>
                            {unreadCount > 0 && (
                                <p className="text-xs text-slate-400">{unreadCount} unread</p>
                            )}
                        </div>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                            >
                                <CheckCheck size={14} />
                                Mark all read
                            </button>
                        )}
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="px-4 py-12 text-center text-slate-400">
                                <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                <p className="text-sm">No notifications yet</p>
                            </div>
                        ) : (
                            notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`px-4 py-3 border-b border-slate-700 hover:bg-slate-700/50 transition-colors ${
                                        !notification.read ? 'bg-slate-700/30' : ''
                                    }`}
                                >
                                    <div className="flex gap-3">
                                        <div className="text-2xl flex-shrink-0">
                                            {getTypeIcon(notification.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <h4 className="text-sm font-medium text-white">
                                                    {notification.title}
                                                </h4>
                                                {!notification.read && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            markAsRead(notification.id);
                                                        }}
                                                        className="flex-shrink-0 p-1 text-blue-400 hover:text-blue-300"
                                                        title="Mark as read"
                                                    >
                                                        <Check size={14} />
                                                    </button>
                                                )}
                                            </div>
                                            <p className="text-sm text-slate-400 mt-1 line-clamp-2">
                                                {notification.message}
                                            </p>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="text-xs text-slate-500">
                                                    {getTimeAgo(notification.created_at)}
                                                </span>
                                                {notification.link && (
                                                    <Link
                                                        href={notification.link}
                                                        onClick={() => {
                                                            markAsRead(notification.id);
                                                            setIsOpen(false);
                                                        }}
                                                        className="text-xs text-blue-400 hover:text-blue-300"
                                                    >
                                                        View →
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

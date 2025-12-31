import React, { useState, useEffect } from 'react';
import { Link, router } from '@inertiajs/react';
import { Menu, X, Search, ShoppingCart, User, BookOpen, GraduationCap, ChevronDown, LogOut, UserCircle } from 'lucide-react';
import Dropdown from '@/Components/Dropdown';
import NotificationsDropdown from '@/Components/NotificationsDropdown';

export default function Navbar({ auth, startSolid = false }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isSolid = startSolid || isScrolled;

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                isSolid
                    ? "bg-slate-900/95 backdrop-blur-lg shadow-lg shadow-black/20 border-b border-slate-800"
                    : "bg-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center space-x-3 group"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />
                            <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                                <GraduationCap className="w-7 h-7 text-white" />
                            </div>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            NelnadoSolutions
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1">
                        <NavItem href="/courses" icon={BookOpen}>
                            Courses
                        </NavItem>
                        <NavItem href="/about">About</NavItem>
                        <NavItem href="/instructors">Instructors</NavItem>
                        <NavItem href="/contact">Contact</NavItem>
                        <NavItem href="/pricing">Pricing</NavItem>
                    </div>

                    {/* Right Section */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {/* Search Button */}
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200"
                        >
                            <Search className="w-5 h-5" />
                        </button>

                        {auth?.user ? (
                            <>
                                {/* Notifications */}
                                <NotificationsDropdown />

                                {/* Cart */}
                                <Link
                                    href="/cart"
                                    className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                        3
                                    </span>
                                </Link>

                                {/* User Menu */}
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all duration-200 group">
                                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm font-semibold">
                                                    {auth.user.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </span>
                                            </div>
                                            <span className="text-white text-sm font-medium">
                                                {auth.user.name}
                                            </span>
                                            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content align="right" width="48">
                                        <Dropdown.Link
                                            href="/dashboard"
                                            className="flex items-center space-x-2"
                                        >
                                            <GraduationCap className="w-4 h-4" />
                                            <span>Dashboard</span>
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href="/profile"
                                            className="flex items-center space-x-2"
                                        >
                                            <UserCircle className="w-4 h-4" />
                                            <span>Profile</span>
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            className="flex items-center space-x-2"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>Sign Out</span>
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="px-6 py-2.5 text-white font-medium hover:text-blue-400 transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Search Bar */}
                {isSearchOpen && (
                    <div className="hidden lg:block pb-4 animate-fadeIn">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search courses, instructors, topics..."
                                className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                autoFocus
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        const q = searchText.trim();
                                        if (q) {
                                            router.visit(
                                                `/courses?search=${encodeURIComponent(
                                                    q
                                                )}`
                                            );
                                            setIsSearchOpen(false);
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-slate-900 border-t border-slate-800 animate-slideDown">
                    <div className="px-4 py-6 space-y-3">
                        {/* Search */}
                        <div className="relative mb-4">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        const q = searchText.trim();
                                        if (q) {
                                            router.visit(
                                                `/courses?search=${encodeURIComponent(
                                                    q
                                                )}`
                                            );
                                            setIsMobileMenuOpen(false);
                                        }
                                    }
                                }}
                            />
                        </div>

                        <MobileNavItem href="/courses" icon={BookOpen}>
                            Courses
                        </MobileNavItem>
                        <MobileNavItem href="/about">About</MobileNavItem>
                        <MobileNavItem href="/instructors">
                            Instructors
                        </MobileNavItem>
                        <MobileNavItem href="/contact">Contact</MobileNavItem>
                        <MobileNavItem href="/pricing">Pricing</MobileNavItem>

                        <div className="pt-4 mt-4 border-t border-slate-800 space-y-3">
                            {auth?.user ? (
                                <>
                                    <Link
                                        href="/dashboard"
                                        className="flex items-center space-x-3 px-4 py-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                                    >
                                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                            <span className="text-white font-semibold">
                                                {auth.user.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">
                                                {auth.user.name}
                                            </p>
                                            <p className="text-slate-400 text-sm">
                                                View Dashboard
                                            </p>
                                        </div>
                                    </Link>
                                    <Link
                                        href="/cart"
                                        className="flex items-center justify-between px-4 py-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                                    >
                                        <span className="text-white font-medium">
                                            Cart
                                        </span>
                                        <span className="bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                            3
                                        </span>
                                    </Link>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="w-full text-left px-4 py-3 bg-slate-800 rounded-lg hover:bg-slate-700 text-slate-200 font-medium transition-colors"
                                    >
                                        Sign Out
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="block w-full text-center px-6 py-3 bg-slate-800 text-white font-medium rounded-lg hover:bg-slate-700 transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="block w-full text-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

// Desktop Nav Item Component
function NavItem({ href, icon: Icon, children }) {
    return (
        <Link
            href={href}
            className="flex items-center space-x-2 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200 group"
        >
            {Icon && <Icon className="w-4 h-4" />}
            <span className="font-medium">{children}</span>
        </Link>
    );
}

// Mobile Nav Item Component
function MobileNavItem({ href, icon: Icon, children }) {
    return (
        <Link
            href={href}
            className="flex items-center space-x-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200"
        >
            {Icon && <Icon className="w-5 h-5" />}
            <span className="font-medium">{children}</span>
        </Link>
    );
}

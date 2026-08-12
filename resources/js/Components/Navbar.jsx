import React, { useState, useEffect, useCallback } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import {
    Menu, X, Search, ShoppingCart, BookOpen, GraduationCap,
    ChevronDown, LogOut, UserCircle, Command, ArrowRight,
} from 'lucide-react';
import Dropdown from '@/Components/Dropdown';
import NotificationsDropdown from '@/Components/NotificationsDropdown';
import Logo from '@/Components/ui/Logo';

const NAV_LINKS = [
    { href: '/courses', label: 'Courses' },
    { href: '/about', label: 'About' },
    { href: '/instructors', label: 'Instructors' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/contact', label: 'Contact' },
];

export default function Navbar({ auth, startSolid = false }) {
    const [scrolled, setScrolled] = useState(false);
    const [progress, setProgress] = useState(0);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState('');

    const { url } = usePage();

    // Single scroll listener drives both the solid state and the progress rail.
    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            setScrolled(y > 16);
            const max = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(max > 0 ? Math.min(y / max, 1) : 0);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // ⌘K / Ctrl+K opens search, Esc closes. Expected on any modern tech site.
    useEffect(() => {
        const onKey = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setSearchOpen((v) => !v);
            }
            if (e.key === 'Escape') setSearchOpen(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    // Lock body scroll while the mobile sheet is open.
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    const submitSearch = useCallback(() => {
        const q = query.trim();
        if (!q) return;
        router.visit(`/courses?search=${encodeURIComponent(q)}`);
        setSearchOpen(false);
        setMobileOpen(false);
    }, [query]);

    const solid = startSolid || scrolled || mobileOpen;
    const isActive = (href) => url === href || url.startsWith(href + '?') || url.startsWith(href + '/');

    return (
        <>
            <header
                className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
                    solid ? 'glass border-b' : 'border-b border-transparent bg-transparent'
                }`}
            >
                <nav className="mx-auto max-w-7xl px-5 sm:px-8">
                    <div className={`flex items-center justify-between transition-all duration-500 ${solid ? 'h-16' : 'h-20'}`}>
                        <Logo />

                        {/* --- Desktop links: pill-tracked active state --------- */}
                        <div className="hidden items-center gap-0.5 lg:flex">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-300 ${
                                        isActive(link.href) ? 'text-ink' : 'text-ink-faint hover:text-ink'
                                    }`}
                                >
                                    {link.label}
                                    {isActive(link.href) && (
                                        <span className="absolute inset-x-3.5 -bottom-px h-px bg-gradient-to-r from-transparent via-flux to-transparent" />
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* --- Right cluster ------------------------------------ */}
                        <div className="hidden items-center gap-2 lg:flex">
                            <button
                                onClick={() => setSearchOpen(true)}
                                className="group flex items-center gap-2.5 rounded-lg border border-hairline bg-white/[0.02] py-2 pl-3 pr-2 text-sm text-ink-ghost transition-all duration-300 hover:border-hairline-strong hover:text-ink-dim"
                                aria-label="Search courses"
                            >
                                <Search className="h-4 w-4" />
                                <span className="hidden xl:inline">Search</span>
                                <kbd className="hidden items-center gap-0.5 rounded border border-hairline bg-void-200 px-1.5 py-0.5 font-mono text-[10px] text-ink-ghost xl:flex">
                                    <Command className="h-2.5 w-2.5" />K
                                </kbd>
                            </button>

                            {auth?.user ? (
                                <>
                                    <NotificationsDropdown />

                                    <Link
                                        href="/cart"
                                        className="relative rounded-lg p-2 text-ink-faint transition-colors duration-300 hover:bg-white/[0.05] hover:text-ink"
                                        aria-label="Cart"
                                    >
                                        <ShoppingCart className="h-[18px] w-[18px]" />
                                        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-flux px-1 font-mono text-[9px] font-semibold text-void">
                                            3
                                        </span>
                                    </Link>

                                    <div className="mx-1 h-5 w-px bg-hairline" />

                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <button className="group flex items-center gap-2 rounded-lg border border-hairline bg-white/[0.02] py-1.5 pl-1.5 pr-2.5 transition-all duration-300 hover:border-hairline-strong">
                                                <Avatar user={auth.user} />
                                                <span className="max-w-[7rem] truncate text-sm font-medium text-ink">
                                                    {auth.user.name}
                                                </span>
                                                <ChevronDown className="h-3.5 w-3.5 text-ink-ghost transition-colors group-hover:text-ink-dim" />
                                            </button>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content align="right" width="56">
                                            <div className="border-b border-hairline px-4 py-3">
                                                <p className="truncate text-sm font-medium text-ink">{auth.user.name}</p>
                                                <p className="truncate font-mono text-[11px] text-ink-ghost">{auth.user.email}</p>
                                            </div>
                                            {(auth.user.role === 'instructor' || auth.user.role === 'admin') && (
                                                <Dropdown.Link href="/instructor/dashboard" className="flex items-center gap-2.5">
                                                    <BookOpen className="h-4 w-4" /> Teaching Dashboard
                                                </Dropdown.Link>
                                            )}
                                            <Dropdown.Link href="/dashboard" className="flex items-center gap-2.5">
                                                <GraduationCap className="h-4 w-4" /> Dashboard
                                            </Dropdown.Link>
                                            <Dropdown.Link href="/profile" className="flex items-center gap-2.5">
                                                <UserCircle className="h-4 w-4" /> Profile
                                            </Dropdown.Link>
                                            <div className="my-1 h-px bg-hairline" />
                                            <Dropdown.Link
                                                href="/logout"
                                                method="post"
                                                as="button"
                                                className="flex items-center gap-2.5 hover:!text-alert"
                                            >
                                                <LogOut className="h-4 w-4" /> Sign Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="btn-quiet">Sign in</Link>
                                    <Link href="/register" className="btn-primary group">
                                        Get started
                                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* --- Mobile toggle ------------------------------------ */}
                        <div className="flex items-center gap-1 lg:hidden">
                            <button
                                onClick={() => setSearchOpen(true)}
                                className="rounded-lg p-2 text-ink-faint transition-colors hover:text-ink"
                                aria-label="Search"
                            >
                                <Search className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => setMobileOpen((v) => !v)}
                                className="rounded-lg p-2 text-ink-faint transition-colors hover:text-ink"
                                aria-label="Menu"
                                aria-expanded={mobileOpen}
                            >
                                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Scroll progress rail — reads as instrumentation, not decoration */}
                <div className="absolute inset-x-0 bottom-0 h-px overflow-hidden">
                    <div
                        className="h-full origin-left bg-gradient-to-r from-flux via-flux to-pulse transition-transform duration-150 ease-out"
                        style={{ transform: `scaleX(${progress})` }}
                    />
                </div>
            </header>

            {/* ===== Mobile sheet ======================================== */}
            <div
                className={`fixed inset-0 z-40 lg:hidden ${mobileOpen ? '' : 'pointer-events-none'}`}
                aria-hidden={!mobileOpen}
            >
                <div
                    className={`absolute inset-0 bg-void/80 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setMobileOpen(false)}
                />
                <div
                    className={`absolute inset-x-0 top-16 mx-3 overflow-hidden rounded-2xl border border-hairline-strong bg-void-100/95 backdrop-blur-2xl shadow-lift transition-all duration-400 ease-out ${
                        mobileOpen ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
                    }`}
                >
                    <div className="p-3">
                        {NAV_LINKS.map((link, i) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-medium transition-colors ${
                                    isActive(link.href) ? 'bg-white/[0.06] text-ink' : 'text-ink-dim hover:bg-white/[0.04] hover:text-ink'
                                }`}
                                style={{
                                    animation: mobileOpen ? `fade-up 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 45}ms both` : 'none',
                                }}
                            >
                                {link.label}
                                <span className="font-mono text-[10px] text-ink-ghost">0{i + 1}</span>
                            </Link>
                        ))}

                        <div className="my-3 h-px bg-hairline" />

                        {auth?.user ? (
                            <div className="space-y-2">
                                <Link
                                    href="/dashboard"
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-3 rounded-xl border border-hairline bg-white/[0.02] px-4 py-3"
                                >
                                    <Avatar user={auth.user} size="lg" />
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium text-ink">{auth.user.name}</p>
                                        <p className="font-mono text-[11px] text-ink-ghost">View dashboard</p>
                                    </div>
                                </Link>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-ink-dim transition-colors hover:bg-white/[0.04] hover:text-alert"
                                >
                                    Sign out
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <Link href="/login" onClick={() => setMobileOpen(false)} className="btn-ghost w-full">
                                    Sign in
                                </Link>
                                <Link href="/register" onClick={() => setMobileOpen(false)} className="btn-flux w-full">
                                    Get started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ===== Search overlay ====================================== */}
            {searchOpen && (
                <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[18vh]">
                    <div
                        className="absolute inset-0 bg-void/85 backdrop-blur-md"
                        style={{ animation: 'fade-up 0.25s ease both' }}
                        onClick={() => setSearchOpen(false)}
                    />
                    <div
                        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-hairline-strong bg-void-100/95 backdrop-blur-2xl shadow-lift"
                        style={{ animation: 'fade-up 0.35s cubic-bezier(0.16,1,0.3,1) both' }}
                    >
                        <div className="flex items-center gap-3 border-b border-hairline px-5">
                            <Search className="h-4 w-4 shrink-0 text-flux" />
                            <input
                                autoFocus
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && submitSearch()}
                                placeholder="Search courses, instructors, topics…"
                                className="w-full border-0 bg-transparent py-4 text-[15px] text-ink placeholder:text-ink-ghost focus:outline-none focus:ring-0"
                            />
                            <kbd className="hidden shrink-0 rounded border border-hairline bg-void-200 px-1.5 py-0.5 font-mono text-[10px] text-ink-ghost sm:block">
                                ESC
                            </kbd>
                        </div>
                        <div className="px-5 py-3.5">
                            <p className="font-mono text-[10px] uppercase tracking-mono text-ink-ghost">Popular</p>
                            <div className="mt-2.5 flex flex-wrap gap-2">
                                {['Oracle', 'MySQL', 'AWS', 'PL/SQL', 'Performance Tuning'].map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => {
                                            router.visit(`/courses?search=${encodeURIComponent(t)}`);
                                            setSearchOpen(false);
                                        }}
                                        className="chip transition-colors hover:border-flux/40 hover:text-flux"
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

/** Avatar: real image when present, otherwise a monogram on a lit disc. */
function Avatar({ user, size = 'sm' }) {
    const dim = size === 'lg' ? 'h-10 w-10 text-sm' : 'h-7 w-7 text-[11px]';
    const src = user?.avatar_url;

    if (src) {
        return <img src={src} alt="" className={`${dim} shrink-0 rounded-full border border-hairline object-cover`} />;
    }
    return (
        <span
            className={`${dim} flex shrink-0 items-center justify-center rounded-full border border-flux/30 font-semibold text-flux`}
            style={{ background: 'radial-gradient(circle at 30% 25%, rgba(34,211,238,0.30), rgba(34,211,238,0.06))' }}
        >
            {user?.name?.charAt(0).toUpperCase() || '?'}
        </span>
    );
}

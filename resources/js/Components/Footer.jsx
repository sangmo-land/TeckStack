import React from 'react';
import { Link } from '@inertiajs/react';
import { Mail, Phone, ArrowUpRight, ArrowUp } from 'lucide-react';
import { LogoMark } from '@/Components/ui/Logo';

const COLUMNS = [
    {
        title: 'Platform',
        links: [
            { label: 'All courses', href: '/courses' },
            { label: 'Instructors', href: '/instructors' },
            { label: 'Pricing', href: '/pricing' },
        ],
    },
    {
        title: 'Company',
        links: [
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/contact' },
        ],
    },
    {
        title: 'Tracks',
        links: [
            { label: 'Oracle', href: '/courses?search=Oracle' },
            { label: 'MySQL', href: '/courses?search=MySQL' },
            { label: 'AWS', href: '/courses?search=AWS' },
        ],
    },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden border-t border-hairline bg-void">
            {/* Ambient floor light */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-80"
                style={{ background: 'radial-gradient(60% 100% at 50% 100%, rgba(34,211,238,0.10), transparent 70%)' }}
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid mask-fade-b opacity-40" />

            <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
                {/* ===== Top: brand + columns ========================== */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-16 md:grid-cols-12 lg:py-20">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-5 lg:col-span-4">
                        <Link href="/" className="inline-flex items-center gap-2.5">
                            <LogoMark className="h-8 w-8" />
                            <span className="font-display text-[1.0625rem] font-semibold tracking-tighter text-ink">
                                Nelnado<span className="text-ink-faint">Solutions</span>
                            </span>
                        </Link>

                        <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-faint">
                            Deep technical training in databases and cloud infrastructure — built by engineers
                            who run these systems in production.
                        </p>

                        {/* Live status — the detail that signals a real operating product */}
                        <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-hairline bg-white/[0.02] py-1.5 pl-2.5 pr-3.5">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-signal" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
                            </span>
                            <span className="font-mono text-[10px] uppercase tracking-mono text-ink-dim">
                                All systems operational
                            </span>
                        </div>
                    </div>

                    <div className="hidden lg:col-span-1 lg:block" />

                    {/* Link columns */}
                    {COLUMNS.map((col) => (
                        <div key={col.title} className="md:col-span-2 lg:col-span-2">
                            <h4 className="font-mono text-[10px] uppercase tracking-mono text-ink-ghost">{col.title}</h4>
                            <ul className="mt-4 space-y-3">
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="group inline-flex items-center gap-1 text-sm text-ink-faint transition-colors duration-300 hover:text-ink"
                                        >
                                            {link.label}
                                            <ArrowUpRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact */}
                    <div className="col-span-2 md:col-span-3 lg:col-span-3">
                        <h4 className="font-mono text-[10px] uppercase tracking-mono text-ink-ghost">Get in touch</h4>
                        <ul className="mt-4 space-y-3">
                            <li>
                                <a
                                    href="mailto:mokomnelvis@yahoo.com"
                                    className="group inline-flex items-center gap-2 text-sm text-ink-faint transition-colors hover:text-flux"
                                >
                                    <Mail className="h-3.5 w-3.5" />
                                    mokomnelvis@yahoo.com
                                </a>
                            </li>
                            <li>
                                <a
                                    href="tel:+12409060295"
                                    className="group inline-flex items-center gap-2 text-sm text-ink-faint transition-colors hover:text-flux"
                                >
                                    <Phone className="h-3.5 w-3.5" />
                                    +1 (240) 906-0295
                                </a>
                            </li>
                        </ul>

                        <Link href="/register" className="btn-ghost mt-6 w-full sm:w-auto">
                            Start learning
                            <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>
                </div>

                {/* ===== Oversized wordmark — the signature move ======== */}
                <div className="relative select-none pb-2" aria-hidden="true">
                    <div
                        className="bg-clip-text text-center font-display text-[17vw] font-bold leading-[0.78] tracking-tightest text-transparent lg:text-[13rem]"
                        style={{
                            backgroundImage:
                                'linear-gradient(to bottom, rgba(232,238,246,0.10), rgba(232,238,246,0.015) 62%, transparent)',
                        }}
                    >
                        NELNADO
                    </div>
                </div>

                {/* ===== Bottom bar ==================================== */}
                <div className="flex flex-col-reverse items-center justify-between gap-4 border-t border-hairline py-6 sm:flex-row">
                    <p className="font-mono text-[11px] text-ink-ghost">
                        © {year} NelnadoSolutions — All rights reserved
                    </p>

                    <div className="flex items-center gap-6">
                        <Link href={route('privacy')} className="font-mono text-[11px] text-ink-ghost transition-colors hover:text-ink">
                            Privacy
                        </Link>
                        <Link href={route('terms')} className="font-mono text-[11px] text-ink-ghost transition-colors hover:text-ink">
                            Terms
                        </Link>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="group flex h-8 w-8 items-center justify-center rounded-lg border border-hairline text-ink-ghost transition-all duration-300 hover:border-flux/40 hover:text-flux"
                            aria-label="Back to top"
                        >
                            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}

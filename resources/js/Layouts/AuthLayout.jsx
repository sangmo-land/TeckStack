import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Check } from 'lucide-react';
import Logo from '@/Components/ui/Logo';
import { Aurora, GridBackdrop } from '@/Components/ui/Backdrop';

/**
 * Split auth shell: a brand/value panel on the left (desktop only) and the
 * form on the right. Both halves share one canvas so the seam is invisible.
 */
export default function AuthLayout({ title, subtitle, children, aside, footer }) {
    return (
        <div className="texture-grain relative min-h-screen bg-void">
            <Aurora />
            <GridBackdrop />

            <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-5 sm:px-8">
                {/* Top bar */}
                <header className="flex items-center justify-between py-6">
                    <Logo />
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-mono text-ink-ghost transition-colors hover:text-ink-dim"
                    >
                        <ArrowLeft className="h-3 w-3 transition-transform duration-300 group-hover:-translate-x-0.5" />
                        Back to site
                    </Link>
                </header>

                <div className="flex flex-1 items-center py-8">
                    <div className="grid w-full items-center gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
                        {/* --- Aside (desktop) --------------------------- */}
                        <div className="hidden lg:block">{aside}</div>

                        {/* --- Form ------------------------------------- */}
                        <div className="mx-auto w-full max-w-md lg:mx-0">
                            <div className="mb-8">
                                <h1 className="font-display text-[2rem] font-semibold leading-tight tracking-tightest text-ink">
                                    {title}
                                </h1>
                                {subtitle && <p className="mt-2 text-[15px] text-ink-faint">{subtitle}</p>}
                            </div>

                            {children}

                            {footer && <div className="mt-8 text-center text-sm text-ink-faint">{footer}</div>}
                        </div>
                    </div>
                </div>

                <footer className="py-6">
                    <p className="font-mono text-[11px] text-ink-ghost">
                        © {new Date().getFullYear()} NelnadoSolutions
                    </p>
                </footer>
            </div>
        </div>
    );
}

/** Reusable value panel for the aside slot. */
export function AuthAside({ heading, lede, points = [] }) {
    return (
        <div>
            <h2 className="font-display text-[2.5rem] font-semibold leading-[1.08] tracking-tightest text-ink">
                {heading}
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-dim">{lede}</p>

            <ul className="mt-10 space-y-4">
                {points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-flux/30 bg-flux/10">
                            <Check className="h-3 w-3 text-flux" />
                        </span>
                        <span className="text-sm text-ink-dim">{point}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

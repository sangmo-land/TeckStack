import React from 'react';
import { Link } from '@inertiajs/react';

/**
 * Mark: a stacked-layer glyph (database strata / signal tiers) drawn in
 * strokes rather than a filled gradient blob, so it holds up small and reads
 * as an engineered mark rather than a stock icon.
 */
export function LogoMark({ className = 'h-8 w-8', animated = true }) {
    return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
            <defs>
                <linearGradient id="lm-a" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#67E8F9" />
                    <stop offset="0.55" stopColor="#22D3EE" />
                    <stop offset="1" stopColor="#8B7CFF" />
                </linearGradient>
            </defs>

            {/* strata */}
            <path d="M16 3.5 29 10.2 16 16.9 3 10.2 16 3.5Z" stroke="url(#lm-a)" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M3 15.8 16 22.5l13-6.7" stroke="url(#lm-a)" strokeWidth="1.6" strokeLinejoin="round" opacity="0.72" />
            <path d="M3 21.4 16 28.1l13-6.7" stroke="url(#lm-a)" strokeWidth="1.6" strokeLinejoin="round" opacity="0.42" />

            {/* live core */}
            <circle cx="16" cy="10.2" r="2.1" fill="#22D3EE">
                {animated && <animate attributeName="opacity" values="1;0.35;1" dur="2.8s" repeatCount="indefinite" />}
            </circle>
        </svg>
    );
}

export default function Logo({ className = '', showText = true, href = '/' }) {
    return (
        <Link href={href} className={`group inline-flex items-center gap-2.5 ${className}`}>
            <span className="relative">
                {/* halo only on hover — restraint keeps it from looking cheap */}
                <span className="absolute inset-0 rounded-lg bg-flux/25 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />
                <LogoMark className="relative h-8 w-8 transition-transform duration-500 ease-out group-hover:scale-105" />
            </span>
            {showText && (
                <span className="font-display text-[1.0625rem] font-semibold tracking-tighter text-ink">
                    Nelnado
                    <span className="text-ink-faint">Solutions</span>
                </span>
            )}
        </Link>
    );
}

import React from 'react';
import { Link } from '@inertiajs/react';

/**
 * Mark: a stacked-layer glyph (database strata / signal tiers) drawn in
 * strokes rather than a filled gradient blob, so it holds up small and reads
 * as an engineered mark rather than a stock icon.
 *
 * Because the mark *is* stacked strata, it animates like strata: the layers
 * assemble on load with a slight overshoot, and separate into an exploded
 * view on hover. Motion that restates the logo's own idea beats a generic
 * bounce.
 */
export function LogoMark({ className = 'h-8 w-8', animated = true }) {
    const layer = (extra) => (animated ? `logo-layer ${extra}` : undefined);

    return (
        <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
            <defs>
                <linearGradient id="lm-a" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#67E8F9" />
                    <stop offset="0.55" stopColor="#22D3EE" />
                    <stop offset="1" stopColor="#8B7CFF" />
                </linearGradient>
            </defs>

            {/* strata — top to bottom, each with its own entrance delay */}
            <path
                d="M16 3.5 29 10.2 16 16.9 3 10.2 16 3.5Z"
                stroke="url(#lm-a)"
                strokeWidth="1.6"
                strokeLinejoin="round"
                className={layer('logo-layer-top')}
                style={animated ? { animationDelay: '0ms' } : undefined}
            />
            <path
                d="M3 15.8 16 22.5l13-6.7"
                stroke="url(#lm-a)"
                strokeWidth="1.6"
                strokeLinejoin="round"
                opacity="0.72"
                className={layer('logo-layer-mid')}
                style={animated ? { animationDelay: '80ms' } : undefined}
            />
            <path
                d="M3 21.4 16 28.1l13-6.7"
                stroke="url(#lm-a)"
                strokeWidth="1.6"
                strokeLinejoin="round"
                opacity="0.42"
                className={layer('logo-layer-bot')}
                style={animated ? { animationDelay: '160ms' } : undefined}
            />

            {/* live core */}
            <circle
                cx="16"
                cy="10.2"
                r="2.1"
                fill="#22D3EE"
                className={animated ? 'logo-core' : undefined}
                style={animated ? { animationDelay: '240ms, 1s' } : undefined}
            />
        </svg>
    );
}

export default function Logo({ className = '', showText = true, href = '/', animated = true }) {
    return (
        <Link href={href} className={`group/logo inline-flex items-center gap-2.5 ${className}`}>
            <span className="relative">
                {/* Halo only on hover — restraint keeps it from looking cheap. */}
                <span className="absolute inset-0 rounded-lg bg-flux/25 opacity-0 blur-lg transition-opacity duration-500 group-hover/logo:opacity-100" />
                <LogoMark
                    className="relative h-8 w-8 transition-transform duration-500 ease-out group-hover/logo:scale-[1.06]"
                    animated={animated}
                />
            </span>

            {showText && (
                <span className="font-display text-[1.0625rem] font-semibold tracking-tighter text-ink">
                    <span
                        className={animated ? 'logo-word inline-block' : undefined}
                        style={animated ? { animationDelay: '180ms' } : undefined}
                    >
                        Nelnado
                    </span>
                    <span
                        className={`inline-block text-ink-faint transition-colors duration-500 group-hover/logo:text-flux ${
                            animated ? 'logo-word' : ''
                        }`}
                        style={animated ? { animationDelay: '280ms' } : undefined}
                    >
                        Solutions
                    </span>
                </span>
            )}
        </Link>
    );
}

import React from 'react';

/**
 * Layered page background: aurora light sources over an engineering grid,
 * both masked so they never meet a hard edge. Sits at z-0 behind content.
 */
export function Aurora({ className = '', variant = 'hero' }) {
    if (variant === 'hero') {
        return (
            <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
                <div
                    className="absolute -top-[30%] left-1/2 h-[820px] w-[1100px] -translate-x-1/2 animate-aurora-drift rounded-full blur-[130px]"
                    style={{ background: 'radial-gradient(closest-side, rgba(34,211,238,0.20), transparent 72%)' }}
                />
                <div
                    className="absolute -top-[8%] right-[6%] h-[560px] w-[640px] animate-aurora-drift rounded-full blur-[120px]"
                    style={{ background: 'radial-gradient(closest-side, rgba(139,124,255,0.18), transparent 72%)', animationDelay: '-6s' }}
                />
                <div
                    className="absolute bottom-[-20%] left-[2%] h-[520px] w-[620px] animate-aurora-drift rounded-full blur-[130px]"
                    style={{ background: 'radial-gradient(closest-side, rgba(8,145,178,0.16), transparent 72%)', animationDelay: '-11s' }}
                />
            </div>
        );
    }

    // Quieter variant for interior sections.
    return (
        <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
            <div
                className="absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 animate-aurora-drift rounded-full blur-[140px]"
                style={{ background: 'radial-gradient(closest-side, rgba(34,211,238,0.10), transparent 70%)' }}
            />
        </div>
    );
}

/** Engineering grid, faded top and bottom. */
export function GridBackdrop({ className = '', size = 'lg' }) {
    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 ${size === 'sm' ? 'bg-grid-sm' : 'bg-grid'} mask-fade-y ${className}`}
        />
    );
}

/** Dot matrix, radially masked to a soft pool. */
export function DotBackdrop({ className = '' }) {
    return <div aria-hidden="true" className={`pointer-events-none absolute inset-0 bg-dots mask-radial ${className}`} />;
}

/**
 * Full page shell: canvas + grain + optional aurora. Every public page wraps
 * in this so the texture is identical site-wide.
 */
export function PageShell({ children, className = '', aurora = false }) {
    return (
        <div className={`texture-grain relative min-h-screen bg-void ${className}`}>
            {aurora && <Aurora />}
            <div className="relative z-10">{children}</div>
        </div>
    );
}

/**
 * Section wrapper with a consistent max width and rhythm.
 */
export function Section({ children, className = '', width = 'default', id }) {
    const widths = {
        default: 'max-w-7xl',
        narrow: 'max-w-4xl',
        wide: 'max-w-[88rem]',
    };
    return (
        <section id={id} className={`relative px-5 sm:px-8 ${className}`}>
            <div className={`mx-auto ${widths[width]}`}>{children}</div>
        </section>
    );
}

/**
 * Standard section heading: mono eyebrow, display title, dim lede.
 * Keeping this in one place is what holds the type scale consistent.
 */
export function SectionHeading({ eyebrow, title, lede, align = 'left', action, className = '' }) {
    const centered = align === 'center';
    return (
        <div className={`${centered ? 'mx-auto max-w-2xl text-center' : 'flex flex-wrap items-end justify-between gap-6'} ${className}`}>
            <div className={centered ? '' : 'max-w-2xl'}>
                {eyebrow && (
                    <div className={`mb-4 flex items-center gap-2.5 ${centered ? 'justify-center' : ''}`}>
                        <span className="h-px w-6 bg-flux/50" />
                        <span className="eyebrow">{eyebrow}</span>
                    </div>
                )}
                <h2 className="text-3xl font-semibold text-ink sm:text-4xl lg:text-[2.75rem]">{title}</h2>
                {lede && <p className="mt-4 text-base leading-relaxed text-ink-dim">{lede}</p>}
            </div>
            {action && !centered && <div className="shrink-0">{action}</div>}
        </div>
    );
}

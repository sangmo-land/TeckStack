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

/** Engineering grid, faded top and bottom. Kept for interior/utility surfaces. */
export function GridBackdrop({ className = '', size = 'lg' }) {
    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 ${size === 'sm' ? 'bg-grid-sm' : 'bg-grid'} mask-fade-y ${className}`}
        />
    );
}

/* ============================================================
   TOPOGRAPHIC CONTOURS
   Nested elevation rings, echoing the stacked-strata logo mark.

   Each ring is a circle displaced by a sum of sine harmonics.
   Because the displacement is *absolute* rather than proportional
   to the ring's radius, every ring deforms by the same amount and
   the contours stay parallel — they can never cross, which is what
   separates a real contour map from a pile of wobbly circles.
   ============================================================ */

/** Deterministic PRNG (mulberry32) so the terrain is identical on every render. */
function mulberry32(seed) {
    return function () {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function buildContours({
    seed = 7,
    rings = 24,
    innerRadius = 38,
    outerRadius = 580,
    cx = 500,
    cy = 400,
    segments = 168,
} = {}) {
    const rand = mulberry32(seed);
    const spacing = (outerRadius - innerRadius) / (rings - 1);

    // Harmonic budget stays under half the ring spacing, guaranteeing no crossings.
    const budget = spacing * 0.42;
    const harmonics = [
        { freq: 2, amp: budget * 0.44, phase: rand() * Math.PI * 2 },
        { freq: 3, amp: budget * 0.30, phase: rand() * Math.PI * 2 },
        { freq: 5, amp: budget * 0.16, phase: rand() * Math.PI * 2 },
        { freq: 8, amp: budget * 0.10, phase: rand() * Math.PI * 2 },
    ];

    // Shared sampler so rings and the nodes sitting on them agree exactly.
    const pointOn = (ringIndex, theta) => {
        const radius = innerRadius + ringIndex * spacing;
        const drift = ringIndex * 0.06; // whisper of phase drift, so bands aren't machined
        let displacement = 0;
        for (const h of harmonics) {
            displacement += h.amp * Math.sin(h.freq * theta + h.phase + drift);
        }
        const r = radius + displacement;
        return {
            x: cx + r * Math.cos(theta),
            y: cy + r * Math.sin(theta) * 0.72, // flatten: terrain, not a bullseye
        };
    };

    const paths = Array.from({ length: rings }, (_, i) => {
        let d = '';
        for (let s = 0; s < segments; s++) {
            const { x, y } = pointOn(i, (s / segments) * Math.PI * 2);
            d += `${s === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
        }
        return { d: `${d}Z`, index: i };
    });

    // Survey markers: a few monitored points sitting exactly on an isoline,
    // the way a topology map pins hosts to a network.
    const nodes = [0.34, 0.58, 0.8].map((depth, n) => {
        const ringIndex = Math.round(depth * (rings - 1));
        const theta = rand() * Math.PI * 2;
        return { ...pointOn(ringIndex, theta), index: n };
    });

    return { paths, nodes };
}

/**
 * Contour field for hero sections. Replaces the graph-paper grid.
 */
export function ContourBackdrop({ className = '', seed = 7, accentEvery = 6, animated = true }) {
    const { paths, nodes } = React.useMemo(() => buildContours({ seed }), [seed]);
    const total = paths.length;

    return (
        <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
            <svg
                className="absolute left-1/2 top-1/2 h-[135%] w-[135%] -translate-x-1/2 -translate-y-1/2 animate-contour-breathe"
                viewBox="0 0 1000 800"
                preserveAspectRatio="xMidYMid slice"
                fill="none"
                style={{
                    // Gentler than the shared .mask-radial: the elevation ramp below
                    // already fades the outer bands, so a hard mask double-dips and
                    // erases the field entirely.
                    WebkitMaskImage:
                        'radial-gradient(ellipse 78% 82% at 50% 45%, #000 50%, transparent 100%)',
                    maskImage:
                        'radial-gradient(ellipse 78% 82% at 50% 45%, #000 50%, transparent 100%)',
                }}
            >
                {/* ---------- Layer 1: the terrain, plotted in on load ----------
                    Every path declares pathLength="1", so dash values are
                    normalised and no DOM measuring is ever required. Rings draw
                    from the summit outward, like a survey being rendered. */}
                {paths.map(({ d, index }) => {
                    // Elevation ramp: brightest at the peak, dissolving outward.
                    const t = index / (total - 1);
                    const fade = Math.pow(1 - t, 1.35);
                    const accent = index % accentEvery === 0;

                    return (
                        <path
                            key={index}
                            d={d}
                            pathLength="1"
                            stroke={accent ? 'rgb(34,211,238)' : 'rgb(148,163,184)'}
                            strokeWidth={accent ? 1.15 : 0.85}
                            opacity={(accent ? 0.30 : 0.26) * (0.34 + fade * 0.66)}
                            vectorEffect="non-scaling-stroke"
                            className={animated ? 'contour-draw' : undefined}
                            style={animated ? { animationDelay: `${index * 55}ms` } : undefined}
                        />
                    );
                })}

                {/* ---------- Layer 2: telemetry moving along the isolines ----------
                    A short arc glides around each accent ring. Reads as data
                    traversing a topology; only ~4 of 24 rings carry it, and the
                    periods are coprime-ish so they never fall into lockstep. */}
                {animated &&
                    paths
                        .filter(({ index }) => index % accentEvery === 0 && index > 0)
                        .map(({ d, index }, n) => (
                            <path
                                key={`flow-${index}`}
                                d={d}
                                pathLength="1"
                                stroke="rgb(103,232,249)"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                opacity={0.42 - n * 0.07}
                                vectorEffect="non-scaling-stroke"
                                className="contour-flow"
                                style={{
                                    strokeDasharray: '0.05 0.95',
                                    animationDuration: `${23 + n * 9}s`,
                                    animationDelay: `${-n * 6}s`,
                                    animationDirection: n % 2 ? 'reverse' : 'normal',
                                }}
                            />
                        ))}

                {/* ---------- Layer 3: survey markers ----------
                    Monitored points pinned to an isoline, each breathing on its
                    own slow cycle. Three is enough to imply a system. */}
                {animated &&
                    nodes.map(({ x, y, index }) => (
                        <g key={`node-${index}`}>
                            <circle
                                cx={x}
                                cy={y}
                                r="10"
                                fill="none"
                                stroke="rgb(34,211,238)"
                                strokeWidth="0.7"
                                vectorEffect="non-scaling-stroke"
                                className="contour-ping"
                                style={{ animationDelay: `${index * 2.7}s` }}
                            />
                            <circle
                                cx={x}
                                cy={y}
                                r="2.2"
                                fill="rgb(103,232,249)"
                                className="contour-node-dot"
                                style={{ animationDelay: `${index * 1.6}s` }}
                            />
                        </g>
                    ))}
            </svg>
        </div>
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

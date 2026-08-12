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

    /* ------------------------------------------------------------------
       The terrain is a closed-form scalar field, which is what lets the
       flow lines below be *derived* rather than drawn by hand:

           h(ρ,θ) = C − ρ + D(θ,ρ)          (elevation; peak at the centre)
           D(θ,ρ) = Σ aₖ·sin(kθ + φₖ + cρ)  (the harmonic displacement)

       Contours are the level sets of h. Flow lines are the integral curves
       of −∇h. The phase drift is a function of ρ rather than of ring index
       so both the rings and the gradient read the same field.
       ------------------------------------------------------------------ */
    const DRIFT_K = 0.06 / spacing;

    const displacementAt = (theta, rho) => {
        const drift = DRIFT_K * (rho - innerRadius);
        let s = 0;
        for (const h of harmonics) s += h.amp * Math.sin(h.freq * theta + h.phase + drift);
        return s;
    };
    const dD_dTheta = (theta, rho) => {
        const drift = DRIFT_K * (rho - innerRadius);
        let s = 0;
        for (const h of harmonics) s += h.amp * h.freq * Math.cos(h.freq * theta + h.phase + drift);
        return s;
    };
    const dD_dRho = (theta, rho) => {
        const drift = DRIFT_K * (rho - innerRadius);
        let s = 0;
        for (const h of harmonics) s += h.amp * DRIFT_K * Math.cos(h.freq * theta + h.phase + drift);
        return s;
    };

    // Flatten vertically so the field reads as terrain seen at an angle.
    const toScreen = (rho, theta) => ({
        x: cx + rho * Math.cos(theta),
        y: cy + rho * Math.sin(theta) * 0.72,
    });

    const pointOn = (ringIndex, theta) => {
        const base = innerRadius + ringIndex * spacing;
        return toScreen(base + displacementAt(theta, base), theta);
    };

    const paths = Array.from({ length: rings }, (_, i) => {
        let d = '';
        for (let s = 0; s < segments; s++) {
            const { x, y } = pointOn(i, (s / segments) * Math.PI * 2);
            d += `${s === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
        }
        return { d: `${d}Z`, index: i };
    });

    /* Integral curves of steepest descent. Each one starts near the summit
       and is integrated outward, bending as the gradient turns — which is
       exactly why they always cross the contours at right angles. */
    const streamline = (theta0) => {
        let rho = innerRadius + spacing * 1.1;
        let theta = theta0;
        let d = '';

        for (let step = 0; step < 320 && rho < outerRadius * 1.04; step++) {
            // ∇h in the orthonormal (ρ̂, θ̂) basis, then descend against it.
            const gRho = -1 + dD_dRho(theta, rho);
            const gTheta = dD_dTheta(theta, rho) / rho;

            let dRho = -gRho;
            let dTheta = -gTheta;
            const mag = Math.hypot(dRho, dTheta) || 1;
            dRho /= mag;
            dTheta /= mag;

            const stepLen = 7;
            rho += dRho * stepLen;
            theta += (dTheta * stepLen) / rho; // arc length along θ̂ → angle

            const { x, y } = toScreen(rho, theta);
            d += `${step === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
        }
        return d;
    };

    const flowLines = Array.from({ length: 7 }, (_, i) => {
        const theta0 = (i / 7) * Math.PI * 2 + rand() * 0.5;
        return { d: streamline(theta0), index: i };
    });

    return { paths, flowLines };
}

/**
 * Contour field for hero sections. Replaces the graph-paper grid.
 */
export function ContourBackdrop({ className = '', seed = 7, accentEvery = 6, animated = true }) {
    const { paths, flowLines } = React.useMemo(() => buildContours({ seed }), [seed]);
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

                {/* ---------- Layer 2: propagation wave ----------
                    A brightness front sweeps outward, ring after ring — the
                    same direction the gradient points. Reads as a write
                    replicating through tiers, or a query fanning out from
                    its origin. Every 2nd ring carries it; that is enough to
                    see a front without lighting up the whole field. */}
                {animated &&
                    paths
                        .filter(({ index }) => index % 2 === 0)
                        .map(({ d, index }) => {
                            // The wrapper carries the same elevation falloff as the
                            // terrain; nested opacity multiplies, so the front dims
                            // as it travels out instead of blooming at the edges.
                            const fade = Math.pow(1 - index / (total - 1), 1.35);
                            return (
                                <g key={`wave-${index}`} opacity={0.3 + fade * 0.7}>
                                    <path
                                        d={d}
                                        stroke="rgb(103,232,249)"
                                        strokeWidth="1.1"
                                        vectorEffect="non-scaling-stroke"
                                        className="contour-wave"
                                        style={{ animationDelay: `${index * 0.17}s` }}
                                    />
                                </g>
                            );
                        })}

                {/* ---------- Layer 3: gradient flow lines ----------
                    Integral curves of −∇h: the path water takes down this
                    terrain, and the direction a signal travels away from its
                    source. They meet every contour at a right angle because
                    the geometry says so, not because they were drawn that way. */}
                {flowLines.map(({ d, index }) => (
                    <g key={`stream-${index}`}>
                        <path
                            d={d}
                            stroke="rgb(148,163,184)"
                            strokeWidth="0.6"
                            opacity="0.10"
                            vectorEffect="non-scaling-stroke"
                        />
                        {animated && (
                            <path
                                d={d}
                                pathLength="1"
                                stroke="rgb(103,232,249)"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                opacity="0.5"
                                vectorEffect="non-scaling-stroke"
                                className="contour-descend"
                                style={{
                                    strokeDasharray: '0.07 0.93',
                                    animationDuration: `${9 + index * 1.6}s`,
                                    animationDelay: `${-index * 2.3}s`,
                                }}
                            />
                        )}
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

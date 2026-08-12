import React from 'react';

/**
 * Layered page background: aurora light sources over structural geometry,
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
   B-TREE INDEX
   The structure every relational index actually is: a root of
   separator keys, internal nodes, and a linked chain of leaves.

   The animation is a real operation rather than decoration —
   an index seek descends root → internal → leaf following the
   key ranges, then a range scan walks the leaf chain sideways,
   which is exactly what `WHERE k BETWEEN a AND b` does.
   ============================================================ */

/** Deterministic PRNG (mulberry32) so the index is identical on every render. */
function mulberry32(seed) {
    return function () {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const VB_W = 1240;
const VB_H = 640;

function buildIndex({ seed = 7, leafCount = 9, fanout = 3 } = {}) {
    const rand = mulberry32(seed);

    // --- Geometry -------------------------------------------------
    const leafW = 98, leafH = 34, leafGap = 20;
    const internalW = 128, internalH = 38;
    const rootW = 158, rootH = 40;

    const totalW = leafCount * leafW + (leafCount - 1) * leafGap;
    const startX = (VB_W - totalW) / 2;

    const yRoot = 120, yInternal = 300, yLeaf = 486;

    // --- Keys: strictly ascending, the way a real index is ordered.
    let k = 4 + Math.floor(rand() * 8);
    const leaves = Array.from({ length: leafCount }, (_, i) => {
        const keys = [];
        for (let s = 0; s < 2; s++) {
            k += 3 + Math.floor(rand() * 14);
            keys.push(k);
        }
        return {
            index: i,
            x: startX + i * (leafW + leafGap),
            y: yLeaf,
            w: leafW,
            h: leafH,
            keys,
        };
    });

    const internalCount = Math.ceil(leafCount / fanout);
    const internals = Array.from({ length: internalCount }, (_, j) => {
        const kids = leaves.slice(j * fanout, j * fanout + fanout);
        const cx = (kids[0].x + kids[kids.length - 1].x + leafW) / 2;
        return {
            index: j,
            x: cx - internalW / 2,
            y: yInternal,
            w: internalW,
            h: internalH,
            // Separator keys are the first key of each child but the leftmost.
            keys: kids.slice(1).map((c) => c.keys[0]),
            children: kids.map((c) => c.index),
        };
    });

    const root = {
        x: VB_W / 2 - rootW / 2,
        y: yRoot,
        w: rootW,
        h: rootH,
        keys: internals.slice(1).map((n) => n.keys[0]),
        children: internals.map((n) => n.index),
    };

    // --- Edges: parent slot boundary curving down to the child's top.
    const edge = (px, py, cx2, cy2) =>
        `M${px.toFixed(1)} ${py.toFixed(1)} C${px.toFixed(1)} ${(py + 56).toFixed(1)} ${cx2.toFixed(1)} ${(cy2 - 56).toFixed(1)} ${cx2.toFixed(1)} ${cy2.toFixed(1)}`;

    const rootEdges = internals.map((n, j) => ({
        key: `r${j}`,
        to: j,
        d: edge(
            root.x + (root.w / (internals.length + 1)) * (j + 1),
            root.y + root.h,
            n.x + n.w / 2,
            n.y,
        ),
    }));

    const internalEdges = [];
    internals.forEach((n) => {
        n.children.forEach((leafIdx, c) => {
            const leaf = leaves[leafIdx];
            internalEdges.push({
                key: `i${n.index}-${leafIdx}`,
                from: n.index,
                to: leafIdx,
                d: edge(n.x + (n.w / (n.children.length + 1)) * (c + 1), n.y + n.h, leaf.x + leaf.w / 2, leaf.y),
            });
        });
    });

    // --- Leaf chain: the sibling pointers that make range scans cheap.
    const chain = leaves.slice(0, -1).map((leaf, i) => ({
        key: `c${i}`,
        from: i,
        to: i + 1,
        d: `M${(leaf.x + leaf.w).toFixed(1)} ${(leaf.y + leaf.h / 2).toFixed(1)} L${leaves[i + 1].x.toFixed(1)} ${(leaf.y + leaf.h / 2).toFixed(1)}`,
    }));

    /* --- Seeks -----------------------------------------------------
       Each seek descends to a target leaf, then range-scans right.
       Steps are emitted in execution order; the renderer turns the
       ordinal into an animation-delay so the path lights in sequence. */
    const SEEK_TARGETS = [
        { leaf: 1, scan: 3 },
        { leaf: 7, scan: 1 },
        { leaf: 4, scan: 2 },
    ];

    const seeks = SEEK_TARGETS.map((target, s) => {
        const parent = internals.find((n) => n.children.includes(target.leaf));
        const steps = [
            { kind: 'node', node: root },
            { kind: 'edge', d: rootEdges.find((e) => e.to === parent.index).d },
            { kind: 'node', node: parent },
            { kind: 'edge', d: internalEdges.find((e) => e.from === parent.index && e.to === target.leaf).d },
            { kind: 'node', node: leaves[target.leaf], hit: true },
        ];

        // Range scan: hop along the leaf chain from the hit leaf rightwards.
        for (let i = 0; i < target.scan; i++) {
            const from = target.leaf + i;
            const to = from + 1;
            if (to >= leaves.length) break;
            steps.push({ kind: 'chain', d: chain[from].d });
            steps.push({ kind: 'node', node: leaves[to], scan: true });
        }

        return { index: s, steps };
    });

    return { root, internals, leaves, rootEdges, internalEdges, chain, seeks };
}

/** One node box: hairline shell, key slots, faint key values. */
function IndexNode({ node, tone = 'base', delay = 0, animated = true }) {
    const slots = node.keys.length + 1;
    const stroke = tone === 'active' ? 'rgb(103,232,249)' : 'rgb(148,163,184)';

    return (
        <g>
            <rect
                x={node.x}
                y={node.y}
                width={node.w}
                height={node.h}
                rx="7"
                fill={tone === 'active' ? 'rgba(34,211,238,0.10)' : 'rgba(148,163,184,0.03)'}
                stroke={stroke}
                strokeWidth={tone === 'active' ? 1.4 : 0.9}
                vectorEffect="non-scaling-stroke"
            />
            {/* Slot dividers — a node holds keys, not one value. */}
            {Array.from({ length: slots - 1 }, (_, i) => (
                <line
                    key={i}
                    x1={node.x + (node.w / slots) * (i + 1)}
                    y1={node.y + 6}
                    x2={node.x + (node.w / slots) * (i + 1)}
                    y2={node.y + node.h - 6}
                    stroke={stroke}
                    strokeWidth="0.7"
                    opacity="0.5"
                    vectorEffect="non-scaling-stroke"
                />
            ))}
            {node.keys.map((key, i) => (
                <text
                    key={i}
                    x={node.x + (node.w / slots) * (i + 1)}
                    y={node.y + node.h / 2 + 3.5}
                    textAnchor="middle"
                    fontSize="11"
                    fontFamily="ui-monospace, monospace"
                    fill={tone === 'active' ? 'rgb(103,232,249)' : 'rgb(148,163,184)'}
                    opacity={tone === 'active' ? 0.9 : 0.55}
                >
                    {key}
                </text>
            ))}
        </g>
    );
}

/**
 * B-tree index backdrop for hero sections.
 */
export function IndexBackdrop({ className = '', seed = 7, animated = true }) {
    const idx = React.useMemo(() => buildIndex({ seed }), [seed]);
    const { root, internals, leaves, rootEdges, internalEdges, chain, seeks } = idx;

    // One full pass through all three seeks, then a pause before repeating.
    const CYCLE = 21;
    const STEP = 0.42;
    const SEEK_SLOT = CYCLE / seeks.length;

    return (
        <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
            <svg
                className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2"
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                /* `meet` rather than `slice`: the tree is a single readable
                   object, so cropping its outer leaves would just look broken. */
                preserveAspectRatio="xMidYMid meet"
                fill="none"
                style={{
                    WebkitMaskImage:
                        'radial-gradient(ellipse 76% 70% at 50% 44%, #000 30%, transparent 100%)',
                    maskImage: 'radial-gradient(ellipse 76% 70% at 50% 44%, #000 30%, transparent 100%)',
                }}
            >
                {/* ---------- Static structure ----------
                    Deliberately faint. This is wallpaper behind a headline,
                    not a diagram the reader is meant to study. */}
                <g opacity="0.14">
                    {[...rootEdges, ...internalEdges].map((e, i) => (
                        <path
                            key={e.key}
                            d={e.d}
                            pathLength="1"
                            stroke="rgb(148,163,184)"
                            strokeWidth="0.9"
                            vectorEffect="non-scaling-stroke"
                            className={animated ? 'btree-draw' : undefined}
                            style={animated ? { animationDelay: `${300 + i * 45}ms` } : undefined}
                        />
                    ))}

                    {/* Leaf sibling pointers — the reason range scans are cheap. */}
                    {chain.map((c, i) => (
                        <path
                            key={c.key}
                            d={c.d}
                            pathLength="1"
                            stroke="rgb(148,163,184)"
                            strokeWidth="0.8"
                            strokeDasharray="4 4"
                            vectorEffect="non-scaling-stroke"
                            className={animated ? 'btree-draw' : undefined}
                            style={animated ? { animationDelay: `${900 + i * 40}ms` } : undefined}
                        />
                    ))}

                    <IndexNode node={root} />
                    {internals.map((n) => (
                        <IndexNode key={`int-${n.index}`} node={n} />
                    ))}
                    {leaves.map((n) => (
                        <IndexNode key={`leaf-${n.index}`} node={n} />
                    ))}
                </g>

                {/* ---------- Seek highlights ----------
                    Each step is a duplicate of the geometry it lights, scheduled
                    by animation-delay so the path illuminates in execution order:
                    root → internal → leaf, then sideways along the chain. */}
                {animated && (
                  <g opacity="0.5">
                    {seeks.map((seek) =>
                        seek.steps.map((step, i) => {
                            const delay = seek.index * SEEK_SLOT + i * STEP;
                            const style = {
                                animationDuration: `${CYCLE}s`,
                                animationDelay: `${delay}s`,
                            };

                            if (step.kind === 'node') {
                                return (
                                    <g key={`s${seek.index}-${i}`} className="btree-seek" style={style}>
                                        <IndexNode node={step.node} tone="active" />
                                        {step.hit && (
                                            <rect
                                                x={step.node.x - 5}
                                                y={step.node.y - 5}
                                                width={step.node.w + 10}
                                                height={step.node.h + 10}
                                                rx="10"
                                                fill="none"
                                                stroke="rgb(34,211,238)"
                                                strokeWidth="0.8"
                                                opacity="0.45"
                                                vectorEffect="non-scaling-stroke"
                                            />
                                        )}
                                    </g>
                                );
                            }

                            return (
                                <path
                                    key={`s${seek.index}-${i}`}
                                    d={step.d}
                                    stroke="rgb(103,232,249)"
                                    strokeWidth={step.kind === 'chain' ? 1.6 : 1.4}
                                    strokeDasharray={step.kind === 'chain' ? '4 4' : undefined}
                                    vectorEffect="non-scaling-stroke"
                                    className="btree-seek"
                                    style={style}
                                />
                            );
                        }),
                    )}
                  </g>
                )}
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

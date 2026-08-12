import React, { useEffect, useRef, useState } from 'react';

/**
 * A console that types a query, "executes" it, then streams result rows in.
 * For a database-training product this carries the hero far better than an
 * abstract gradient: it shows the actual subject matter in motion.
 */

const SEQUENCE = [
    {
        prompt: 'nelnado=#',
        query: 'SELECT track, learners, avg_score\n  FROM curriculum\n WHERE status = \'active\'\n ORDER BY learners DESC;',
        columns: ['track', 'learners', 'avg_score'],
        rows: [
            ['Oracle DBA', '4,182', '94.2'],
            ['MySQL Performance', '3,517', '91.8'],
            ['AWS Data Engineering', '2,940', '93.1'],
            ['PL/SQL Advanced', '1,864', '89.7'],
        ],
        timing: '4 rows in 12ms',
    },
];

export default function Terminal({ className = '' }) {
    const step = SEQUENCE[0];
    const [typed, setTyped] = useState('');
    const [phase, setPhase] = useState('typing'); // typing → running → results
    const [visibleRows, setVisibleRows] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);

    // Only start once the console is actually on screen.
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        if (reduce) {
            setTyped(step.query);
            setPhase('results');
            setVisibleRows(step.rows.length);
            return;
        }

        const io = new IntersectionObserver(([e]) => {
            if (!e.isIntersecting || started.current) return;
            started.current = true;
            io.disconnect();

            let i = 0;
            const type = () => {
                i += 1;
                setTyped(step.query.slice(0, i));
                if (i < step.query.length) {
                    // Vary cadence slightly so it reads as human, not metronomic.
                    setTimeout(type, step.query[i] === '\n' ? 130 : 18 + Math.random() * 34);
                } else {
                    setTimeout(() => setPhase('running'), 420);
                }
            };
            setTimeout(type, 500);
        }, { threshold: 0.3 });

        io.observe(el);
        return () => io.disconnect();
    }, []);

    useEffect(() => {
        if (phase !== 'running') return;
        const t = setTimeout(() => setPhase('results'), 620);
        return () => clearTimeout(t);
    }, [phase]);

    useEffect(() => {
        if (phase !== 'results' || visibleRows >= step.rows.length) return;
        const t = setTimeout(() => setVisibleRows((n) => n + 1), 130);
        return () => clearTimeout(t);
    }, [phase, visibleRows]);

    return (
        <div ref={ref} className={`relative ${className}`}>
            {/* Glow bed under the console */}
            <div
                aria-hidden="true"
                className="absolute -inset-8 rounded-[2rem] blur-3xl"
                style={{ background: 'radial-gradient(closest-side, rgba(34,211,238,0.16), transparent 72%)' }}
            />

            <div className="panel relative overflow-hidden rounded-2xl">
                {/* Title bar */}
                <div className="flex items-center gap-3 border-b border-hairline bg-white/[0.02] px-4 py-3">
                    <div className="flex gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-alert/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-warn/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-signal/70" />
                    </div>
                    <span className="font-mono text-[11px] text-ink-ghost">nelnado — psql — 80×24</span>
                    <span className="ml-auto flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-signal" />
                        <span className="font-mono text-[10px] uppercase tracking-mono text-ink-ghost">connected</span>
                    </span>
                </div>

                {/* Body */}
                <div className="min-h-[19rem] px-5 py-4 font-mono text-[12.5px] leading-relaxed sm:text-[13px]">
                    <div className="flex gap-2">
                        <span className="shrink-0 text-flux">{step.prompt}</span>
                        <pre className="whitespace-pre-wrap break-words text-ink">
                            {highlight(typed)}
                            {phase === 'typing' && (
                                <span className="ml-px inline-block h-[1.05em] w-[0.5em] translate-y-[0.15em] animate-caret-blink bg-flux" />
                            )}
                        </pre>
                    </div>

                    {phase === 'running' && (
                        <p className="mt-3 text-ink-ghost">
                            <span className="inline-block animate-pulse">executing…</span>
                        </p>
                    )}

                    {phase === 'results' && (
                        <div className="mt-4">
                            {/* Header */}
                            <div className="grid grid-cols-[1.5fr_0.7fr_0.7fr] gap-3 border-b border-hairline pb-2 text-[11px] uppercase tracking-wider text-ink-ghost">
                                {step.columns.map((c) => (
                                    <span key={c} className={c === 'track' ? '' : 'text-right'}>{c}</span>
                                ))}
                            </div>

                            {/* Rows */}
                            <div className="divide-y divide-white/[0.04]">
                                {step.rows.slice(0, visibleRows).map((row, i) => (
                                    <div
                                        key={row[0]}
                                        className="grid animate-ticker-flip grid-cols-[1.5fr_0.7fr_0.7fr] gap-3 py-2"
                                    >
                                        <span className="truncate text-ink">{row[0]}</span>
                                        <span className="text-right text-flux">{row[1]}</span>
                                        <span className="text-right text-signal">{row[2]}</span>
                                    </div>
                                ))}
                            </div>

                            {visibleRows >= step.rows.length && (
                                <p className="mt-3 animate-fade-up text-[11px] text-ink-ghost">
                                    ({step.timing})
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* Scanline sweep */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="h-8 w-full animate-scan-y bg-gradient-to-b from-transparent via-flux/[0.045] to-transparent" />
                </div>
            </div>
        </div>
    );
}

/** Minimal SQL keyword highlighting — enough to read as syntax-aware. */
function highlight(text) {
    const KEYWORDS = /\b(SELECT|FROM|WHERE|ORDER BY|DESC|ASC|AND|OR|JOIN|ON|GROUP BY|LIMIT)\b/g;
    const parts = [];
    let last = 0;
    let m;

    while ((m = KEYWORDS.exec(text)) !== null) {
        if (m.index > last) parts.push(text.slice(last, m.index));
        parts.push(
            <span key={`${m.index}-k`} className="font-medium text-pulse-soft">
                {m[0]}
            </span>,
        );
        last = m.index + m[0].length;
    }
    if (last < text.length) {
        // String literals get their own colour.
        const tail = text.slice(last);
        const strParts = tail.split(/('[^']*')/g);
        strParts.forEach((s, i) =>
            parts.push(
                s.startsWith("'") ? (
                    <span key={`${last}-s${i}`} className="text-signal">{s}</span>
                ) : (
                    s
                ),
            ),
        );
    }
    return parts;
}

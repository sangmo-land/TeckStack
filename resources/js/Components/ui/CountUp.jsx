import React, { useEffect, useRef, useState } from 'react';

/**
 * Counts a stat up from zero when it scrolls into view. Uses an eased ramp so
 * the number decelerates into its final value rather than ticking linearly.
 */
export default function CountUp({
    to,
    from = 0,
    duration = 1800,
    decimals = 0,
    prefix = '',
    suffix = '',
    className = '',
}) {
    const ref = useRef(null);
    const [value, setValue] = useState(from);
    const started = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (
            window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ||
            typeof IntersectionObserver === 'undefined'
        ) {
            setValue(to);
            return;
        }

        const run = () => {
            if (started.current) return;
            started.current = true;

            const start = performance.now();
            const tick = (now) => {
                const t = Math.min((now - start) / duration, 1);
                // easeOutExpo — fast out of the gate, long settle
                const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
                setValue(from + (to - from) * eased);
                if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                run();
                observer.unobserve(el);
            },
            { threshold: 0.4 },
        );

        observer.observe(el);

        // Guarantee the figure is correct even if the ramp never runs *or*
        // stalls midway (headless/prerender environments where rAF does not
        // advance), so the page never displays a stale zero for a real number.
        // By this point the ramp has had well over `duration` to finish, so an
        // unconditional snap is a no-op in the normal case.
        const failsafe = setTimeout(() => setValue(to), duration + 700);

        return () => {
            observer.disconnect();
            clearTimeout(failsafe);
        };
    }, [to, from, duration]);

    return (
        <span ref={ref} className={className}>
            {prefix}
            {value.toLocaleString('en-US', {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
            })}
            {suffix}
        </span>
    );
}

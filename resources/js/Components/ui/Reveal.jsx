import React, { useEffect, useRef, useState } from 'react';

/**
 * Scroll-triggered reveal. Elements start displaced and settle into place the
 * first time they cross into the viewport — one-shot, never re-animates on
 * scroll-up, which is what makes it feel intentional instead of twitchy.
 *
 * <Reveal delay={120} direction="up">…</Reveal>
 */
export default function Reveal({
    children,
    delay = 0,
    direction = 'up',
    distance = 18,
    duration = 700,
    className = '',
    as: Tag = 'div',
    once = true,
    threshold = 0.15,
}) {
    const ref = useRef(null);
    const [shown, setShown] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Honour reduced-motion by showing content immediately.
        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
            setShown(true);
            return;
        }

        // No IntersectionObserver (old browsers, some crawlers) — show at once
        // rather than leaving the content permanently at opacity 0.
        if (typeof IntersectionObserver === 'undefined') {
            setShown(true);
            return;
        }

        // Synchronous first check. Elements that mount already on screen — which
        // includes anything rendered after an async fetch resolves — reveal
        // immediately instead of waiting on an observer callback that may never
        // arrive in headless/prerender environments.
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            setShown(true);
            if (once) return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShown(true);
                    if (once) observer.unobserve(el);
                } else if (!once) {
                    setShown(false);
                }
            },
            { threshold, rootMargin: '0px 0px -8% 0px' },
        );

        observer.observe(el);

        // Last-resort guarantee: never leave content invisible.
        const failsafe = setTimeout(() => setShown(true), 2500);

        return () => {
            observer.disconnect();
            clearTimeout(failsafe);
        };
    }, [once, threshold]);

    const offset = {
        up: `0, ${distance}px`,
        down: `0, -${distance}px`,
        left: `${distance}px, 0`,
        right: `-${distance}px, 0`,
        none: '0, 0',
    }[direction];

    return (
        <Tag
            ref={ref}
            className={className}
            style={{
                opacity: shown ? 1 : 0,
                transform: shown ? 'translate(0,0) scale(1)' : `translate(${offset}) scale(${direction === 'none' ? 0.97 : 1})`,
                transition: `opacity ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
                willChange: shown ? 'auto' : 'opacity, transform',
            }}
        >
            {children}
        </Tag>
    );
}

/**
 * Staggers Reveal across a list of children without hand-writing delays.
 */
export function RevealGroup({ children, step = 80, initial = 0, ...props }) {
    return React.Children.map(children, (child, i) => (
        <Reveal delay={initial + i * step} {...props}>
            {child}
        </Reveal>
    ));
}

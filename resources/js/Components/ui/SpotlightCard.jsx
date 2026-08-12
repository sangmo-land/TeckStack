import React, { useCallback, useRef, useState } from 'react';

/**
 * A panel that tracks the cursor with a soft radial highlight, plus a border
 * that brightens nearest the pointer. This is the single detail that most
 * separates a "premium" dark card from a flat one — the surface responds to
 * where you are, so it reads as lit rather than painted.
 */
export default function SpotlightCard({
    children,
    className = '',
    spotlightColor = '34,211,238',
    radius = 380,
    intensity = 0.1,
    as: Tag = 'div',
    ...rest
}) {
    const ref = useRef(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [active, setActive] = useState(false);

    const onMove = useCallback((e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
    }, []);

    return (
        <Tag
            ref={ref}
            onMouseMove={onMove}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            className={`group/spot relative overflow-hidden ${className}`}
            {...rest}
        >
            {/* Interior glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                style={{
                    opacity: active ? 1 : 0,
                    background: `radial-gradient(${radius}px circle at ${pos.x}px ${pos.y}px, rgba(${spotlightColor},${intensity}), transparent 70%)`,
                }}
            />
            {/* Border pickup — same gradient, masked to a 1px ring */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-500"
                style={{
                    opacity: active ? 1 : 0,
                    padding: '1px',
                    background: `radial-gradient(${radius * 0.75}px circle at ${pos.x}px ${pos.y}px, rgba(${spotlightColor},0.55), transparent 65%)`,
                    WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                }}
            />
            <div className="relative">{children}</div>
        </Tag>
    );
}

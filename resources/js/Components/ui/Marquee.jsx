import React from 'react';

/**
 * Seamless infinite ticker. The children are rendered twice and the track is
 * translated by exactly -50%, so the loop point is invisible.
 */
export default function Marquee({ children, speed = 40, reverse = false, className = '', pauseOnHover = true }) {
    return (
        <div className={`group relative flex overflow-hidden mask-fade-x ${className}`}>
            <div
                className={`flex shrink-0 animate-marquee items-center ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
                style={{
                    '--marquee-duration': `${speed}s`,
                    animationDirection: reverse ? 'reverse' : 'normal',
                }}
            >
                {children}
                {/* Duplicate for the seamless wrap. Hidden from AT. */}
                <span aria-hidden="true" className="flex items-center">
                    {children}
                </span>
            </div>
        </div>
    );
}

import React from 'react';
import { Link } from '@inertiajs/react';
import { Star, Users, Clock, ArrowUpRight } from 'lucide-react';
import SpotlightCard from '@/Components/ui/SpotlightCard';

/** Thumbnails arrive as absolute URLs, /storage paths, or bare disk keys. */
export function thumbUrl(raw) {
    if (!raw) return null;
    if (raw.startsWith('http') || raw.startsWith('/storage/')) return raw;
    return `/storage/${raw}`;
}

const LEVEL_STYLE = {
    beginner: 'border-signal/25 bg-signal/10 text-signal',
    intermediate: 'border-flux/25 bg-flux/10 text-flux',
    advanced: 'border-pulse/30 bg-pulse/10 text-pulse-soft',
};

function formatDuration(minutes) {
    const m = Number(minutes) || 0;
    if (m < 60) return `${m}m`;
    const h = Math.floor(m / 60);
    const rest = m % 60;
    return rest ? `${h}h ${rest}m` : `${h}h`;
}

export default function CourseCard({ course, compact = false }) {
    // Rating may be precomputed, or derivable from an embedded reviews array.
    const rating =
        Number(course.rating) ||
        (course.reviews?.length
            ? course.reviews.reduce((sum, r) => sum + r.rating, 0) / course.reviews.length
            : 0);

    const students = course.total_students ?? course.enrollments_count ?? 0;
    const src = thumbUrl(course.thumbnail_url);
    const level = String(course.level || '').toLowerCase();
    const price = Number(course.price || 0);

    return (
        <Link href={`/courses/${course.slug}`} className="group block h-full focus:outline-none">
            <SpotlightCard className="panel panel-hover flex h-full flex-col rounded-2xl">
                {/* --- Media ------------------------------------------------ */}
                <div className={`relative overflow-hidden rounded-t-2xl ${compact ? 'h-36' : 'h-44'}`}>
                    {src ? (
                        <img
                            src={src}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-cover opacity-90 transition-all duration-700 ease-out group-hover:scale-[1.06] group-hover:opacity-100"
                        />
                    ) : (
                        // Generated fallback: grid + glow, never an empty gradient block
                        <div className="relative h-full w-full bg-void-200">
                            <div className="absolute inset-0 bg-grid-sm opacity-60" />
                            <div
                                className="absolute inset-0"
                                style={{ background: 'radial-gradient(120% 90% at 50% 120%, rgba(34,211,238,0.22), transparent 62%)' }}
                            />
                            <span className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-mono text-ink-ghost">
                                {course.category || 'course'}
                            </span>
                        </div>
                    )}

                    {/* Scrim so overlaid text stays legible on any image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-void-100 via-void-100/20 to-transparent" />

                    {level && (
                        <span
                            className={`absolute right-3 top-3 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-mono backdrop-blur-md ${
                                LEVEL_STYLE[level] || 'border-hairline bg-void/70 text-ink-dim'
                            }`}
                        >
                            {course.level}
                        </span>
                    )}

                    {/* Hover affordance */}
                    <span className="absolute left-3 top-3 flex h-8 w-8 translate-y-1 items-center justify-center rounded-full border border-hairline-strong bg-void/70 opacity-0 backdrop-blur-md transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                        <ArrowUpRight className="h-4 w-4 text-flux" />
                    </span>
                </div>

                {/* --- Body ------------------------------------------------- */}
                <div className="flex flex-1 flex-col p-5">
                    {course.category && (
                        <p className="mb-2 font-mono text-[10px] uppercase tracking-mono text-flux/80">{course.category}</p>
                    )}

                    <h3 className="mb-2 font-display text-[1.0625rem] font-semibold leading-snug tracking-tighter text-ink line-clamp-2 transition-colors duration-300 group-hover:text-flux-soft">
                        {course.title}
                    </h3>

                    <p className="mb-5 flex-1 text-[13px] leading-relaxed text-ink-faint line-clamp-2">{course.description}</p>

                    {/* Meta strip */}
                    <div className="mb-4 flex items-center gap-4 border-t border-hairline pt-4 font-mono text-[11px] text-ink-faint">
                        <span className="inline-flex items-center gap-1.5">
                            <Users className="h-3.5 w-3.5" />
                            {Number(students).toLocaleString()}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            {formatDuration(course.total_duration)}
                        </span>
                    </div>

                    {/* Rating + price */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-3.5 w-3.5 ${
                                            i < Math.round(rating) ? 'fill-warn text-warn' : 'text-void-400'
                                        }`}
                                    />
                                ))}
                            </div>
                            <span className="font-mono text-[11px] text-ink-faint">{rating.toFixed(1)}</span>
                        </div>

                        <span className="font-display text-lg font-semibold tracking-tighter text-ink">
                            {price === 0 ? 'Free' : `$${price.toFixed(0)}`}
                        </span>
                    </div>
                </div>
            </SpotlightCard>
        </Link>
    );
}

/** Loading placeholder matched to the real card's geometry. */
export function CourseCardSkeleton({ compact = false }) {
    return (
        <div className="panel flex h-full flex-col rounded-2xl">
            <div className={`skeleton rounded-b-none ${compact ? 'h-36' : 'h-44'}`} />
            <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="skeleton h-2.5 w-20" />
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-4 w-3/5" />
                <div className="skeleton mt-2 h-3 w-full" />
                <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="skeleton h-3 w-24" />
                    <div className="skeleton h-5 w-12" />
                </div>
            </div>
        </div>
    );
}

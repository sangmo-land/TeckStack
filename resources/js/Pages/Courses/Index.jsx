import React, { useState, useEffect, useRef } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react';

import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import Reveal from '@/Components/ui/Reveal';
import CourseCard, { CourseCardSkeleton } from '@/Components/ui/CourseCard';
import { PageShell, Aurora, GridBackdrop, Section } from '@/Components/ui/Backdrop';

const LEVELS = [
    { value: '', label: 'All levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
];

const SORTS = [
    { value: 'latest', label: 'Latest' },
    { value: 'popular', label: 'Most popular' },
    { value: 'rating', label: 'Highest rated' },
];

export default function CourseIndex({ courses: initialCourses, filters: initialFilters, auth }) {
    const [categories, setCategories] = useState([]);
    const [busy, setBusy] = useState(false);
    const [filters, setFilters] = useState({
        search: initialFilters?.search || '',
        category: initialFilters?.category || '',
        level: initialFilters?.level || '',
        sort: initialFilters?.sort || 'latest',
        instructor: initialFilters?.instructor || '',
    });
    const didInit = useRef(false);

    useEffect(() => {
        fetch('/api/categories')
            .then((r) => r.json())
            .then((d) => setCategories(d.categories || []))
            .catch(() => setCategories([]));
    }, []);

    useEffect(() => {
        // Skip first run so the initial URL (e.g. /courses/instructors=6) survives.
        if (!didInit.current) {
            didInit.current = true;
            return;
        }
        const t = setTimeout(() => {
            router.get('/courses', filters, {
                preserveState: true,
                preserveScroll: true,
                onStart: () => setBusy(true),
                onFinish: () => setBusy(false),
            });
        }, 300);
        return () => clearTimeout(t);
    }, [filters]);

    const set = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));

    const activeCount = [filters.search, filters.category, filters.level, filters.instructor].filter(Boolean).length;
    const clearAll = () =>
        setFilters({ search: '', category: '', level: '', sort: 'latest', instructor: '' });

    const data = initialCourses?.data || [];
    const total = initialCourses?.total ?? data.length;

    return (
        <PageShell>
            <Head title="Explore courses" />
            <Navbar auth={auth} startSolid />

            {/* ==========================================================
                HEADER
                ========================================================== */}
            <section className="relative overflow-hidden pb-12 pt-32 sm:pt-36">
                <Aurora variant="quiet" />
                <GridBackdrop />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
                    <Reveal>
                        <div className="flex items-center gap-2.5">
                            <span className="h-px w-6 bg-flux/50" />
                            <span className="eyebrow">Catalogue</span>
                        </div>
                        <h1 className="mt-4 font-display text-[2.5rem] font-semibold leading-[1.05] tracking-tightest text-ink sm:text-[3.25rem]">
                            Explore every track
                        </h1>
                        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-dim">
                            Database administration, performance engineering, and cloud data
                            infrastructure — taught against live systems.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* ==========================================================
                FILTER BAR — sticky under the nav
                ========================================================== */}
            <div className="sticky top-16 z-30 border-y border-hairline bg-void/80 backdrop-blur-2xl">
                <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
                    <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
                        {/* Search */}
                        <div className="relative">
                            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-ghost" />
                            <input
                                type="text"
                                placeholder="Search courses…"
                                value={filters.search}
                                onChange={(e) => set('search', e.target.value)}
                                className="field pl-10 pr-9"
                            />
                            {filters.search && (
                                <button
                                    onClick={() => set('search', '')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-ghost transition-colors hover:text-ink"
                                    aria-label="Clear search"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            )}
                        </div>

                        <Select value={filters.category} onChange={(v) => set('category', v)}>
                            <option value="">All categories</option>
                            {categories.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </Select>

                        <Select value={filters.level} onChange={(v) => set('level', v)}>
                            {LEVELS.map((l) => (
                                <option key={l.value} value={l.value}>{l.label}</option>
                            ))}
                        </Select>

                        <Select value={filters.sort} onChange={(v) => set('sort', v)}>
                            {SORTS.map((s) => (
                                <option key={s.value} value={s.value}>{s.label}</option>
                            ))}
                        </Select>
                    </div>

                    {/* Result meter */}
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                        <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-mono text-ink-ghost">
                            <SlidersHorizontal className="h-3 w-3" />
                            {busy ? 'Filtering…' : `${total} result${total === 1 ? '' : 's'}`}
                        </span>

                        {activeCount > 0 && (
                            <button
                                onClick={clearAll}
                                className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-mono text-flux transition-colors hover:text-flux-soft"
                            >
                                <X className="h-3 w-3" />
                                Clear {activeCount} filter{activeCount === 1 ? '' : 's'}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* ==========================================================
                GRID
                ========================================================== */}
            <Section className="py-12 lg:py-16">
                {busy ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {[...Array(6)].map((_, i) => <CourseCardSkeleton key={i} />)}
                    </div>
                ) : data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {data.map((course, i) => (
                                <Reveal key={course.id} delay={Math.min(i, 8) * 70}>
                                    <CourseCard course={course} />
                                </Reveal>
                            ))}
                        </div>

                        {initialCourses.links && initialCourses.links.length > 3 && (
                            <Pagination links={initialCourses.links} />
                        )}
                    </>
                ) : (
                    <div className="rounded-2xl border border-dashed border-hairline-strong px-6 py-20 text-center">
                        <div
                            className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-hairline"
                            style={{ background: 'radial-gradient(circle at 30% 25%, rgba(34,211,238,0.14), transparent 70%)' }}
                        >
                            <Search className="h-5 w-5 text-ink-ghost" />
                        </div>
                        <h3 className="font-display text-lg font-semibold tracking-tighter text-ink">No matching courses</h3>
                        <p className="mx-auto mt-2 max-w-sm text-sm text-ink-faint">
                            Nothing matches these filters yet. Try widening the search or clearing a filter.
                        </p>
                        {activeCount > 0 && (
                            <button onClick={clearAll} className="btn-ghost mt-6">Clear all filters</button>
                        )}
                    </div>
                )}
            </Section>

            <Footer />
        </PageShell>
    );
}

/** Native select restyled — keeps keyboard/mobile behaviour, loses the OS chrome. */
function Select({ value, onChange, children }) {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="field cursor-pointer appearance-none pr-10"
            >
                {children}
            </select>
            <svg
                className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-ghost"
                viewBox="0 0 12 12" fill="none" aria-hidden="true"
            >
                <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    );
}

function Pagination({ links }) {
    const prev = links[0];
    const next = links[links.length - 1];
    const numbered = links.slice(1, -1);

    return (
        <nav className="mt-14 flex items-center justify-center gap-1.5" aria-label="Pagination">
            <PageArrow href={prev?.url} disabled={!prev?.url} label="Previous">
                <ChevronLeft className="h-4 w-4" />
            </PageArrow>

            {numbered.map((link, i) => (
                <a
                    key={i}
                    href={link.url || undefined}
                    aria-current={link.active ? 'page' : undefined}
                    className={`inline-flex h-9 min-w-9 items-center justify-center rounded-lg border px-3 font-mono text-xs transition-all duration-300 ${
                        link.active
                            ? 'border-flux/40 bg-flux/10 text-flux'
                            : link.url
                              ? 'border-hairline text-ink-faint hover:border-hairline-strong hover:text-ink'
                              : 'pointer-events-none border-transparent text-ink-ghost'
                    }`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}

            <PageArrow href={next?.url} disabled={!next?.url} label="Next">
                <ChevronRight className="h-4 w-4" />
            </PageArrow>
        </nav>
    );
}

function PageArrow({ href, disabled, label, children }) {
    if (disabled) {
        return (
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-ink-ghost opacity-40">
                {children}
            </span>
        );
    }
    return (
        <a
            href={href}
            aria-label={label}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-hairline text-ink-faint transition-all duration-300 hover:border-flux/40 hover:text-flux"
        >
            {children}
        </a>
    );
}

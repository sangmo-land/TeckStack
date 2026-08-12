import React, { useMemo, useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import {
    Search, Award, Users, Star, BookOpen, ArrowRight, ArrowUpRight,
    Code, Database, Cloud, Shield, Cpu, BarChart, X,
} from 'lucide-react';

import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import Reveal from '@/Components/ui/Reveal';
import SpotlightCard from '@/Components/ui/SpotlightCard';
import CountUp from '@/Components/ui/CountUp';
import { PageShell, Aurora, ContourBackdrop, Section, SectionHeading } from '@/Components/ui/Backdrop';

const initialsFromName = (name = '') =>
    name.split(' ').filter(Boolean).slice(0, 2).map((p) => p.charAt(0).toUpperCase()).join('') || 'IN';

const expertiseIcon = (expertise = '') => {
    const e = expertise.toLowerCase();
    if (e.includes('cloud')) return Cloud;
    if (e.includes('database')) return Database;
    if (e.includes('security')) return Shield;
    if (e.includes('devops')) return Cpu;
    if (e.includes('data')) return BarChart;
    return Code;
};

export default function Instructors({ auth, instructors: serverInstructors = [], stats: serverStats = [] }) {
    const [query, setQuery] = useState('');
    const [expertiseFilter, setExpertiseFilter] = useState('all');

    const resolveImageUrl = (raw = '') => {
        if (!raw) return '';
        if (raw.startsWith('http')) return raw;
        if (raw.startsWith('/storage/')) return raw;
        if (raw.startsWith('storage/')) return `/${raw}`;
        if (raw.includes('instructor-images/')) return `/storage/${raw.replace(/^\/?storage\//, '')}`;
        return `/storage/instructor-images/${raw.replace(/^\/+/, '')}`;
    };

    const instructors = useMemo(() => {
        const toArray = (value) => {
            if (Array.isArray(value)) return value;
            if (typeof value === 'string') return value.split(',').map((v) => v.trim()).filter(Boolean);
            return [];
        };

        return serverInstructors.map((it) => ({
            id: it.id,
            userId: it.userId || it.user_id,
            name: it.name || 'Instructor',
            role: it.role_title || it.role || 'Instructor',
            expertise: toArray(it.expertise),
            rating: Number(it.rating ?? 0),
            students: Number(it.students ?? it.total_students ?? 0),
            courses: Number(it.courses ?? it.total_courses ?? 0),
            bio: it.bio || '',
            imageUrl: resolveImageUrl(it.image || ''),
            certifications: toArray(it.certifications),
            yearsExperience: Number(it.years_experience ?? it.yearsExperience ?? 0),
            companies: toArray(it.companies),
        }));
    }, [serverInstructors]);

    const expertiseAreas = useMemo(() => {
        const all = instructors.flatMap((i) => i.expertise).map((e) => e.trim().toLowerCase()).filter(Boolean);
        return ['all', ...Array.from(new Set(all))];
    }, [instructors]);

    // Derived from the actual instructor records rather than fixed marketing copy.
    const summary = useMemo(() => {
        const totalCourses = instructors.reduce((n, i) => n + i.courses, 0);
        const totalStudents = instructors.reduce((n, i) => n + i.students, 0);
        const rated = instructors.filter((i) => i.rating > 0);
        const avgRating = rated.length ? rated.reduce((n, i) => n + i.rating, 0) / rated.length : 0;
        return { totalCourses, totalStudents, avgRating, count: instructors.length };
    }, [instructors]);

    const filtered = instructors.filter((it) => {
        const q = query.toLowerCase();
        const matchesQuery =
            !q || it.name.toLowerCase().includes(q) || it.expertise.some((e) => e.toLowerCase().includes(q));
        const matchesExpertise =
            expertiseFilter === 'all' || it.expertise.some((e) => e.toLowerCase().includes(expertiseFilter));
        return matchesQuery && matchesExpertise;
    });

    return (
        <PageShell>
            <Head>
                <title>Meet Our Instructors — NelnadoSolutions</title>
                <meta name="description" content="Learn from world-class instructors with real-world experience, certifications, and industry backgrounds." />
                <link rel="canonical" href="/instructors" />
                <meta property="og:title" content="Meet Our Instructors — NelnadoSolutions" />
                <meta property="og:description" content="Learn from instructors with real-world experience, certifications, and industry backgrounds." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="/instructors" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Meet Our Instructors — NelnadoSolutions" />
                <meta name="twitter:description" content="Learn from instructors with real-world experience and certifications." />
            </Head>

            <Navbar auth={auth} startSolid />

            {/* ===================== HERO ===================== */}
            <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
                <Aurora />
                <ContourBackdrop seed={58} />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
                    <div className="max-w-2xl">
                        <Reveal>
                            <div className="flex items-center gap-2.5">
                                <span className="h-px w-6 bg-flux/50" />
                                <span className="eyebrow">The faculty</span>
                            </div>
                        </Reveal>
                        <Reveal delay={80}>
                            <h1 className="mt-4 font-display text-[2.5rem] font-semibold leading-[1.04] tracking-tightest text-ink sm:text-[3.5rem]">
                                Learn from people who
                                <br />
                                <span className="text-gradient">ship this for a living.</span>
                            </h1>
                        </Reveal>
                        <Reveal delay={160}>
                            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-ink-dim">
                                Every instructor here is a working practitioner. They teach the systems
                                they operate, with the scars to prove it.
                            </p>
                        </Reveal>
                    </div>

                    {/* Live summary strip */}
                    <Reveal delay={240}>
                        <div className="mt-12 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-hairline bg-white/[0.04]">
                            {[
                                { value: summary.count, label: 'Instructors' },
                                { value: summary.totalCourses, label: 'Courses taught' },
                                { value: summary.totalStudents, label: 'Students reached' },
                            ].map((s) => (
                                <div key={s.label} className="bg-void px-4 py-6 text-center">
                                    <div className="font-display text-2xl font-semibold tracking-tightest text-ink sm:text-3xl">
                                        <CountUp to={s.value} />
                                    </div>
                                    <p className="mt-1.5 font-mono text-[10px] uppercase tracking-mono text-ink-ghost">
                                        {s.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ===================== FILTERS ===================== */}
            <div className="sticky top-16 z-30 border-y border-hairline bg-void/80 backdrop-blur-2xl">
                <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
                    <div className="grid gap-3 sm:grid-cols-[2fr_1fr]">
                        <div className="relative">
                            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-ghost" />
                            <input
                                type="text"
                                placeholder="Search by name or expertise…"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="field pl-10 pr-9"
                            />
                            {query && (
                                <button
                                    onClick={() => setQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-ghost transition-colors hover:text-ink"
                                    aria-label="Clear search"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            )}
                        </div>

                        <div className="relative">
                            <select
                                value={expertiseFilter}
                                onChange={(e) => setExpertiseFilter(e.target.value)}
                                className="field cursor-pointer appearance-none pr-10"
                            >
                                {expertiseAreas.map((area) => (
                                    <option key={area} value={area}>
                                        {area === 'all' ? 'All expertise' : area.replace(/\b\w/g, (l) => l.toUpperCase())}
                                    </option>
                                ))}
                            </select>
                            <svg className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-ghost" viewBox="0 0 12 12" fill="none">
                                <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>

                    <p className="mt-3 font-mono text-[11px] uppercase tracking-mono text-ink-ghost">
                        {filtered.length} instructor{filtered.length === 1 ? '' : 's'}
                    </p>
                </div>
            </div>

            {/* ===================== GRID ===================== */}
            <Section className="py-12 lg:py-16">
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((it, i) => {
                            const Icon = expertiseIcon(it.expertise[0]);
                            return (
                                <Reveal key={it.id} delay={Math.min(i, 8) * 80}>
                                    <SpotlightCard className="panel panel-hover flex h-full flex-col rounded-2xl p-6">
                                        {/* Header */}
                                        <div className="flex items-start gap-4">
                                            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-hairline">
                                                {it.imageUrl ? (
                                                    <img src={it.imageUrl} alt={it.name} className="h-full w-full object-cover" />
                                                ) : (
                                                    <span
                                                        className="flex h-full w-full items-center justify-center font-display text-lg font-semibold text-flux"
                                                        style={{ background: 'radial-gradient(circle at 30% 25%, rgba(34,211,238,0.22), rgba(34,211,238,0.03))' }}
                                                    >
                                                        {initialsFromName(it.name)}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <h3 className="truncate font-display text-lg font-semibold tracking-tighter text-ink">
                                                    {it.name}
                                                </h3>
                                                <p className="mt-0.5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-mono text-flux">
                                                    <Icon className="h-3 w-3" />
                                                    {it.role}
                                                </p>
                                                {it.rating > 0 && (
                                                    <p className="mt-2 flex items-center gap-1.5 text-[13px] text-ink-faint">
                                                        <Star className="h-3.5 w-3.5 fill-warn text-warn" />
                                                        <span className="font-medium text-ink">{it.rating.toFixed(1)}</span>
                                                        {it.students > 0 && <span>· {it.students.toLocaleString()} students</span>}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {it.bio && (
                                            <p className="mt-5 text-[13px] leading-relaxed text-ink-faint line-clamp-3">{it.bio}</p>
                                        )}

                                        {it.expertise.length > 0 && (
                                            <div className="mt-4 flex flex-wrap gap-1.5">
                                                {it.expertise.slice(0, 3).map((e) => (
                                                    <span key={e} className="chip">{e}</span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Metrics — only render what actually has a value */}
                                        <div className="mt-5 grid grid-cols-3 gap-3 border-y border-hairline py-4">
                                            <Metric value={it.courses} label="Courses" />
                                            <Metric value={it.yearsExperience} label="Yrs exp" suffix={it.yearsExperience ? '+' : ''} />
                                            <Metric value={it.students} label="Students" />
                                        </div>

                                        {it.companies.length > 0 && (
                                            <div className="mt-4">
                                                <p className="font-mono text-[10px] uppercase tracking-mono text-ink-ghost">Previously at</p>
                                                <div className="mt-2 flex flex-wrap gap-1.5">
                                                    {it.companies.map((c) => (
                                                        <span key={c} className="chip">{c}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <Link
                                            href={`/courses/instructors=${encodeURIComponent(it.userId || '')}`}
                                            className="btn-ghost group mt-6 w-full"
                                        >
                                            View courses
                                            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                        </Link>
                                    </SpotlightCard>
                                </Reveal>
                            );
                        })}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-hairline-strong px-6 py-20 text-center">
                        <Users className="mx-auto mb-4 h-8 w-8 text-ink-ghost" />
                        <h3 className="font-display text-lg font-semibold tracking-tighter text-ink">No instructors found</h3>
                        <p className="mx-auto mt-2 max-w-sm text-sm text-ink-faint">
                            Try a different search term or clear the expertise filter.
                        </p>
                    </div>
                )}
            </Section>

            {/* ===================== WHY ===================== */}
            <section className="relative overflow-hidden border-y border-hairline bg-void-50/30 py-20 lg:py-24">
                <Aurora variant="quiet" />
                <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
                    <Reveal>
                        <SectionHeading eyebrow="Why it lands" title="What our instructors do differently" align="center" />
                    </Reveal>

                    <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
                        {[
                            { icon: Award, title: 'Credentialed', body: 'Certifications and production experience in the exact systems they teach.', accent: '34,211,238' },
                            { icon: Code, title: 'Hands-on first', body: 'Lessons are built around labs, not lectures. You run everything yourself.', accent: '139,124,255' },
                            { icon: BookOpen, title: 'Kept current', body: 'Material is revised as the underlying products change, not left to age.', accent: '34,211,238' },
                        ].map((f, i) => {
                            const Icon = f.icon;
                            return (
                                <Reveal key={f.title} delay={i * 100}>
                                    <SpotlightCard spotlightColor={f.accent} className="panel panel-hover h-full rounded-2xl p-7">
                                        <span
                                            className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border"
                                            style={{
                                                borderColor: `rgba(${f.accent},0.25)`,
                                                background: `radial-gradient(circle at 30% 25%, rgba(${f.accent},0.22), rgba(${f.accent},0.04))`,
                                            }}
                                        >
                                            <Icon className="h-5 w-5" style={{ color: `rgb(${f.accent})` }} />
                                        </span>
                                        <h3 className="font-display text-lg font-semibold tracking-tighter text-ink">{f.title}</h3>
                                        <p className="mt-2.5 text-sm leading-relaxed text-ink-faint">{f.body}</p>
                                    </SpotlightCard>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===================== CTA ===================== */}
            <Section className="py-20 lg:py-28">
                <Reveal>
                    <SpotlightCard
                        radius={620}
                        intensity={0.12}
                        className="relative overflow-hidden rounded-3xl border border-hairline-strong bg-void-100 px-6 py-20 text-center sm:px-16"
                    >
                        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid-sm opacity-50 mask-radial" />
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-x-0 -bottom-40 h-80 blur-3xl"
                            style={{ background: 'radial-gradient(closest-side, rgba(34,211,238,0.26), transparent 70%)' }}
                        />
                        <div className="relative mx-auto max-w-2xl">
                            <h2 className="font-display text-[2rem] font-semibold leading-[1.06] tracking-tightest text-ink sm:text-[2.75rem]">
                                Ready to learn from them?
                            </h2>
                            <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-ink-dim">
                                Browse every track, or create a free account and start with the fundamentals.
                            </p>
                            <div className="mt-9 flex flex-wrap justify-center gap-3">
                                <Link href="/courses" className="btn-flux group">
                                    Browse all courses
                                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                                </Link>
                                <Link href="/register" className="btn-ghost">Get started free</Link>
                            </div>
                        </div>
                    </SpotlightCard>
                </Reveal>
            </Section>

            <Footer />
        </PageShell>
    );
}

function Metric({ value, label, suffix = '' }) {
    return (
        <div className="text-center">
            <div className="font-display text-lg font-semibold tracking-tighter text-ink">
                {Number(value || 0).toLocaleString()}{suffix}
            </div>
            <div className="mt-0.5 font-mono text-[10px] uppercase tracking-mono text-ink-ghost">{label}</div>
        </div>
    );
}

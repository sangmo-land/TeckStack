import React, { useEffect, useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import {
    ArrowRight, ArrowUpRight, Award, ShieldCheck, Play, Quote,
    Terminal as TerminalIcon, GitBranch, Gauge, Layers, TrendingUp,
} from 'lucide-react';

import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import Reveal from '@/Components/ui/Reveal';
import SpotlightCard from '@/Components/ui/SpotlightCard';
import CountUp from '@/Components/ui/CountUp';
import Marquee from '@/Components/ui/Marquee';
import Terminal from '@/Components/ui/Terminal';
import CourseCard, { CourseCardSkeleton } from '@/Components/ui/CourseCard';
import { PageShell, Aurora, GridBackdrop, Section, SectionHeading } from '@/Components/ui/Backdrop';

const TECHNOLOGIES = [
    'Oracle', 'MySQL', 'PostgreSQL', 'AWS', 'PL/SQL', 'MongoDB',
    'Redis', 'Azure', 'Snowflake', 'Terraform',
];

const CAPABILITIES = [
    {
        icon: TerminalIcon,
        title: 'Live query sandboxes',
        body: 'Every lesson ships with a seeded database you can break, tune, and restore — no local setup, no sample-data theatre.',
        span: 'lg:col-span-3',
        accent: '34,211,238',
    },
    {
        icon: Gauge,
        title: 'Real performance work',
        body: 'Read execution plans, chase down lock contention, and tune indexes against tables large enough to actually behave like production.',
        span: 'lg:col-span-3',
        accent: '139,124,255',
    },
    {
        icon: GitBranch,
        title: 'Versioned curriculum',
        body: 'Courses track upstream releases. When the optimiser changes, the module gets rewritten — not appended to.',
        span: 'lg:col-span-2',
        accent: '34,211,238',
    },
    {
        icon: ShieldCheck,
        title: 'Verified certificates',
        body: 'Assessed on working systems, not multiple choice.',
        span: 'lg:col-span-2',
        accent: '139,124,255',
    },
    {
        icon: Layers,
        title: 'Structured tracks',
        body: 'Sequenced paths from fundamentals to production ownership.',
        span: 'lg:col-span-2',
        accent: '34,211,238',
    },
];

const PATH = [
    { step: '01', title: 'Assess', body: 'A short diagnostic places you at the right depth, so you skip what you already run daily.' },
    { step: '02', title: 'Build', body: 'Work through graded labs against live instances — every module ends in something that runs.' },
    { step: '03', title: 'Prove', body: 'Sit a practical assessment on a real system and earn a certificate tied to that work.' },
];

export default function Welcome({ auth, testimonials = [], learnerCount = 0, stats = {} }) {
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/trending-courses')
            .then((r) => r.json())
            .then((d) => setTrending((Array.isArray(d) ? d : d?.courses || []).slice(0, 6)))
            .catch(() => setTrending([]))
            .finally(() => setLoading(false));
    }, []);

    const defaultTestimonials = [
        { text: 'The Oracle DBA course transformed my career.', author: 'M. Johnson', rating: 5 },
        { text: 'Hands-on projects made cloud concepts easy.', author: 'A. Gupta', rating: 5 },
        { text: 'Clear teaching and real-world content.', author: 'S. Fernandez', rating: 5 },
    ];
    const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

    // Every figure comes from the database — none are hardcoded marketing numbers.
    // With no reviews yet, an "0.0 average rating" tile would advertise a zero,
    // so fall back to curriculum depth until real ratings exist.
    const hasReviews = (stats.reviewCount ?? 0) > 0;
    const STAT_TILES = [
        { value: stats.courses ?? 0, label: 'Courses published', sub: 'across every track' },
        { value: learnerCount, label: 'Registered learners', sub: 'students and instructors' },
        hasReviews
            ? {
                  value: stats.avgRating ?? 0,
                  decimals: 1,
                  label: 'Average rating',
                  sub: `from ${stats.reviewCount} review${stats.reviewCount === 1 ? '' : 's'}`,
              }
            : { value: stats.chapters ?? 0, label: 'Chapters', sub: 'of hands-on material' },
        { value: stats.instructors ?? 0, label: 'Instructors', sub: 'working practitioners' },
    ];

    return (
        <PageShell>
            <Head>
                <title>NelnadoSolutions — Database & Cloud IT Training | Oracle DBA, AWS, Azure</title>
                <meta name="description" content="Professional IT training in Database Management (Oracle DBA, MySQL, PostgreSQL) and Cloud Computing (AWS, Azure, Google Cloud). Expert-led courses for IT professionals seeking certification and career advancement." />
                <meta name="keywords" content="Oracle DBA training, AWS certification, Azure cloud training, database administrator course, cloud computing training, IT professional development, Oracle database training, cloud architecture certification" />
                <link rel="canonical" href="https://nelnadosolutions.com/" />
                <meta property="og:site_name" content="NelnadoSolutions" />
                <meta property="og:title" content="NelnadoSolutions — Database & Cloud IT Training" />
                <meta property="og:description" content="Professional IT training in Database Management and Cloud Computing. Oracle DBA, AWS, Azure certification courses." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://nelnadosolutions.com/" />
                <meta property="og:locale" content="en_US" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="NelnadoSolutions — Database & Cloud IT Training" />
                <meta name="twitter:description" content="Professional IT training in Database Management and Cloud Computing. Oracle DBA, AWS, Azure certification courses." />
                <script type="application/ld+json">{`
                    {
                        "@context": "https://schema.org",
                        "@type": "EducationalOrganization",
                        "name": "NelnadoSolutions",
                        "url": "https://nelnadosolutions.com",
                        "description": "Professional IT training platform specializing in Database Management and Cloud Computing",
                        "areaServed": "Worldwide",
                        "teaches": [
                            "Oracle Database Administration",
                            "AWS Cloud Computing",
                            "Azure Cloud Services",
                            "Database Management",
                            "Cloud Architecture"
                        ]
                    }
                `}</script>
            </Head>

            <Navbar auth={auth} />

            {/* ==========================================================
                HERO
                ========================================================== */}
            <section className="relative overflow-hidden pb-24 pt-32 sm:pt-40 lg:pb-32 lg:pt-44">
                <Aurora />
                <GridBackdrop />

                <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
                    <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
                        <div>
                            <Reveal>
                                <Link
                                    href="/courses"
                                    className="group inline-flex items-center gap-2.5 rounded-full border border-hairline bg-white/[0.03] py-1.5 pl-2 pr-3.5 backdrop-blur-sm transition-colors duration-300 hover:border-flux/30"
                                >
                                    <span className="rounded-full bg-flux/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-mono text-flux">
                                        New
                                    </span>
                                    <span className="text-[13px] text-ink-dim">Oracle &amp; cloud tracks are live</span>
                                    <ArrowRight className="h-3 w-3 text-ink-ghost transition-transform duration-300 group-hover:translate-x-0.5" />
                                </Link>
                            </Reveal>

                            <Reveal delay={80}>
                                <h1 className="mt-7 font-display text-[2.85rem] font-semibold leading-[1.02] tracking-tightest text-ink sm:text-[3.75rem] lg:text-[4.25rem]">
                                    Engineer the
                                    <br />
                                    systems that
                                    <br />
                                    <span className="text-gradient">everything runs on.</span>
                                </h1>
                            </Reveal>

                            <Reveal delay={160}>
                                <p className="mt-7 max-w-lg text-[17px] leading-relaxed text-ink-dim">
                                    Deep, practical training in Oracle, MySQL, and cloud data infrastructure —
                                    taught against live systems by engineers who operate them in production.
                                </p>
                            </Reveal>

                            <Reveal delay={240}>
                                <div className="mt-9 flex flex-wrap items-center gap-3">
                                    <Link href="/courses" className="btn-flux group">
                                        Browse courses
                                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                                    </Link>
                                    <Link href={auth?.user ? '/dashboard' : '/register'} className="btn-ghost group">
                                        <Play className="h-3.5 w-3.5 fill-current" />
                                        {auth?.user ? 'Go to dashboard' : 'Get started free'}
                                    </Link>
                                </div>
                            </Reveal>

                            <Reveal delay={320}>
                                <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-hairline pt-7">
                                    {[
                                        { icon: Award, text: 'Verified certificates' },
                                        { icon: TerminalIcon, text: 'Hands-on labs' },
                                        { icon: TrendingUp, text: 'Updated quarterly' },
                                    ].map(({ icon: Icon, text }) => (
                                        <span key={text} className="inline-flex items-center gap-2 text-[13px] text-ink-faint">
                                            <Icon className="h-3.5 w-3.5 text-flux/70" />
                                            {text}
                                        </span>
                                    ))}
                                </div>
                            </Reveal>
                        </div>

                        <Reveal delay={200} direction="left" distance={28}>
                            <Terminal className="lg:translate-y-2" />
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ==========================================================
                TECHNOLOGY MARQUEE
                ========================================================== */}
            <section className="relative border-y border-hairline bg-void-50/40 py-10">
                <p className="mb-7 text-center font-mono text-[10px] uppercase tracking-mono text-ink-ghost">
                    Curriculum covers
                </p>
                <Marquee speed={42}>
                    {TECHNOLOGIES.map((tech) => (
                        <span
                            key={tech}
                            className="mx-8 whitespace-nowrap font-display text-2xl font-medium tracking-tighter text-ink-ghost transition-colors duration-500 hover:text-ink sm:text-3xl"
                        >
                            {tech}
                        </span>
                    ))}
                </Marquee>
            </section>

            {/* ==========================================================
                STATS — live figures
                ========================================================== */}
            <Section className="py-20 lg:py-24">
                <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-hairline bg-white/[0.04] lg:grid-cols-4">
                    {STAT_TILES.map((stat, i) => (
                        <Reveal key={stat.label} delay={i * 90} className="bg-void">
                            <div className="group relative h-full px-6 py-9 transition-colors duration-500 hover:bg-white/[0.02]">
                                <div className="font-display text-4xl font-semibold tracking-tightest text-ink sm:text-[2.75rem]">
                                    <CountUp to={Number(stat.value) || 0} decimals={stat.decimals || 0} />
                                </div>
                                <p className="mt-2.5 text-sm font-medium text-ink-dim">{stat.label}</p>
                                <p className="mt-0.5 font-mono text-[11px] text-ink-ghost">{stat.sub}</p>
                                <span className="absolute inset-x-6 bottom-0 h-px scale-x-0 bg-gradient-to-r from-flux to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100" />
                            </div>
                        </Reveal>
                    ))}
                </div>
            </Section>

            {/* ==========================================================
                TRENDING COURSES
                ========================================================== */}
            <Section className="py-14 lg:py-20">
                <Reveal>
                    <SectionHeading
                        eyebrow="Trending now"
                        title="What engineers are learning this month"
                        lede="Ranked by active enrolment across all tracks."
                        action={
                            <Link href="/courses" className="group inline-flex items-center gap-1.5 text-sm text-ink-dim transition-colors hover:text-flux">
                                View all
                                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </Link>
                        }
                    />
                </Reveal>

                <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {loading
                        ? [...Array(3)].map((_, i) => <CourseCardSkeleton key={i} />)
                        : trending.map((course, i) => (
                              <Reveal key={course.id || course.slug} delay={i * 90}>
                                  <CourseCard course={course} />
                              </Reveal>
                          ))}
                </div>

                {!loading && trending.length === 0 && (
                    <div className="mt-12 rounded-2xl border border-dashed border-hairline-strong px-6 py-14 text-center">
                        <p className="font-mono text-[11px] uppercase tracking-mono text-ink-ghost">No courses yet</p>
                        <p className="mt-2 text-sm text-ink-faint">Check back shortly — new tracks publish every month.</p>
                    </div>
                )}
            </Section>

            {/* ==========================================================
                CAPABILITIES — bento
                ========================================================== */}
            <Section className="py-20 lg:py-28">
                <Reveal>
                    <SectionHeading
                        eyebrow="Why it works"
                        title="Training that behaves like the job"
                        lede="Most courses teach syntax. These put you in front of a system that is already misbehaving and expect you to fix it."
                        align="center"
                    />
                </Reveal>

                <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6">
                    {CAPABILITIES.map((cap, i) => {
                        const Icon = cap.icon;
                        return (
                            <Reveal key={cap.title} delay={i * 80} className={cap.span}>
                                <SpotlightCard spotlightColor={cap.accent} className="panel panel-hover h-full rounded-2xl p-7">
                                    <span
                                        className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border"
                                        style={{
                                            borderColor: `rgba(${cap.accent},0.25)`,
                                            background: `radial-gradient(circle at 30% 25%, rgba(${cap.accent},0.22), rgba(${cap.accent},0.04))`,
                                        }}
                                    >
                                        <Icon className="h-5 w-5" style={{ color: `rgb(${cap.accent})` }} />
                                    </span>
                                    <h3 className="font-display text-lg font-semibold tracking-tighter text-ink">{cap.title}</h3>
                                    <p className="mt-2.5 text-sm leading-relaxed text-ink-faint">{cap.body}</p>
                                </SpotlightCard>
                            </Reveal>
                        );
                    })}
                </div>
            </Section>

            {/* ==========================================================
                LEARNING PATH
                ========================================================== */}
            <section className="relative overflow-hidden border-y border-hairline bg-void-50/30 py-20 lg:py-28">
                <Aurora variant="quiet" />
                <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
                    <Reveal>
                        <SectionHeading eyebrow="The path" title="Three moves from curious to production-ready" align="center" />
                    </Reveal>

                    <div className="relative mt-16">
                        <div
                            aria-hidden="true"
                            className="absolute left-0 right-0 top-7 hidden h-px lg:block"
                            style={{ background: 'linear-gradient(90deg, transparent, rgba(34,211,238,0.35) 15%, rgba(139,124,255,0.35) 85%, transparent)' }}
                        />
                        <div className="grid gap-12 lg:grid-cols-3 lg:gap-10">
                            {PATH.map((item, i) => (
                                <Reveal key={item.step} delay={i * 140}>
                                    <div className="relative">
                                        <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-flux/25 bg-void font-mono text-sm text-flux">
                                            {item.step}
                                            <span className="absolute inset-0 animate-pulse-ring rounded-full border border-flux/40" style={{ animationDelay: `${i * 0.7}s` }} />
                                        </span>
                                        <h3 className="mt-6 font-display text-xl font-semibold tracking-tighter text-ink">{item.title}</h3>
                                        <p className="mt-2.5 max-w-sm text-sm leading-relaxed text-ink-faint">{item.body}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================================
                TESTIMONIALS
                ========================================================== */}
            <Section className="py-20 lg:py-28">
                <Reveal>
                    <SectionHeading eyebrow="Signal" title="What learners say" align="center" />
                </Reveal>

                <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
                    {displayTestimonials.map((t, i) => (
                        <Reveal key={i} delay={i * 110}>
                            <SpotlightCard className="panel panel-hover h-full rounded-2xl p-7">
                                <Quote className="mb-5 h-6 w-6 text-flux/40" />
                                <p className="text-[15px] leading-relaxed text-ink-dim">{t.text}</p>

                                <div className="mt-6 flex items-center gap-3 border-t border-hairline pt-5">
                                    <span
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-flux/25 font-mono text-xs text-flux"
                                        style={{ background: 'radial-gradient(circle at 30% 25%, rgba(34,211,238,0.25), rgba(34,211,238,0.04))' }}
                                    >
                                        {String(t.author || '?').replace(/^—\s*/, '').charAt(0).toUpperCase()}
                                    </span>
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium text-ink">{t.author}</p>
                                        {t.course && <p className="truncate font-mono text-[11px] text-ink-ghost">{t.course}</p>}
                                    </div>
                                    <span className="ml-auto font-mono text-[11px] text-warn">
                                        {'★'.repeat(t.rating || 5)}
                                    </span>
                                </div>
                            </SpotlightCard>
                        </Reveal>
                    ))}
                </div>
            </Section>

            {/* ==========================================================
                CTA
                ========================================================== */}
            <Section className="pb-28">
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
                            <div className="mb-6 flex justify-center">
                                <span className="chip-flux">
                                    <span className="h-1 w-1 rounded-full bg-flux" />
                                    Enrolment open
                                </span>
                            </div>

                            <h2 className="font-display text-[2.25rem] font-semibold leading-[1.05] tracking-tightest text-ink sm:text-[3rem]">
                                Stop reading about databases.
                                <br />
                                <span className="text-gradient-flux">Start running them.</span>
                            </h2>

                            <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-ink-dim">
                                Full lifetime access, hands-on labs from the first lesson, and a certificate
                                that reflects work you actually did.
                            </p>

                            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                                <Link href={auth?.user ? '/courses' : '/register'} className="btn-flux group">
                                    {auth?.user ? 'Browse the catalogue' : 'Create free account'}
                                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                                </Link>
                                <Link href="/pricing" className="btn-ghost">See pricing</Link>
                            </div>
                        </div>
                    </SpotlightCard>
                </Reveal>
            </Section>

            <Footer />
        </PageShell>
    );
}

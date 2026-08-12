import React from 'react';
import { Link, Head } from '@inertiajs/react';
import {
    Target, Users, BookOpen, TrendingUp, CheckCircle2,
    Terminal as TerminalIcon, Award, ArrowRight, Layers,
} from 'lucide-react';

import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import Reveal from '@/Components/ui/Reveal';
import SpotlightCard from '@/Components/ui/SpotlightCard';
import CountUp from '@/Components/ui/CountUp';
import { PageShell, Aurora, ContourBackdrop, Section, SectionHeading } from '@/Components/ui/Backdrop';

const VALUES = [
    {
        icon: Target,
        title: 'Depth over breadth',
        body: 'We would rather ship four tracks that take you to production ownership than forty that stop at "hello world".',
        accent: '34,211,238',
    },
    {
        icon: TerminalIcon,
        title: 'Systems, not slides',
        body: 'Every concept is taught against a live instance. If you cannot run it, we have not finished teaching it.',
        accent: '139,124,255',
    },
    {
        icon: TrendingUp,
        title: 'Current by default',
        body: 'Courses track upstream releases. Material that no longer reflects the product gets rewritten, not patched.',
        accent: '34,211,238',
    },
    {
        icon: Users,
        title: 'Taught by operators',
        body: 'Instructors are people who run these systems for a living, not full-time course producers.',
        accent: '139,124,255',
    },
];

const COMMITMENTS = [
    'Industry-relevant curriculum, revised as upstream products change',
    'Sequenced learning paths for every skill level',
    'Real-world projects and production-shaped case studies',
    'Lifetime access to everything you enrol in',
    'Direct support from the people who wrote the material',
];

export default function About({ auth, team: teamFromProps = [], studentCount = 0, courseCount = 0 }) {
    const team = teamFromProps.length
        ? teamFromProps
        : [
              {
                  name: 'Mokom Nelvis Fon',
                  role: 'Founder',
                  expertise: 'Oracle Database Administrator',
                  avatar_url: null,
              },
          ];

    return (
        <PageShell>
            <Head>
                <title>About NelnadoSolutions — Mission, Values, Founder</title>
                <meta name="description" content="NelnadoSolutions empowers tech professionals through world-class learning experiences. Meet our founder and learn our mission and values." />
                <link rel="canonical" href="/about" />
                <meta property="og:title" content="About NelnadoSolutions — Mission, Values, Founder" />
                <meta property="og:description" content="Empowering tech professionals through expert instruction and hands-on learning." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="/about" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="About NelnadoSolutions — Mission, Values, Founder" />
                <meta name="twitter:description" content="Empowering tech professionals through expert instruction and hands-on learning." />
            </Head>

            <Navbar auth={auth} startSolid />

            {/* ===================== HERO ===================== */}
            <section className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
                <Aurora />
                <ContourBackdrop seed={41} />

                <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
                    <Reveal>
                        <span className="chip-flux">
                            <span className="h-1 w-1 rounded-full bg-flux" />
                            Founded 2025
                        </span>
                    </Reveal>

                    <Reveal delay={80}>
                        <h1 className="mt-7 font-display text-[2.75rem] font-semibold leading-[1.03] tracking-tightest text-ink sm:text-[4rem]">
                            Training built by people
                            <br />
                            who <span className="text-gradient">run the systems.</span>
                        </h1>
                    </Reveal>

                    <Reveal delay={160}>
                        <p className="mx-auto mt-7 max-w-2xl text-[17px] leading-relaxed text-ink-dim">
                            NelnadoSolutions exists because most database training stops exactly where
                            the hard part begins. We teach the operational depth that only shows up
                            once a system is under real load.
                        </p>
                    </Reveal>

                    <Reveal delay={240}>
                        <div className="mt-10 flex flex-wrap justify-center gap-3">
                            <Link href="/courses" className="btn-flux group">
                                Explore courses
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                            </Link>
                            <Link href="/instructors" className="btn-ghost">Meet the instructors</Link>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ===================== STATS ===================== */}
            <Section className="pb-20">
                <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-hairline bg-white/[0.04]">
                    {[
                        { icon: BookOpen, value: courseCount, label: 'Courses published' },
                        { icon: Users, value: studentCount, label: 'Registered learners' },
                        { icon: Layers, value: team.length, label: 'Team members' },
                    ].map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <Reveal key={stat.label} delay={i * 90} className="bg-void">
                                <div className="group h-full px-4 py-8 text-center transition-colors duration-500 hover:bg-white/[0.02] sm:px-6">
                                    <Icon className="mx-auto mb-4 h-4 w-4 text-flux/70" />
                                    <div className="font-display text-3xl font-semibold tracking-tightest text-ink sm:text-4xl">
                                        <CountUp to={Number(stat.value) || 0} />
                                    </div>
                                    <p className="mt-2 font-mono text-[10px] uppercase tracking-mono text-ink-ghost">
                                        {stat.label}
                                    </p>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </Section>

            {/* ===================== MISSION ===================== */}
            <Section className="py-16 lg:py-24">
                <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
                    <Reveal>
                        <div className="mb-4 flex items-center gap-2.5">
                            <span className="h-px w-6 bg-flux/50" />
                            <span className="eyebrow">Our mission</span>
                        </div>
                        <h2 className="font-display text-3xl font-semibold tracking-tightest text-ink sm:text-[2.5rem]">
                            Make operational depth learnable.
                        </h2>
                        <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-ink-dim">
                            <p>
                                Plenty of courses will teach you to write a <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[13px] text-flux">SELECT</code>.
                                Very few will show you what happens when that query meets a hundred
                                million rows, a bad index, and an impatient application.
                            </p>
                            <p>
                                We build training for that second situation — the one you actually get
                                paid for. Quality education should not depend on which company happens
                                to employ you, so everything here is designed to be learned from scratch,
                                from anywhere.
                            </p>
                        </div>
                    </Reveal>

                    <Reveal delay={140}>
                        <SpotlightCard className="panel rounded-2xl p-8">
                            <h3 className="font-mono text-[10px] uppercase tracking-mono text-ink-ghost">
                                What we commit to
                            </h3>
                            <ul className="mt-6 space-y-4">
                                {COMMITMENTS.map((item) => (
                                    <li key={item} className="flex items-start gap-3">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-flux" />
                                        <span className="text-sm leading-relaxed text-ink-dim">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </SpotlightCard>
                    </Reveal>
                </div>
            </Section>

            {/* ===================== VALUES ===================== */}
            <section className="relative overflow-hidden border-y border-hairline bg-void-50/30 py-20 lg:py-28">
                <Aurora variant="quiet" />
                <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
                    <Reveal>
                        <SectionHeading
                            eyebrow="Principles"
                            title="What we optimise for"
                            lede="Four decisions that shape everything we publish."
                            align="center"
                        />
                    </Reveal>

                    <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
                        {VALUES.map((value, i) => {
                            const Icon = value.icon;
                            return (
                                <Reveal key={value.title} delay={i * 90}>
                                    <SpotlightCard
                                        spotlightColor={value.accent}
                                        className="panel panel-hover h-full rounded-2xl p-7"
                                    >
                                        <span
                                            className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border"
                                            style={{
                                                borderColor: `rgba(${value.accent},0.25)`,
                                                background: `radial-gradient(circle at 30% 25%, rgba(${value.accent},0.22), rgba(${value.accent},0.04))`,
                                            }}
                                        >
                                            <Icon className="h-5 w-5" style={{ color: `rgb(${value.accent})` }} />
                                        </span>
                                        <h3 className="font-display text-lg font-semibold tracking-tighter text-ink">
                                            {value.title}
                                        </h3>
                                        <p className="mt-2.5 text-sm leading-relaxed text-ink-faint">{value.body}</p>
                                    </SpotlightCard>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===================== TEAM ===================== */}
            <Section className="py-20 lg:py-28">
                <Reveal>
                    <SectionHeading
                        eyebrow="The team"
                        title="Who you'll learn from"
                        lede="Practitioners first, instructors second."
                        align="center"
                    />
                </Reveal>

                <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {team.map((member, i) => (
                        <Reveal key={member.name || i} delay={i * 100}>
                            <SpotlightCard className="panel panel-hover h-full rounded-2xl p-7 text-center">
                                <div className="mx-auto mb-5 h-24 w-24 overflow-hidden rounded-2xl border border-hairline">
                                    {member.avatar_url ? (
                                        <img
                                            src={member.avatar_url.startsWith('http') ? member.avatar_url : `/storage/${member.avatar_url}`}
                                            alt={member.name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <span
                                            className="flex h-full w-full items-center justify-center font-display text-2xl font-semibold text-flux"
                                            style={{ background: 'radial-gradient(circle at 30% 25%, rgba(34,211,238,0.22), rgba(34,211,238,0.03))' }}
                                        >
                                            {(member.name || '?').split(' ').map((n) => n[0]).join('').slice(0, 2)}
                                        </span>
                                    )}
                                </div>

                                <h3 className="font-display text-lg font-semibold tracking-tighter text-ink">{member.name}</h3>
                                <p className="mt-1 font-mono text-[10px] uppercase tracking-mono text-flux">{member.role}</p>
                                {member.expertise && (
                                    <p className="mt-3 text-[13px] leading-relaxed text-ink-faint">{member.expertise}</p>
                                )}
                            </SpotlightCard>
                        </Reveal>
                    ))}
                </div>
            </Section>

            {/* ===================== CTA ===================== */}
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
                            <Award className="mx-auto mb-6 h-6 w-6 text-flux" />
                            <h2 className="font-display text-[2rem] font-semibold leading-[1.06] tracking-tightest text-ink sm:text-[2.75rem]">
                                Ready to go deeper?
                            </h2>
                            <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-ink-dim">
                                Start with any track. Everything you enrol in stays yours for good.
                            </p>
                            <div className="mt-9 flex flex-wrap justify-center gap-3">
                                <Link href="/courses" className="btn-flux group">
                                    Browse courses
                                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                                </Link>
                                <Link href="/register" className="btn-ghost">Create free account</Link>
                            </div>
                        </div>
                    </SpotlightCard>
                </Reveal>
            </Section>

            <Footer />
        </PageShell>
    );
}

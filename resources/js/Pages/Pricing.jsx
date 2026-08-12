import React, { useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import {
    Check, X, Zap, Crown, Sparkles, Shield, Clock, Headphones,
    ChevronDown, ArrowRight,
} from 'lucide-react';

import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import Reveal from '@/Components/ui/Reveal';
import SpotlightCard from '@/Components/ui/SpotlightCard';
import { PageShell, Aurora, GridBackdrop, Section, SectionHeading } from '@/Components/ui/Backdrop';

const PLANS = [
    {
        name: 'Free',
        icon: Sparkles,
        accent: '148,163,184',
        price: { monthly: 0, annual: 0 },
        description: 'Enough to find out whether this is for you.',
        cta: 'Get started free',
        href: '/register',
        highlight: false,
        features: [
            { text: 'Access to 5 free courses', included: true },
            { text: 'Standard video quality', included: true },
            { text: 'Community forum access', included: true },
            { text: 'Course completion certificates', included: true },
            { text: 'Downloadable resources', included: false },
            { text: 'Live Q&A sessions', included: false },
            { text: '1-on-1 mentorship', included: false },
            { text: 'Priority support', included: false },
        ],
    },
    {
        name: 'Pro',
        icon: Zap,
        accent: '34,211,238',
        price: { monthly: 29, annual: 290 },
        description: 'For engineers working toward production ownership.',
        cta: 'Start Pro',
        href: '/checkout',
        highlight: true,
        features: [
            { text: 'Access to every published course', included: true },
            { text: 'HD video quality', included: true },
            { text: 'Downloadable resources & code', included: true },
            { text: 'Interactive lab exercises', included: true },
            { text: 'Offline access', included: true },
            { text: 'Monthly live Q&A sessions', included: true },
            { text: 'Priority email support', included: true },
            { text: '1-on-1 mentorship', included: false },
        ],
    },
    {
        name: 'Enterprise',
        icon: Crown,
        accent: '139,124,255',
        price: { monthly: 99, annual: 990 },
        description: 'For teams that need depth, guidance, and reporting.',
        cta: 'Talk to us',
        href: '/contact',
        highlight: false,
        features: [
            { text: 'Everything in Pro', included: true },
            { text: 'Highest video quality', included: true },
            { text: 'Unlimited downloads', included: true },
            { text: 'Weekly 1-on-1 mentorship', included: true },
            { text: 'Personalised learning paths', included: true },
            { text: 'Early access to new courses', included: true },
            { text: 'Career coaching sessions', included: true },
            { text: '24/7 priority support', included: true },
        ],
    },
];

const FAQS = [
    { q: 'Can I switch plans at any time?', a: 'Yes. Upgrades take effect immediately; downgrades apply at the end of your current billing cycle.' },
    { q: 'What happens if I cancel?', a: 'You keep paid access until the end of the billing period, then revert to Free. Courses you already completed stay accessible.' },
    { q: 'Do you offer refunds?', a: 'Yes — a 30-day money-back guarantee on all paid plans, no questions asked.' },
    { q: 'Are there hidden fees?', a: 'No. The price shown is the price charged. No setup fees, no per-seat surprises.' },
    { q: 'Is annual billing cheaper?', a: 'Annual billing saves roughly two months compared with paying monthly, and you are invoiced once per year.' },
    { q: 'Do you offer student or team discounts?', a: 'Students get 50% off with verification. Team pricing starts at 5 licences — get in touch for a quote.' },
    { q: 'Which payment methods do you accept?', a: 'All major credit cards and PayPal. Enterprise customers can pay by wire transfer.' },
    { q: 'Can I access courses offline?', a: 'Pro and Enterprise members can download course videos and lab resources for offline use.' },
];

const GUARANTEES = [
    { icon: Shield, title: '30-day money back', body: 'Not the right fit? Full refund inside 30 days, no questions asked.' },
    { icon: Clock, title: 'Lifetime course access', body: 'Anything you complete stays yours, even after a subscription ends.' },
    { icon: Headphones, title: 'Real human support', body: 'Answers from the people who wrote the material, not a ticket queue.' },
];

export default function Pricing({ auth }) {
    const [cycle, setCycle] = useState('monthly');
    const [openFaq, setOpenFaq] = useState(null);

    const savings = (plan) => plan.price.monthly * 12 - plan.price.annual;

    return (
        <PageShell>
            <Head title="Pricing" />
            <Navbar auth={auth} startSolid />

            {/* ===================== HERO ===================== */}
            <section className="relative overflow-hidden pb-16 pt-32 sm:pt-40">
                <Aurora />
                <GridBackdrop />

                <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
                    <Reveal>
                        <span className="chip-flux">Simple, transparent pricing</span>
                    </Reveal>
                    <Reveal delay={80}>
                        <h1 className="mt-7 font-display text-[2.75rem] font-semibold leading-[1.03] tracking-tightest text-ink sm:text-[4rem]">
                            Pay for depth,
                            <br />
                            <span className="text-gradient">not for volume.</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={160}>
                        <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-ink-dim">
                            Start free and upgrade when you need the labs. Every plan keeps lifetime
                            access to the courses you finish.
                        </p>
                    </Reveal>

                    {/* Billing toggle */}
                    <Reveal delay={240}>
                        <div className="mt-10 inline-flex items-center gap-1 rounded-full border border-hairline bg-white/[0.03] p-1 backdrop-blur-sm">
                            {['monthly', 'annual'].map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setCycle(c)}
                                    className={`relative rounded-full px-5 py-2 text-sm font-medium capitalize transition-all duration-300 ${
                                        cycle === c ? 'bg-ink text-void' : 'text-ink-faint hover:text-ink'
                                    }`}
                                >
                                    {c}
                                    {c === 'annual' && cycle !== 'annual' && (
                                        <span className="ml-2 rounded-full bg-signal/15 px-2 py-0.5 font-mono text-[10px] text-signal">
                                            −17%
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ===================== PLANS ===================== */}
            <Section className="pb-20">
                <div className="grid items-start gap-5 lg:grid-cols-3">
                    {PLANS.map((plan, i) => {
                        const Icon = plan.icon;
                        const monthly = cycle === 'monthly' ? plan.price.monthly : Math.round(plan.price.annual / 12);

                        return (
                            <Reveal key={plan.name} delay={i * 110}>
                                <SpotlightCard
                                    spotlightColor={plan.accent}
                                    className={`panel relative flex h-full flex-col rounded-2xl p-7 ${
                                        plan.highlight ? 'border-flux/30 lg:-translate-y-4 lg:pb-9 lg:pt-9' : 'panel-hover'
                                    }`}
                                >
                                    {plan.highlight && (
                                        <>
                                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-flux/30 bg-void px-3 py-1 font-mono text-[10px] uppercase tracking-mono text-flux">
                                                Most popular
                                            </span>
                                            <div
                                                aria-hidden="true"
                                                className="pointer-events-none absolute inset-x-0 -top-24 h-48 blur-3xl"
                                                style={{ background: 'radial-gradient(closest-side, rgba(34,211,238,0.18), transparent 70%)' }}
                                            />
                                        </>
                                    )}

                                    <span
                                        className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border"
                                        style={{
                                            borderColor: `rgba(${plan.accent},0.25)`,
                                            background: `radial-gradient(circle at 30% 25%, rgba(${plan.accent},0.22), rgba(${plan.accent},0.04))`,
                                        }}
                                    >
                                        <Icon className="h-5 w-5" style={{ color: `rgb(${plan.accent})` }} />
                                    </span>

                                    <h3 className="font-display text-xl font-semibold tracking-tighter text-ink">{plan.name}</h3>
                                    <p className="mt-1.5 text-[13px] leading-relaxed text-ink-faint">{plan.description}</p>

                                    {/* Price */}
                                    <div className="mt-7 border-b border-hairline pb-7">
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="font-display text-[3rem] font-semibold leading-none tracking-tightest text-ink">
                                                ${monthly}
                                            </span>
                                            <span className="font-mono text-[11px] text-ink-ghost">/month</span>
                                        </div>
                                        {cycle === 'annual' && plan.price.annual > 0 && (
                                            <p className="mt-2.5 font-mono text-[11px] text-ink-ghost">
                                                ${plan.price.annual} billed yearly ·{' '}
                                                <span className="text-signal">save ${savings(plan)}</span>
                                            </p>
                                        )}
                                        {plan.price.monthly === 0 && (
                                            <p className="mt-2.5 font-mono text-[11px] text-ink-ghost">Free forever</p>
                                        )}
                                    </div>

                                    {/* Features */}
                                    <ul className="mt-7 flex-1 space-y-3.5">
                                        {plan.features.map((f) => (
                                            <li key={f.text} className="flex items-start gap-2.5">
                                                {f.included ? (
                                                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-flux" />
                                                ) : (
                                                    <X className="mt-0.5 h-4 w-4 shrink-0 text-void-400" />
                                                )}
                                                <span className={`text-[13px] leading-relaxed ${f.included ? 'text-ink-dim' : 'text-ink-ghost line-through decoration-void-400'}`}>
                                                    {f.text}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        href={plan.href}
                                        className={`${plan.highlight ? 'btn-flux' : 'btn-ghost'} group mt-8 w-full`}
                                    >
                                        {plan.cta}
                                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                                    </Link>
                                </SpotlightCard>
                            </Reveal>
                        );
                    })}
                </div>
            </Section>

            {/* ===================== GUARANTEES ===================== */}
            <section className="relative overflow-hidden border-y border-hairline bg-void-50/30 py-16">
                <div className="mx-auto max-w-7xl px-5 sm:px-8">
                    <div className="grid gap-10 md:grid-cols-3">
                        {GUARANTEES.map((g, i) => {
                            const Icon = g.icon;
                            return (
                                <Reveal key={g.title} delay={i * 100}>
                                    <div className="flex gap-4">
                                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-hairline">
                                            <Icon className="h-4 w-4 text-flux" />
                                        </span>
                                        <div>
                                            <h3 className="font-display text-base font-semibold tracking-tighter text-ink">{g.title}</h3>
                                            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-faint">{g.body}</p>
                                        </div>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===================== FAQ ===================== */}
            <Section width="narrow" className="py-20 lg:py-28">
                <Reveal>
                    <SectionHeading eyebrow="Questions" title="Everything else" align="center" />
                </Reveal>

                <div className="mt-12 divide-y divide-white/[0.06] border-y border-hairline">
                    {FAQS.map((faq, i) => {
                        const open = openFaq === i;
                        return (
                            <Reveal key={faq.q} delay={Math.min(i, 6) * 50}>
                                <div>
                                    <button
                                        onClick={() => setOpenFaq(open ? null : i)}
                                        aria-expanded={open}
                                        className="group flex w-full items-center justify-between gap-6 py-5 text-left"
                                    >
                                        <span className={`text-[15px] font-medium transition-colors duration-300 ${open ? 'text-flux' : 'text-ink group-hover:text-flux-soft'}`}>
                                            {faq.q}
                                        </span>
                                        <ChevronDown
                                            className={`h-4 w-4 shrink-0 transition-all duration-400 ease-out ${
                                                open ? 'rotate-180 text-flux' : 'text-ink-ghost group-hover:text-ink-faint'
                                            }`}
                                        />
                                    </button>

                                    {/* Grid-rows trick animates to auto height without measuring. */}
                                    <div
                                        className="grid transition-all duration-400 ease-out"
                                        style={{ gridTemplateRows: open ? '1fr' : '0fr', opacity: open ? 1 : 0 }}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="pb-5 pr-10 text-sm leading-relaxed text-ink-faint">{faq.a}</p>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        );
                    })}
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
                            <h2 className="font-display text-[2rem] font-semibold leading-[1.06] tracking-tightest text-ink sm:text-[2.75rem]">
                                Start today, decide later.
                            </h2>
                            <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-ink-dim">
                                The free tier needs no card. Upgrade the moment you want the labs.
                            </p>
                            <div className="mt-9 flex flex-wrap justify-center gap-3">
                                <Link href="/register" className="btn-flux group">
                                    Create free account
                                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                                </Link>
                                <Link href="/courses" className="btn-ghost">Browse courses</Link>
                            </div>
                        </div>
                    </SpotlightCard>
                </Reveal>
            </Section>

            <Footer />
        </PageShell>
    );
}

import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Mail, Phone, MessageCircle, Globe, Send, CheckCircle2, ArrowUpRight } from 'lucide-react';

import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import Reveal from '@/Components/ui/Reveal';
import SpotlightCard from '@/Components/ui/SpotlightCard';
import Field from '@/Components/ui/Field';
import { PageShell, Aurora, GridBackdrop, Section } from '@/Components/ui/Backdrop';

const CHANNELS = [
    {
        icon: Mail,
        label: 'Email',
        blurb: 'Best for detailed questions',
        value: 'mokomnelvis@yahoo.com',
        href: 'mailto:mokomnelvis@yahoo.com',
        accent: '34,211,238',
    },
    {
        icon: Phone,
        label: 'Phone',
        blurb: 'During business hours',
        value: '+1 (240) 906-0295',
        href: 'tel:+12409060295',
        accent: '163,230,53',
    },
    {
        icon: MessageCircle,
        label: 'WhatsApp',
        blurb: 'Fastest for quick questions',
        value: 'Start a chat',
        href: 'https://wa.me/12409060295',
        external: true,
        accent: '139,124,255',
    },
    {
        icon: Globe,
        label: 'Coverage',
        blurb: 'Fully remote platform',
        value: 'Available worldwide',
        accent: '148,163,184',
    },
];

export default function Contact({ auth }) {
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('contact.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const sent = recentlySuccessful || Boolean(flash?.success);

    return (
        <PageShell>
            <Head title="Contact" />
            <Navbar auth={auth} startSolid />

            {/* ===================== HERO ===================== */}
            <section className="relative overflow-hidden pb-14 pt-32 sm:pt-40">
                <Aurora />
                <GridBackdrop />

                <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
                    <Reveal>
                        <div className="flex items-center justify-center gap-2.5">
                            <span className="h-px w-6 bg-flux/50" />
                            <span className="eyebrow">Contact</span>
                        </div>
                    </Reveal>
                    <Reveal delay={80}>
                        <h1 className="mt-5 font-display text-[2.5rem] font-semibold leading-[1.04] tracking-tightest text-ink sm:text-[3.5rem]">
                            Talk to a <span className="text-gradient">real engineer.</span>
                        </h1>
                    </Reveal>
                    <Reveal delay={160}>
                        <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-ink-dim">
                            Questions about a track, team pricing, or whether a course fits your stack —
                            we answer these ourselves.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* ===================== BODY ===================== */}
            <Section className="pb-24">
                <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
                    {/* --- Channels --- */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                        {CHANNELS.map((c, i) => {
                            const Icon = c.icon;
                            const inner = (
                                <SpotlightCard
                                    spotlightColor={c.accent}
                                    className="panel panel-hover h-full rounded-2xl p-5"
                                >
                                    <div className="flex items-start gap-4">
                                        <span
                                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
                                            style={{
                                                borderColor: `rgba(${c.accent},0.25)`,
                                                background: `radial-gradient(circle at 30% 25%, rgba(${c.accent},0.20), rgba(${c.accent},0.03))`,
                                            }}
                                        >
                                            <Icon className="h-4 w-4" style={{ color: `rgb(${c.accent})` }} />
                                        </span>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-1.5">
                                                <h3 className="font-mono text-[10px] uppercase tracking-mono text-ink-ghost">
                                                    {c.label}
                                                </h3>
                                                {c.href && (
                                                    <ArrowUpRight className="h-3 w-3 text-ink-ghost transition-all duration-300 group-hover/spot:-translate-y-0.5 group-hover/spot:translate-x-0.5 group-hover/spot:text-flux" />
                                                )}
                                            </div>
                                            <p className="mt-1.5 break-words text-[14px] font-medium text-ink">{c.value}</p>
                                            <p className="mt-0.5 text-[12px] text-ink-faint">{c.blurb}</p>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            );

                            return (
                                <Reveal key={c.label} delay={i * 80}>
                                    {c.href ? (
                                        <a
                                            href={c.href}
                                            {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                            className="block h-full"
                                        >
                                            {inner}
                                        </a>
                                    ) : (
                                        inner
                                    )}
                                </Reveal>
                            );
                        })}
                    </div>

                    {/* --- Form --- */}
                    <Reveal delay={140}>
                        <SpotlightCard className="panel h-full rounded-2xl p-7 sm:p-9">
                            <h2 className="font-display text-2xl font-semibold tracking-tightest text-ink">
                                Send a message
                            </h2>
                            <p className="mt-2 text-[14px] text-ink-faint">
                                We usually reply within one business day.
                            </p>

                            {sent && (
                                <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-signal/25 bg-signal/10 px-4 py-3">
                                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                                    <p className="text-[13px] leading-relaxed text-signal">
                                        {flash?.success || 'Thanks — your message is on its way.'}
                                    </p>
                                </div>
                            )}

                            <form onSubmit={submit} className="mt-7 space-y-5">
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <Field
                                        id="name"
                                        name="name"
                                        label="Your name"
                                        placeholder="Jane Okoro"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        error={errors.name}
                                        autoComplete="name"
                                        required
                                    />
                                    <Field
                                        id="email"
                                        name="email"
                                        type="email"
                                        label="Your email"
                                        placeholder="jane@example.com"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        error={errors.email}
                                        autoComplete="email"
                                        required
                                    />
                                </div>

                                <Field
                                    id="subject"
                                    name="subject"
                                    label="Subject"
                                    placeholder="Which track suits a mid-level DBA?"
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    error={errors.subject}
                                    required
                                />

                                <div>
                                    <label htmlFor="message" className="mb-2 block text-[13px] font-medium text-ink-dim">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={6}
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        placeholder="Tell us a little about your background and what you're aiming for…"
                                        className={`field resize-none ${errors.message ? '!border-alert/50' : ''}`}
                                        required
                                    />
                                    {errors.message && <p className="mt-2 text-[13px] text-alert">{errors.message}</p>}
                                </div>

                                <button type="submit" disabled={processing} className="btn-flux group w-full sm:w-auto">
                                    <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                                    {processing ? 'Sending…' : 'Send message'}
                                </button>
                            </form>
                        </SpotlightCard>
                    </Reveal>
                </div>
            </Section>

            <Footer />
        </PageShell>
    );
}

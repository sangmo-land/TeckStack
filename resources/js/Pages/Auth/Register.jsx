import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, Lock, User, ArrowRight, UserCircle, Briefcase, Check, Info } from 'lucide-react';
import AuthLayout, { AuthAside } from '@/Layouts/AuthLayout';
import Field from '@/Components/ui/Field';

const ROLES = [
    { value: 'student', label: 'Student', blurb: 'Learn from courses', icon: UserCircle, accent: '34,211,238' },
    { value: 'instructor', label: 'Instructor', blurb: 'Create & teach', icon: Briefcase, accent: '139,124,255' },
];

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'student',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), { onFinish: () => reset('password', 'password_confirmation') });
    };

    return (
        <>
            <Head title="Create account" />
            <AuthLayout
                title="Create your account"
                subtitle="Free to start. No card required."
                aside={
                    <AuthAside
                        heading={<>Start with the systems, not the slides.</>}
                        lede="Every track opens on a live database. You will be running queries inside the first lesson."
                        points={[
                            'Hands-on labs against seeded, resettable instances',
                            'Structured tracks from fundamentals to production ownership',
                            'Certificates assessed on working systems',
                            'Lifetime access to everything you enrol in',
                        ]}
                    />
                }
                footer={
                    <>
                        Already have an account?{' '}
                        <Link href={route('login')} className="font-medium text-flux transition-colors hover:text-flux-soft">
                            Sign in
                        </Link>
                    </>
                }
            >
                <form onSubmit={submit} className="space-y-5">
                    <Field
                        id="name"
                        name="name"
                        label="Full name"
                        icon={User}
                        placeholder="Jane Okoro"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        error={errors.name}
                        autoComplete="name"
                        autoFocus
                        required
                    />

                    <Field
                        id="email"
                        name="email"
                        type="email"
                        label="Email address"
                        icon={Mail}
                        placeholder="you@example.com"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        error={errors.email}
                        autoComplete="username"
                        required
                    />

                    <div className="grid gap-5 sm:grid-cols-2">
                        <Field
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            icon={Lock}
                            placeholder="••••••••"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            error={errors.password}
                            autoComplete="new-password"
                            required
                        />
                        <Field
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            label="Confirm"
                            icon={Lock}
                            placeholder="••••••••"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            error={errors.password_confirmation}
                            autoComplete="new-password"
                            required
                        />
                    </div>

                    {/* --- Role selector ------------------------------- */}
                    <div>
                        <p className="mb-2.5 text-[13px] font-medium text-ink-dim">I'm joining as</p>
                        <div className="grid grid-cols-2 gap-3">
                            {ROLES.map((role) => {
                                const Icon = role.icon;
                                const selected = data.role === role.value;
                                return (
                                    <button
                                        key={role.value}
                                        type="button"
                                        onClick={() => setData('role', role.value)}
                                        aria-pressed={selected}
                                        className="relative rounded-xl border p-4 text-left transition-all duration-300 ease-out"
                                        style={{
                                            borderColor: selected ? `rgba(${role.accent},0.45)` : 'rgba(148,163,184,0.10)',
                                            background: selected
                                                ? `radial-gradient(120% 100% at 50% 0%, rgba(${role.accent},0.14), transparent 70%)`
                                                : 'rgba(255,255,255,0.02)',
                                        }}
                                    >
                                        <Icon
                                            className="mb-2.5 h-5 w-5 transition-colors duration-300"
                                            style={{ color: selected ? `rgb(${role.accent})` : '#6B7889' }}
                                        />
                                        <span className={`block text-sm font-medium ${selected ? 'text-ink' : 'text-ink-dim'}`}>
                                            {role.label}
                                        </span>
                                        <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-mono text-ink-ghost">
                                            {role.blurb}
                                        </span>

                                        {selected && (
                                            <span
                                                className="absolute right-3 top-3 flex h-4 w-4 items-center justify-center rounded-full"
                                                style={{ background: `rgb(${role.accent})` }}
                                            >
                                                <Check className="h-2.5 w-2.5 text-void" strokeWidth={3.5} />
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                        {errors.role && <p className="mt-2 text-[13px] text-alert">{errors.role}</p>}
                    </div>

                    {/* Accounts require approval before sign-in works — say so up front
                        rather than letting the user discover it at the login screen. */}
                    <div className="flex items-start gap-2.5 rounded-xl border border-hairline bg-white/[0.02] px-4 py-3">
                        <Info className="mt-0.5 h-4 w-4 shrink-0 text-flux/70" />
                        <p className="text-[13px] leading-relaxed text-ink-faint">
                            New accounts are reviewed by an admin before first sign-in. You&apos;ll be
                            notified once yours is active.
                        </p>
                    </div>

                    <button type="submit" disabled={processing} className="btn-flux group w-full">
                        {processing ? 'Creating account…' : 'Create account'}
                        {!processing && (
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                        )}
                    </button>

                    <p className="text-center text-[12px] leading-relaxed text-ink-ghost">
                        By creating an account you agree to our{' '}
                        <Link href={route('terms')} className="text-ink-faint underline underline-offset-2 transition-colors hover:text-flux">
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href={route('privacy')} className="text-ink-faint underline underline-offset-2 transition-colors hover:text-flux">
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </form>
            </AuthLayout>
        </>
    );
}

import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import AuthLayout, { AuthAside } from '@/Layouts/AuthLayout';
import Field from '@/Components/ui/Field';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), { onFinish: () => reset('password') });
    };

    return (
        <>
            <Head title="Sign in" />
            <AuthLayout
                title="Sign in"
                subtitle="Pick up where you left off."
                aside={
                    <AuthAside
                        heading={<>Welcome back.</>}
                        lede="Your labs, progress, and certificates are exactly where you left them."
                        points={[
                            'Resume any lesson from the last chapter you finished',
                            'Sandboxes keep their state between sessions',
                            'Download certificates for completed tracks',
                        ]}
                    />
                }
                footer={
                    <>
                        Don&apos;t have an account?{' '}
                        <Link href={route('register')} className="font-medium text-flux transition-colors hover:text-flux-soft">
                            Create one free
                        </Link>
                    </>
                }
            >
                {status && (
                    <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-signal/25 bg-signal/10 px-4 py-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                        <p className="text-[13px] text-signal">{status}</p>
                    </div>
                )}

                <form onSubmit={submit} className="space-y-5">
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
                        autoFocus
                        required
                    />

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
                        autoComplete="current-password"
                        required
                        hint={
                            canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-[13px] text-ink-ghost transition-colors hover:text-flux"
                                >
                                    Forgot?
                                </Link>
                            )
                        }
                    />

                    <label className="flex cursor-pointer items-center gap-2.5 pt-1">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="h-4 w-4 rounded border-hairline-strong bg-void-200 text-flux focus:ring-2 focus:ring-flux/40 focus:ring-offset-0"
                        />
                        <span className="text-[13px] text-ink-dim">Keep me signed in</span>
                    </label>

                    <button type="submit" disabled={processing} className="btn-flux group mt-2 w-full">
                        {processing ? 'Signing in…' : 'Sign in'}
                        {!processing && (
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                        )}
                    </button>
                </form>
            </AuthLayout>
        </>
    );
}

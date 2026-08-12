import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <h1 className="mb-3 font-display text-2xl font-semibold tracking-tightest text-ink">
                Verify your email
            </h1>

            <div className="mb-5 text-sm leading-relaxed text-ink-faint">
                Thanks for signing up! Before getting started, could you verify
                your email address by clicking on the link we just emailed to
                you? If you didn't receive the email, we will gladly send you
                another.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-5 rounded-xl border border-signal/25 bg-signal/10 px-4 py-3 text-[13px] font-medium text-signal">
                    A new verification link has been sent to the email address
                    you provided during registration.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-6 flex items-center justify-between gap-4 border-t border-hairline pt-6">
                    <PrimaryButton disabled={processing}>
                        Resend email
                    </PrimaryButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="text-[13px] text-ink-ghost transition-colors hover:text-ink-dim"
                    >
                        Log out
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}

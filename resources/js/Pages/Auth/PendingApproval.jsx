import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import { Clock, ArrowLeft } from 'lucide-react';

export default function PendingApproval() {
    return (
        <GuestLayout>
            <Head title="Account pending approval" />

            <div
                className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-warn/25"
                style={{ background: 'radial-gradient(circle at 30% 25%, rgba(251,191,36,0.20), transparent 70%)' }}
            >
                <Clock className="h-5 w-5 text-warn" />
            </div>

            <h1 className="font-display text-2xl font-semibold tracking-tightest text-ink">
                Account pending approval
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-ink-faint">
                Thanks for signing up. Your registration is waiting on review by an administrator —
                you&apos;ll get an email as soon as it&apos;s approved and you can sign in.
            </p>

            <div className="mt-7 flex items-center gap-3 border-t border-hairline pt-6">
                <Link href="/" className="btn-ghost group">
                    <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
                    Back to home
                </Link>
            </div>
        </GuestLayout>
    );
}

import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import Logo from '@/Components/ui/Logo';
import { Aurora, IndexBackdrop } from '@/Components/ui/Backdrop';

/**
 * Single-column shell for the short auth flows (password reset, email
 * verification, password confirmation).
 */
export default function GuestLayout({ children }) {
    return (
        <div className="texture-grain relative flex min-h-screen flex-col bg-void">
            <Aurora />
            <IndexBackdrop seed={166} />

            <div className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col px-5 py-8">
                <header className="flex items-center justify-between">
                    <Logo />
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-mono text-ink-ghost transition-colors hover:text-ink-dim"
                    >
                        <ArrowLeft className="h-3 w-3 transition-transform duration-300 group-hover:-translate-x-0.5" />
                        Back
                    </Link>
                </header>

                <main className="flex flex-1 items-center">
                    <div className="panel w-full rounded-2xl p-7 sm:p-8">{children}</div>
                </main>

                <footer>
                    <p className="font-mono text-[11px] text-ink-ghost">
                        © {new Date().getFullYear()} NelnadoSolutions
                    </p>
                </footer>
            </div>
        </div>
    );
}

import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import Navbar from '@/Components/Navbar';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import Logo from '@/Components/ui/Logo';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children, useMarketingNavbar = false }) {
    const { auth = {} } = usePage().props;
    const user = auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    // Shared page header treatment for both variants.
    const pageHeader = header && (
        <header className="border-b border-hairline bg-void-50/40">
            <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8">{header}</div>
        </header>
    );

    if (useMarketingNavbar) {
        return (
            <div className="texture-grain min-h-screen bg-void text-ink">
                <Navbar auth={auth} startSolid />
                <div className="pt-16">
                    {pageHeader}
                    <main>{children}</main>
                </div>
            </div>
        );
    }

    return (
        <div className="texture-grain min-h-screen bg-void text-ink">
            <nav className="glass sticky top-0 z-40 border-b">
                <div className="mx-auto max-w-7xl px-5 sm:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Logo />
                            </div>

                            <div className="hidden sm:-my-px sm:ms-10 sm:flex sm:space-x-8">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button
                                            type="button"
                                            className="group inline-flex items-center gap-2 rounded-lg border border-hairline bg-white/[0.02] px-3 py-2 text-sm font-medium text-ink-dim transition-all duration-300 hover:border-hairline-strong hover:text-ink"
                                        >
                                            {user?.name}
                                            <ChevronDown className="h-3.5 w-3.5 text-ink-ghost transition-colors group-hover:text-ink-dim" />
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content width="56">
                                        <div className="border-b border-hairline px-4 py-3">
                                            <p className="truncate text-sm font-medium text-ink">{user?.name}</p>
                                            <p className="truncate font-mono text-[11px] text-ink-ghost">{user?.email}</p>
                                        </div>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <div className="my-1 h-px bg-hairline" />
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="hover:!text-alert"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((s) => !s)}
                                className="rounded-lg p-2 text-ink-faint transition-colors hover:bg-white/[0.05] hover:text-ink"
                                aria-label="Menu"
                                aria-expanded={showingNavigationDropdown}
                            >
                                {showingNavigationDropdown ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' border-t border-hairline sm:hidden'}>
                    <div className="space-y-1 px-3 pb-3 pt-3">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-hairline px-3 pb-3 pt-4">
                        <div className="px-2">
                            <div className="text-sm font-medium text-ink">{user?.name}</div>
                            <div className="font-mono text-[11px] text-ink-ghost">{user?.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {pageHeader}

            <main>{children}</main>
        </div>
    );
}

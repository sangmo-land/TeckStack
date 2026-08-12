import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-300 focus:outline-none ${
                active
                    ? 'bg-flux/10 text-flux'
                    : 'text-ink-dim hover:bg-white/[0.05] hover:text-ink'
            } ${className}`}
        >
            {children}
        </Link>
    );
}

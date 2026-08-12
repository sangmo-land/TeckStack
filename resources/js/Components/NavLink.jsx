import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition-colors duration-300 focus:outline-none ' +
                (active
                    ? 'border-flux text-ink'
                    : 'border-transparent text-ink-faint hover:border-hairline-strong hover:text-ink') +
                ' ' +
                className
            }
        >
            {children}
        </Link>
    );
}

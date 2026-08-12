import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

/**
 * One labelled control with icon, error state, and optional password reveal.
 * Centralising this keeps every form on the site identical — the old pages
 * each re-declared their own input classes and drifted apart.
 */
export default function Field({
    id,
    label,
    type = 'text',
    icon: Icon,
    error,
    hint,
    value,
    onChange,
    className = '',
    ...rest
}) {
    const [reveal, setReveal] = useState(false);
    const isPassword = type === 'password';
    const resolvedType = isPassword && reveal ? 'text' : type;

    return (
        <div className={className}>
            <div className="mb-2 flex items-baseline justify-between gap-3">
                <label htmlFor={id} className="text-[13px] font-medium text-ink-dim">
                    {label}
                </label>
                {hint}
            </div>

            <div className="relative">
                {Icon && (
                    <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-ghost" />
                )}
                <input
                    id={id}
                    type={resolvedType}
                    value={value}
                    onChange={onChange}
                    aria-invalid={error ? 'true' : undefined}
                    aria-describedby={error ? `${id}-error` : undefined}
                    className={`field ${Icon ? 'pl-10' : ''} ${isPassword ? 'pr-11' : ''} ${
                        error ? '!border-alert/50' : ''
                    }`}
                    {...rest}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setReveal((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-ink-ghost transition-colors hover:text-ink-dim"
                        aria-label={reveal ? 'Hide password' : 'Show password'}
                    >
                        {reveal ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                )}
            </div>

            {error && (
                <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-[13px] text-alert">
                    <AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" />
                    {error}
                </p>
            )}
        </div>
    );
}

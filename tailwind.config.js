import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                display: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
            },

            colors: {
                // Canvas — near-black, cool-shifted. Not slate.
                void: {
                    DEFAULT: '#05070A',
                    50: '#0A0D13',
                    100: '#0D1118',
                    200: '#12171F',
                    300: '#181E28',
                    400: '#212936',
                },
                // Text ramp
                ink: {
                    DEFAULT: '#E8EEF6',
                    dim: '#9FADBF',
                    faint: '#6B7889',
                    ghost: '#48535F',
                },
                // Primary accent — electric cyan. Used sparingly.
                flux: {
                    DEFAULT: '#22D3EE',
                    soft: '#67E8F9',
                    deep: '#0891B2',
                    dark: '#0E7490',
                },
                // Secondary signal — violet. Rarer than flux.
                pulse: {
                    DEFAULT: '#8B7CFF',
                    soft: '#B0A5FF',
                    deep: '#6D5CE0',
                },
                // Status
                signal: '#A3E635',
                warn: '#FBBF24',
                alert: '#FB7185',
            },

            // Hairline borders read as light, not as fills.
            borderColor: {
                hairline: 'rgba(148,163,184,0.10)',
                'hairline-strong': 'rgba(148,163,184,0.20)',
            },

            letterSpacing: {
                tightest: '-0.045em',
                tighter: '-0.032em',
                mono: '0.18em',
            },

            fontSize: {
                // Display scale with optical tracking baked in
                'display-sm': ['2.75rem', { lineHeight: '1.05', letterSpacing: '-0.032em', fontWeight: '600' }],
                'display': ['3.75rem', { lineHeight: '1.02', letterSpacing: '-0.038em', fontWeight: '600' }],
                'display-lg': ['5rem', { lineHeight: '0.98', letterSpacing: '-0.042em', fontWeight: '600' }],
                'display-xl': ['6.5rem', { lineHeight: '0.94', letterSpacing: '-0.045em', fontWeight: '600' }],
                // Mono eyebrow
                eyebrow: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.18em', fontWeight: '500' }],
            },

            boxShadow: {
                // Depth from light, not from black blur
                glow: '0 0 0 1px rgba(34,211,238,0.16), 0 0 32px -4px rgba(34,211,238,0.28)',
                'glow-lg': '0 0 0 1px rgba(34,211,238,0.22), 0 0 64px -8px rgba(34,211,238,0.40)',
                'glow-pulse': '0 0 0 1px rgba(139,124,255,0.20), 0 0 40px -6px rgba(139,124,255,0.34)',
                panel: '0 1px 0 0 rgba(255,255,255,0.05) inset, 0 20px 48px -24px rgba(0,0,0,0.90)',
                lift: '0 1px 0 0 rgba(255,255,255,0.07) inset, 0 32px 64px -28px rgba(0,0,0,0.95)',
            },

            backgroundImage: {
                'grid-fade': 'linear-gradient(to bottom, rgba(5,7,10,0) 0%, #05070A 85%)',
            },

            keyframes: {
                'aurora-drift': {
                    '0%,100%': { transform: 'translate3d(0,0,0) scale(1)', opacity: '0.55' },
                    '33%': { transform: 'translate3d(6%,-4%,0) scale(1.12)', opacity: '0.8' },
                    '66%': { transform: 'translate3d(-5%,3%,0) scale(0.95)', opacity: '0.45' },
                },
                marquee: {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-50%)' },
                },
                shimmer: {
                    from: { backgroundPosition: '200% 0' },
                    to: { backgroundPosition: '-200% 0' },
                },
                'scan-y': {
                    '0%': { transform: 'translateY(-100%)', opacity: '0' },
                    '12%,88%': { opacity: '1' },
                    '100%': { transform: 'translateY(1200%)', opacity: '0' },
                },
                float: {
                    '0%,100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'pulse-ring': {
                    '0%': { transform: 'scale(0.85)', opacity: '0.7' },
                    '80%,100%': { transform: 'scale(1.6)', opacity: '0' },
                },
                'fade-up': {
                    from: { opacity: '0', transform: 'translateY(14px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                'caret-blink': {
                    '0%,45%': { opacity: '1' },
                    '55%,100%': { opacity: '0' },
                },
                'ticker-flip': {
                    '0%': { transform: 'translateY(40%)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },

            animation: {
                'aurora-drift': 'aurora-drift 18s ease-in-out infinite',
                marquee: 'marquee var(--marquee-duration,40s) linear infinite',
                shimmer: 'shimmer 3.5s linear infinite',
                'scan-y': 'scan-y 7s linear infinite',
                float: 'float 6s ease-in-out infinite',
                'pulse-ring': 'pulse-ring 2.6s cubic-bezier(0.24,0.8,0.36,1) infinite',
                'fade-up': 'fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both',
                'caret-blink': 'caret-blink 1.1s step-end infinite',
                'ticker-flip': 'ticker-flip 0.4s cubic-bezier(0.16,1,0.3,1) both',
            },

            transitionTimingFunction: {
                out: 'cubic-bezier(0.16, 1, 0.3, 1)',
                spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            },
        },
    },

    plugins: [forms],
};

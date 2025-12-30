import { Head, Link, useForm } from '@inertiajs/react';
import { GraduationCap, Mail, Lock, ArrowRight, Sparkles, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
            <Head title="Log in" />
            
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
            </div>

            <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left Side - Branding */}
                <div className="hidden lg:block">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-3xl opacity-20" />
                        <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-12">
                            <Link href="/" className="flex items-center space-x-3 mb-8">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur-lg opacity-75" />
                                    <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-lg">
                                        <GraduationCap className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    NelnadoSolutions
                                </span>
                            </Link>
                            
                            <h2 className="text-4xl font-bold text-white mb-4">
                                Welcome Back!
                            </h2>
                            <p className="text-xl text-slate-300 mb-8">
                                Continue your learning journey and master new tech skills today.
                            </p>
                            
                            <div className="space-y-4">
                                {[
                                    'Access 500+ premium courses',
                                    'Learn from industry experts',
                                    'Earn recognized certifications',
                                    'Join 50,000+ active learners'
                                ].map((benefit, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                            <Sparkles className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-slate-300">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-3xl opacity-20" />
                    <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-3xl p-8 md:p-12">
                        {/* Mobile Logo */}
                        <Link href="/" className="lg:hidden flex items-center space-x-3 mb-8 justify-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur-lg opacity-75" />
                                <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                                    <GraduationCap className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                TeckStack
                            </span>
                        </Link>

                        <div className="mb-8">
                            <h1 className="text-3xl font-bold text-white mb-2">Sign In</h1>
                            <p className="text-slate-400">Enter your credentials to access your account</p>
                        </div>

                        {status && (
                            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                                <p className="text-sm text-green-400">{status}</p>
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="w-5 h-5 text-slate-400" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        autoComplete="username"
                                        autoFocus
                                        className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="you@example.com"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-slate-400" />
                                    </div>
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        autoComplete="current-password"
                                        className="w-full pl-12 pr-12 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-300 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-400">{errors.password}</p>
                                )}
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="w-4 h-4 bg-slate-900 border-slate-700 rounded text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
                                    />
                                    <span className="ml-2 text-sm text-slate-300">Remember me</span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                                    >
                                        Forgot password?
                                    </Link>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                            >
                                <span>{processing ? 'Signing in...' : 'Sign In'}</span>
                                {!processing && <ArrowRight className="w-5 h-5" />}
                            </button>
                        </form>

                        {/* Sign Up Link */}
                        <div className="mt-8 text-center">
                            <p className="text-slate-400">
                                Don't have an account?{' '}
                                <Link
                                    href={route('register')}
                                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                                >
                                    Sign up for free
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

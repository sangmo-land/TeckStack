import { Head, Link, useForm } from '@inertiajs/react';
import { GraduationCap, Mail, Lock, User, ArrowRight, Sparkles, Award, BookOpen, Users, UserCircle, Briefcase, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'student',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
            <Head title="Register" />
            
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
                                Start Your Learning Journey
                            </h2>
                            <p className="text-xl text-slate-300 mb-8">
                                Join thousands of students mastering tech skills and advancing their careers.
                            </p>
                            
                            <div className="space-y-6">
                                {[
                                    { icon: BookOpen, text: 'Access 500+ premium courses', gradient: 'from-blue-500 to-cyan-600' },
                                    { icon: Users, text: 'Learn from industry experts', gradient: 'from-purple-500 to-pink-600' },
                                    { icon: Award, text: 'Earn recognized certifications', gradient: 'from-green-500 to-teal-600' },
                                    { icon: Sparkles, text: 'Lifetime access to materials', gradient: 'from-orange-500 to-red-600' }
                                ].map((benefit, index) => (
                                    <div key={index} className="flex items-center space-x-4">
                                        <div className={`flex-shrink-0 p-2 bg-gradient-to-r ${benefit.gradient} rounded-lg`}>
                                            <benefit.icon className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="text-slate-300">{benefit.text}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 p-6 bg-slate-900/50 border border-slate-700 rounded-xl">
                                <p className="text-slate-400 text-sm mb-4">Trusted by students at:</p>
                                <div className="flex flex-wrap gap-4">
                                    {['Google', 'Microsoft', 'Amazon', 'Meta'].map((company, index) => (
                                        <span key={index} className="text-slate-500 font-semibold">{company}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Register Form */}
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
                            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                            <p className="text-slate-400">Get started with your free account today</p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            {/* Name Field */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="w-5 h-5 text-slate-400" />
                                    </div>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        autoComplete="name"
                                        autoFocus
                                        required
                                        className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                {errors.name && (
                                    <p className="mt-2 text-sm text-red-400">{errors.name}</p>
                                )}
                            </div>

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
                                        required
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
                                        autoComplete="new-password"
                                        required
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

                            {/* Confirm Password Field */}
                            <div>
                                <label htmlFor="password_confirmation" className="block text-sm font-medium text-slate-300 mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-slate-400" />
                                    </div>
                                    <input
                                        id="password_confirmation"
                                        type={showPasswordConfirmation ? "text" : "password"}
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        autoComplete="new-password"
                                        required
                                        className="w-full pl-12 pr-12 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-300 transition-colors"
                                    >
                                        {showPasswordConfirmation ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                {errors.password_confirmation && (
                                    <p className="mt-2 text-sm text-red-400">{errors.password_confirmation}</p>
                                )}
                            </div>

                            {/* Role Selection */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-3">
                                    I want to register as:
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setData('role', 'student')}
                                        className={`relative p-4 rounded-lg border-2 transition-all ${
                                            data.role === 'student'
                                                ? 'border-blue-500 bg-blue-500/10'
                                                : 'border-slate-700 bg-slate-900 hover:border-slate-600'
                                        }`}
                                    >
                                        <div className="flex flex-col items-center space-y-2">
                                            <div className={`p-2 rounded-lg ${
                                                data.role === 'student'
                                                    ? 'bg-blue-500'
                                                    : 'bg-slate-700'
                                            }`}>
                                                <UserCircle className="w-6 h-6 text-white" />
                                            </div>
                                            <span className={`font-medium ${
                                                data.role === 'student' ? 'text-blue-400' : 'text-slate-400'
                                            }`}>
                                                Student
                                            </span>
                                            <span className="text-xs text-slate-500 text-center">Learn from courses</span>
                                        </div>
                                        {data.role === 'student' && (
                                            <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setData('role', 'instructor')}
                                        className={`relative p-4 rounded-lg border-2 transition-all ${
                                            data.role === 'instructor'
                                                ? 'border-purple-500 bg-purple-500/10'
                                                : 'border-slate-700 bg-slate-900 hover:border-slate-600'
                                        }`}
                                    >
                                        <div className="flex flex-col items-center space-y-2">
                                            <div className={`p-2 rounded-lg ${
                                                data.role === 'instructor'
                                                    ? 'bg-purple-500'
                                                    : 'bg-slate-700'
                                            }`}>
                                                <Briefcase className="w-6 h-6 text-white" />
                                            </div>
                                            <span className={`font-medium ${
                                                data.role === 'instructor' ? 'text-purple-400' : 'text-slate-400'
                                            }`}>
                                                Instructor
                                            </span>
                                            <span className="text-xs text-slate-500 text-center">Create & teach</span>
                                        </div>
                                        {data.role === 'instructor' && (
                                            <div className="absolute top-2 right-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </button>
                                </div>
                                {errors.role && (
                                    <p className="mt-2 text-sm text-red-400">{errors.role}</p>
                                )}
                            </div>

                            {/* Terms */}
                            <div className="text-sm text-slate-400">
                                By creating an account, you agree to our{' '}
                                <Link href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</Link>
                                {' '}and{' '}
                                <Link href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</Link>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                            >
                                <span>{processing ? 'Creating account...' : 'Create Account'}</span>
                                {!processing && <ArrowRight className="w-5 h-5" />}
                            </button>
                        </form>

                        {/* Sign In Link */}
                        <div className="mt-8 text-center">
                            <p className="text-slate-400">
                                Already have an account?{' '}
                                <Link
                                    href={route('login')}
                                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

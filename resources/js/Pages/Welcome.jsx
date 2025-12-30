import { Link, Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { GraduationCap, Award, Users, Rocket, ShieldCheck, BookOpen, Star, Sparkles, Clock, TrendingUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export default function Welcome({ auth, testimonials = [], learnerCount = 0 }) {
    const [trending, setTrending] = useState([]);

    useEffect(() => {
        fetch('/api/trending-courses')
            .then(r => r.json())
            .then(d => setTrending(Array.isArray(d) ? d.slice(0, 6) : (d?.courses || []).slice(0, 6)))
            .catch(() => setTrending([]));
    }, []);

    // Fallback testimonials if no reviews in database
    const defaultTestimonials = [
        {text:'The Oracle DBA course transformed my career.',author:'M. Johnson', rating: 5},
        {text:'Hands-on projects made cloud concepts easy.',author:'A. Gupta', rating: 5},
        {text:'Clear teaching and real-world content.',author:'S. Fernandez', rating: 5},
    ];

    const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

    // Format learner count nicely
    const formatCount = (count) => {
        if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M+`;
        if (count >= 1000) return `${(count / 1000).toFixed(1)}k+`;
        return `${count}+`;
    };

    const learnerDisplay = learnerCount > 0 ? formatCount(learnerCount) : '50k+';

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Head>
                <title>NelnadoSolutions Academy — Learn Tech Skills</title>
                <meta
                    name="description"
                    content="Master AWS, Oracle, Database Management, and more from industry experts. Get certified and advance your career with NelnadoSolutions Academy."
                />
                <link rel="canonical" href="/" />
                <meta
                    property="og:title"
                    content="NelnadoSolutions Academy — Learn Tech Skills"
                />
                <meta
                    property="og:description"
                    content="Master AWS, Oracle, Database Management, and more from industry experts."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="/" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta
                    name="twitter:title"
                    content="NelnadoSolutions Academy — Learn Tech Skills"
                />
                <meta
                    name="twitter:description"
                    content="Master AWS, Oracle, Database Management, and more from industry experts."
                />
            </Head>
            <Navbar auth={auth} />
            {/* Hero */}
            <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-28 pb-20">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />
                    <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
                </div>

                <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div>
                        <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
                            <Sparkles className="w-4 h-4 text-blue-400" />
                            <span className="text-blue-400 text-sm font-medium">
                                Trusted by {learnerDisplay} learners worldwide
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                            Learn the skills to build your future
                            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                with NelnadoSolutions Academy
                            </span>
                        </h1>
                        <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
                            Master AWS, Oracle, databases, cloud, and software
                            engineering with expert-led courses and hands-on
                            projects.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/courses"
                                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                            >
                                Browse Courses
                            </Link>
                            {auth.user ? (
                                <Link
                                    href="/dashboard"
                                    className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:border-white transition-colors"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href="/register"
                                    className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:border-white transition-colors"
                                >
                                    Get Started Free
                                </Link>
                            )}
                        </div>
                        <div className="mt-8 flex items-center gap-6 text-slate-400">
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5" /> {learnerDisplay}{" "}
                                learners
                            </div>
                            <div className="flex items-center gap-2">
                                <Award className="w-5 h-5" /> Certifications
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5" /> Verified
                                content
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-3xl opacity-20" />
                        <div className="relative bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-3xl p-8">
                            <div className="grid grid-cols-2 gap-6">
                                {[
                                    {
                                        icon: GraduationCap,
                                        label: "Expert Instructors",
                                    },
                                    { icon: BookOpen, label: "500+ Courses" },
                                    { icon: Rocket, label: "Career Growth" },
                                    {
                                        icon: TrendingUp,
                                        label: "Hands-on Projects",
                                    },
                                ].map((b, i) => (
                                    <div
                                        key={i}
                                        className="p-6 bg-slate-900/60 border border-slate-700 rounded-2xl hover:border-blue-500/40 transition-all"
                                    >
                                        <b.icon className="w-7 h-7 text-white mb-3" />
                                        <p className="text-slate-300 font-medium">
                                            {b.label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trending Courses */}
            <section className="px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-white">
                            Trending Courses
                        </h2>
                        <Link
                            href="/courses"
                            className="text-blue-400 hover:text-blue-300"
                        >
                            View all
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trending.length ? (
                            trending.map((course) => (
                                <div
                                    key={course.id || course.slug}
                                    className="group bg-slate-800/60 border border-slate-700 rounded-xl overflow-hidden hover:border-blue-500 transition-all duration-300"
                                >
                                    <div className="relative h-40 bg-gradient-to-br from-blue-500 to-purple-600">
                                        {course.thumbnail_url && (
                                            <img
                                                src={
                                                    course.thumbnail_url?.startsWith(
                                                        "http"
                                                    ) ||
                                                    course.thumbnail_url?.startsWith(
                                                        "/storage/"
                                                    )
                                                        ? course.thumbnail_url
                                                        : `/storage/${course.thumbnail_url}`
                                                }
                                                alt={course.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                            />
                                        )}
                                        <div className="absolute top-3 right-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                            {course.level || "All"}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                                            {course.title}
                                        </h3>
                                        <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                                            {course.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={16}
                                                        className={
                                                            i <
                                                            Math.floor(
                                                                course.rating ||
                                                                    0
                                                            )
                                                                ? "fill-yellow-400 text-yellow-400"
                                                                : "text-slate-600"
                                                        }
                                                    />
                                                ))}
                                                <span className="text-xs text-slate-400 ml-1">
                                                    (
                                                    {Number(
                                                        course.rating || 0
                                                    ).toFixed(1)}
                                                    )
                                                </span>
                                            </div>
                                            <span className="text-lg font-bold text-white">
                                                $
                                                {Number(
                                                    course.price || 0
                                                ).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-slate-400">
                                No trending courses available right now.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="px-4 sm:px-6 lg:px-8 py-16 bg-slate-800/40 border-y border-slate-700">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">
                        What learners say
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {displayTestimonials.map((t, i) => (
                            <div
                                key={i}
                                className="p-6 bg-slate-900/60 border border-slate-700 rounded-xl hover:border-slate-600 transition-colors"
                            >
                                <div className="flex items-center gap-1 mb-3">
                                    {[...Array(5)].map((_, starIdx) => (
                                        <Star
                                            key={starIdx}
                                            size={16}
                                            className={
                                                starIdx < t.rating
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-slate-600"
                                            }
                                        />
                                    ))}
                                </div>
                                <p className="text-slate-300 mb-4">
                                    "{t.text}"
                                </p>
                                <div>
                                    <p className="text-slate-400 text-sm font-medium">
                                        — {t.author}
                                    </p>
                                    {t.course && (
                                        <p className="text-slate-500 text-xs mt-1">
                                            {t.course}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <H1>Hope this works</H1>
            </section>

            {/* CTA */}
            <section className="px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-7xl mx-auto">
                    <div className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 md:p-16">
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                        <div className="relative text-center max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Ready to transform your career?
                            </h2>
                            <p className="text-xl text-white/90 mb-8">
                                Join thousands of learners mastering tech skills
                                with NelnadoSolutions.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/courses"
                                    className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-100 transition-colors"
                                >
                                    Browse Courses
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                                >
                                    Sign Up Free
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

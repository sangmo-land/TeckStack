import React from 'react';
import { Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { Head } from '@inertiajs/react';
import Footer from '@/Components/Footer';
import { 
    GraduationCap, 
    Target, 
    Users, 
    Award, 
    TrendingUp, 
    Globe, 
    CheckCircle2,
    Sparkles,
    BookOpen,
    Code,
    Briefcase,
    Heart
} from 'lucide-react';

export default function About({ auth, team: teamFromProps = [], studentCount = 0, courseCount = 0 }) {
    // Format student count nicely
    const formatCount = (count) => {
        if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M+`;
        if (count >= 1000) return `${Math.floor(count / 1000)}k+`;
        return `${count}+`;
    };

    const studentDisplay = studentCount > 0 ? formatCount(studentCount) : '50,000+';
    const courseDisplay = courseCount > 0 ? formatCount(courseCount) : '500+';

    const stats = [
        { icon: Users, value: studentDisplay, label: 'Active Students', color: 'from-blue-500 to-blue-600' },
        { icon: BookOpen, value: courseDisplay, label: 'Courses Available', color: 'from-purple-500 to-purple-600' },
        { icon: Award, value: '98%', label: 'Success Rate', color: 'from-green-500 to-green-600' },
        { icon: Globe, value: '150+', label: 'Countries Reached', color: 'from-orange-500 to-orange-600' }
    ];

    const values = [
        {
            icon: Target,
            title: 'Mission-Driven',
            description: 'We believe in making quality tech education accessible to everyone, everywhere.',
            gradient: 'from-blue-500 to-cyan-500'
        },
        {
            icon: Sparkles,
            title: 'Excellence',
            description: 'Every course is crafted by industry experts with real-world experience.',
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            icon: Heart,
            title: 'Student-Centric',
            description: 'Your success is our success. We provide personalized learning paths and support.',
            gradient: 'from-red-500 to-orange-500'
        },
        {
            icon: TrendingUp,
            title: 'Innovation',
            description: 'We stay ahead of tech trends to bring you cutting-edge skills and knowledge.',
            gradient: 'from-green-500 to-teal-500'
        }
    ];

    const gradients = [
        'from-blue-500 to-purple-600',
        'from-purple-500 to-pink-600',
        'from-green-500 to-teal-600',
        'from-orange-500 to-red-600',
    ];

    const team = (teamFromProps.length ? teamFromProps : [
        {
            name: 'Mokom Nelvis Fon',
            role: 'Founder',
            expertise: 'Oracle Database Administrator',
            avatar_url: null,
        },
    ]).map((member, index) => ({
        ...member,
        gradient: member.gradient ?? gradients[index % gradients.length],
    }));

    const milestones = [
        { year: '2025', event: 'NelnadoSolutions Founded', description: 'Started with a vision to democratize tech education and empower professionals worldwide' },
        { year: '2025', event: `${studentDisplay} Active Learners`, description: 'Rapidly growing community of tech professionals transforming their careers' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Head>
                <title>About NelnadoSolutions — Mission, Values, Founder</title>
                <meta
                    name="description"
                    content="NelnadoSolutions empowers tech professionals through world-class learning experiences. Meet our founder and learn our mission and values."
                />
                <link rel="canonical" href="/about" />
                <meta
                    property="og:title"
                    content="About NelnadoSolutions — Mission, Values, Founder"
                />
                <meta
                    property="og:description"
                    content="Empowering tech professionals through expert instruction and hands-on learning."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="/about" />
                <meta name="twitter:card" content="summary" />
                <meta
                    name="twitter:title"
                    content="About NelnadoSolutions — Mission, Values, Founder"
                />
                <meta
                    name="twitter:description"
                    content="Empowering tech professionals through expert instruction and hands-on learning."
                />
            </Head>
            <Navbar auth={auth} />

            {/* Hero Section */}
            <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />
                    <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
                </div>

                <div className="relative max-w-7xl mx-auto">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
                            <Sparkles className="w-4 h-4 text-blue-400" />
                            <span className="text-blue-400 text-sm font-medium">
                                Empowering Tech Professionals Since 2025
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            We're Building the
                            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Future of Learning
                            </span>
                        </h1>

                        <p className="text-xl text-slate-300 mb-12 leading-relaxed">
                            NelnadoSolutions is more than a learning
                            platform—it's a community of passionate
                            technologists, industry experts, and lifelong
                            learners committed to excellence and innovation.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/courses"
                                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                            >
                                Explore Our Courses
                            </Link>
                            <Link
                                href="/instructors"
                                className="px-8 py-4 border-2 border-slate-400 text-slate-300 font-semibold rounded-lg hover:border-white hover:text-white transition-colors"
                            >
                                Meet Our Instructors
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="hidden md:block px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div key={index} className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl from-blue-500/50 to-purple-500/50" />
                                <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-slate-600 transition-all duration-300">
                                    <div
                                        className={`inline-flex p-3 bg-gradient-to-r ${stat.color} rounded-lg mb-4`}
                                    >
                                        <stat.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="text-4xl font-bold text-white mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-slate-400 font-medium">
                                        {stat.label}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="px-4 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />

                <div className="relative max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-6">
                                Our Mission
                            </h2>
                            <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                                At NelnadoSolutions, we're on a mission to
                                democratize technology education and empower
                                individuals to achieve their career goals
                                through world-class learning experiences.
                            </p>
                            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                                We believe that everyone deserves access to
                                quality tech education, regardless of their
                                background or location. That's why we've built a
                                platform that combines expert instruction,
                                hands-on projects, and career support.
                            </p>

                            <div className="space-y-4">
                                {[
                                    "Industry-relevant curriculum updated regularly",
                                    "Personalized learning paths for every skill level",
                                    "Real-world projects and case studies",
                                    "Lifetime access to course materials",
                                    "Community support and networking",
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center space-x-3"
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                                        <span className="text-slate-300">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-3xl opacity-20" />
                            <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
                                <div className="grid grid-cols-2 gap-6">
                                    {[
                                        {
                                            icon: Code,
                                            label: "Hands-on Learning",
                                        },
                                        {
                                            icon: Briefcase,
                                            label: "Career Support",
                                        },
                                        {
                                            icon: Award,
                                            label: "Certifications",
                                        },
                                        {
                                            icon: Users,
                                            label: "Expert Mentors",
                                        },
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className="text-center"
                                        >
                                            <div className="inline-flex p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-3">
                                                <item.icon className="w-8 h-8 text-blue-400" />
                                            </div>
                                            <p className="text-white font-medium">
                                                {item.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Our Core Values
                        </h2>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            The principles that guide everything we do
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <div key={index} className="group relative">
                                <div
                                    className={`absolute inset-0 bg-gradient-to-r ${value.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur-xl`}
                                />
                                <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-slate-600 transition-all duration-300 h-full">
                                    <div
                                        className={`inline-flex p-3 bg-gradient-to-r ${value.gradient} rounded-lg mb-4`}
                                    >
                                        <value.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">
                                        {value.title}
                                    </h3>
                                    <p className="text-slate-400 leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="px-4 sm:px-6 lg:px-8 py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5" />

                <div className="relative max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Meet Our Team
                        </h2>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            Learn from industry veterans with years of
                            real-world experience
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {team.map((member, index) => (
                            <div
                                key={index}
                                className="group text-center bg-slate-800/70 border border-slate-700 rounded-2xl p-8 shadow-xl hover:border-blue-500/60 hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-300"
                            >
                                <div className="relative mb-6 inline-block">
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-r ${member.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}
                                    />
                                    <div
                                        className={`relative w-40 h-40 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex items-center justify-center mx-auto shadow-2xl ring-2 ring-white/5 group-hover:ring-blue-500/40 transition-all`}
                                    >
                                        {member.avatar_url ? (
                                            <img
                                                src={
                                                    member.avatar_url.startsWith(
                                                        "http"
                                                    )
                                                        ? member.avatar_url
                                                        : `/storage/${member.avatar_url}`
                                                }
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-3xl font-bold text-white">
                                                {(member.name || "?")
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")
                                                    .slice(0, 2)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    {member.name}
                                </h3>
                                <p className="text-blue-400 font-semibold mb-2 uppercase tracking-wide">
                                    {member.role}
                                </p>
                                <p className="text-slate-300 text-sm">
                                    {member.expertise}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Our Journey
                        </h2>
                        <p className="text-xl text-slate-400">
                            From a small startup to a global learning platform
                        </p>
                    </div>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />

                        <div className="space-y-12">
                            {milestones.map((milestone, index) => (
                                <div key={index} className="relative pl-20">
                                    {/* Timeline dot */}
                                    <div className="absolute left-6 top-2 w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-slate-900" />

                                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors">
                                        <div className="flex items-center space-x-4 mb-2">
                                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                                {milestone.year}
                                            </span>
                                            <h3 className="text-xl font-bold text-white">
                                                {milestone.event}
                                            </h3>
                                        </div>
                                        <p className="text-slate-400">
                                            {milestone.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-7xl mx-auto">
                    <div className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 md:p-16">
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

                        <div className="relative text-center max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Ready to Start Your Learning Journey?
                            </h2>
                            <p className="text-xl text-white/90 mb-8">
                                Join thousands of students who are already
                                transforming their careers with NelnadoSolutions
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

import React, { useMemo, useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import { 
    Search,
    Award,
    Users,
    BookOpen,
    Star,
    GraduationCap,
    TrendingUp,
    Globe,
    CheckCircle2,
    Briefcase,
    Code,
    Database,
    Cloud,
    Shield,
    Cpu,
    BarChart
} from 'lucide-react';

const gradientFallbacks = [
    'from-blue-500 to-cyan-600',
    'from-purple-500 to-pink-600',
    'from-green-500 to-teal-600',
    'from-orange-500 to-red-600',
    'from-indigo-500 to-purple-600',
    'from-yellow-500 to-orange-600',
];

const statIcons = [Users, Award, TrendingUp, GraduationCap];

const initialsFromName = (name = '') => {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join('') || 'IN';
};

export default function Instructors({ auth, instructors: serverInstructors = [], stats: serverStats = [] }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedExpertise, setSelectedExpertise] = useState('all');

    const resolveImageUrl = (raw = '') => {
        if (!raw) return '';
        if (raw.startsWith('http')) return raw;
        if (raw.startsWith('/storage/')) return raw;
        if (raw.startsWith('storage/')) return `/${raw}`;
        if (raw.includes('instructor-images/')) {
            const cleaned = raw.replace(/^\/?storage\//, '');
            return `/storage/${cleaned}`;
        }
        const filename = raw.replace(/^\/+/, '');
        return `/storage/instructor-images/${filename}`;
    };

    const instructors = useMemo(() => {
        return serverInstructors.map((instructor, index) => {
            const normalizeArray = (value) => {
                if (Array.isArray(value)) return value;
                if (typeof value === 'string') return value.split(',').map((v) => v.trim()).filter(Boolean);
                return [];
            };

            const expertise = normalizeArray(instructor.expertise);
            const companies = normalizeArray(instructor.companies);
            const certifications = normalizeArray(instructor.certifications);
            const imageUrl = resolveImageUrl(instructor.image || '');
            return {
                id: instructor.id,
                userId: instructor.userId || instructor.user_id,
                name: instructor.name || 'Instructor',
                role: instructor.role_title || instructor.role || 'Instructor',
                expertise,
                rating: Number(instructor.rating ?? 0),
                students: Number(instructor.students ?? instructor.total_students ?? 0),
                courses: Number(instructor.courses ?? instructor.total_courses ?? 0),
                bio: instructor.bio || '',
                imageUrl,
                gradient: instructor.gradient || gradientFallbacks[index % gradientFallbacks.length],
                certifications,
                yearsExperience: Number(instructor.years_experience ?? instructor.yearsExperience ?? 0),
                companies,
            };
        });
    }, [serverInstructors]);

    const expertiseAreas = useMemo(() => {
        const dynamic = instructors
            .flatMap((inst) => Array.isArray(inst.expertise) ? inst.expertise : [])
            .map((exp) => exp.trim())
            .filter(Boolean)
            .map((exp) => exp.toLowerCase());
        const unique = Array.from(new Set(dynamic));
        return ['all', ...unique];
    }, [instructors]);

    const stats = useMemo(() => {
        const data = serverStats.length
            ? serverStats
            : [
                  { value: `${instructors.length}+`, label: 'Expert Instructors', color: 'from-blue-500 to-blue-600' },
                  { value: '4.8', label: 'Average Rating', color: 'from-green-500 to-green-600' },
                  { value: '100K+', label: 'Students Taught', color: 'from-orange-500 to-orange-600' },
                  { value: '200+', label: 'Courses', color: 'from-purple-500 to-pink-600' },
              ];

        return data.map((stat, idx) => ({ ...stat, icon: statIcons[idx % statIcons.length] }));
    }, [serverStats, instructors.length]);

    const filteredInstructors = instructors.filter((instructor) => {
        const search = searchQuery.toLowerCase();
        const matchesSearch = instructor.name.toLowerCase().includes(search) ||
            instructor.expertise.some((exp) => exp.toLowerCase().includes(search));
        const matchesExpertise = selectedExpertise === 'all' ||
            instructor.expertise.some((exp) => exp.toLowerCase().includes(selectedExpertise));
        return matchesSearch && matchesExpertise;
    });

    const getExpertiseIcon = (expertise = '') => {
        const exp = expertise.toLowerCase();
        if (exp.includes('cloud')) return Cloud;
        if (exp.includes('database')) return Database;
        if (exp.includes('web') || exp.includes('development')) return Code;
        if (exp.includes('security')) return Shield;
        if (exp.includes('data')) return BarChart;
        if (exp.includes('devops')) return Cpu;
        return Code;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Head>
                <title>Meet Our Instructors — NelnadoSolutions</title>
                <meta name="description" content="Learn from world-class instructors with real-world experience, certifications, and industry backgrounds." />
                <link rel="canonical" href="/instructors" />
                <meta property="og:title" content="Meet Our Instructors — NelnadoSolutions" />
                <meta property="og:description" content="Learn from world-class instructors with real-world experience, certifications, and industry backgrounds." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="/instructors" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content="Meet Our Instructors — NelnadoSolutions" />
                <meta name="twitter:description" content="Learn from world-class instructors with real-world experience and certifications." />
            </Head>
            <Navbar auth={auth} />

            {/* Hero Section */}
            <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl" />
                    <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                </div>

                <div className="relative max-w-7xl mx-auto">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
                            <Award className="w-4 h-4 text-blue-400" />
                            <span className="text-blue-400 text-sm font-medium">Learn from Industry Leaders</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            Meet Our
                            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                World-Class Instructors
                            </span>
                        </h1>
                        
                        <p className="text-xl text-slate-300 mb-12 leading-relaxed">
                            Learn from industry veterans who have worked at top tech companies and hold 
                            prestigious certifications. Our instructors bring real-world experience to every course.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="px-4 sm:px-6 lg:px-8 pb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => {
                            const StatIcon = stat.icon || Users;
                            return (
                                <div key={index} className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl from-blue-500/50 to-purple-500/50" />
                                    <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-slate-600 transition-all duration-300">
                                        <div className={`inline-flex p-3 bg-gradient-to-r ${stat.color} rounded-lg mb-4`}>
                                            <StatIcon className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                                        <div className="text-slate-400 font-medium">{stat.label}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className="px-4 sm:px-6 lg:px-8 pb-12">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search instructors by name or expertise..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Expertise Filter */}
                            <select
                                value={selectedExpertise}
                                onChange={(e) => setSelectedExpertise(e.target.value)}
                                className="px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {expertiseAreas.map((area) => (
                                    <option key={area} value={area}>
                                        {area === 'all' ? 'All' : area.replace(/\b\w/g, (l) => l.toUpperCase())}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            {/* Instructors Grid */}
            <section className="px-4 sm:px-6 lg:px-8 pb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredInstructors.map((instructor) => {
                            const ExpertiseIcon = getExpertiseIcon(instructor.expertise[0]);
                            return (
                                <div
                                    key={instructor.id}
                                    className="group relative"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-r ${instructor.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur-xl`} />
                                    
                                    <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-slate-600 transition-all duration-300">
                                        {/* Header */}
                                        <div className="flex items-center space-x-4 mb-4">
                                            <div className="relative flex-shrink-0">
                                                <div className={`w-20 h-20 rounded-xl flex items-center justify-center overflow-hidden border border-slate-700 bg-slate-700/40`}>
                                                    {instructor.imageUrl && (
                                                        <img
                                                            src={instructor.imageUrl}
                                                            alt={instructor.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                            
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-xl font-bold text-white mb-1 truncate">{instructor.name}</h3>
                                                <p className="text-blue-400 text-sm font-medium mb-2">{instructor.role}</p>
                                                <div className="flex items-center space-x-1">
                                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                    <span className="text-white font-semibold">{instructor.rating}</span>
                                                    <span className="text-slate-400 text-sm">({instructor.students.toLocaleString()} students)</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bio */}
                                        <p className="text-slate-400 text-sm mb-4 leading-relaxed line-clamp-3">
                                            {instructor.bio}
                                        </p>

                                        {/* Expertise Tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {instructor.expertise.slice(0, 3).map((exp, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1 bg-slate-900/50 border border-slate-700 rounded-full text-xs text-slate-300"
                                                >
                                                    {exp}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Stats */}
                                        <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-y border-slate-700">
                                            <div className="text-center">
                                                <div className="text-xl font-bold text-white">{instructor.courses}</div>
                                                <div className="text-xs text-slate-400">Courses</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-xl font-bold text-white">{instructor.yearsExperience}+</div>
                                                <div className="text-xs text-slate-400">Years Exp</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-xl font-bold text-white">{(instructor.students / 1000).toFixed(1)}K</div>
                                                <div className="text-xs text-slate-400">Students</div>
                                            </div>
                                        </div>

                                        {/* Companies */}
                                        <div className="mb-4">
                                            <p className="text-xs text-slate-400 mb-2">Previously at:</p>
                                            {instructor.companies.length > 0 ? (
                                                <div className="flex flex-wrap gap-2">
                                                    {instructor.companies.map((company, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="px-2 py-1 bg-slate-900/60 border border-slate-700 rounded-full text-xs text-slate-200"
                                                        >
                                                            {company}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-xs text-slate-500">Not provided</p>
                                            )}
                                        </div>

                                        {/* CTA Button */}
                                        <Link
                                            href={`/courses/instructors=${encodeURIComponent(instructor.userId || '')}`}
                                            className={`w-full inline-block text-center px-4 py-3 bg-gradient-to-r ${instructor.gradient} text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-300`}
                                        >
                                            View Courses
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {filteredInstructors.length === 0 && (
                        <div className="text-center py-20">
                            <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-2">No instructors found</h3>
                            <p className="text-slate-400">Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Why Learn From Us */}
            <section className="px-4 sm:px-6 lg:px-8 py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
                
                <div className="relative max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Why Learn From Our Instructors?</h2>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            Our instructors bring decades of combined experience from the world's leading tech companies
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Briefcase,
                                title: 'Industry Experience',
                                description: 'All instructors have 7+ years of real-world experience at top tech companies',
                                gradient: 'from-blue-500 to-cyan-600'
                            },
                            {
                                icon: Award,
                                title: 'Certified Experts',
                                description: 'Hold prestigious certifications and recognized credentials in their fields',
                                gradient: 'from-purple-500 to-pink-600'
                            },
                            {
                                icon: BookOpen,
                                title: 'Proven Teachers',
                                description: 'Average 4.8+ rating across thousands of student reviews',
                                gradient: 'from-green-500 to-teal-600'
                            },
                            {
                                icon: Code,
                                title: 'Hands-On Approach',
                                description: 'Focus on practical projects and real-world applications',
                                gradient: 'from-orange-500 to-red-600'
                            },
                            {
                                icon: Users,
                                title: 'Mentorship',
                                description: 'Dedicated support and career guidance throughout your journey',
                                gradient: 'from-indigo-500 to-purple-600'
                            },
                            {
                                icon: TrendingUp,
                                title: 'Current Content',
                                description: 'Courses updated regularly to reflect latest industry trends',
                                gradient: 'from-pink-500 to-rose-600'
                            }
                        ].map((feature, index) => (
                            <div key={index} className="relative group">
                                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl blur-xl`} />
                                <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-slate-600 transition-all duration-300">
                                    <div className={`inline-flex p-3 bg-gradient-to-r ${feature.gradient} rounded-lg mb-4`}>
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                    <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
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
                                Ready to Learn From the Best?
                            </h2>
                            <p className="text-xl text-white/90 mb-8">
                                Join thousands of students already learning from industry experts
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/courses"
                                    className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-100 transition-colors"
                                >
                                    Browse All Courses
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                                >
                                    Get Started Free
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

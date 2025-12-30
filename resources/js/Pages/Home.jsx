import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Star, Users, Clock, TrendingUp } from 'lucide-react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Home({ auth }) {
    const [trendingCourses, setTrendingCourses] = useState([]);
    const [recommendedCourses, setRecommendedCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch('/api/trending-courses').then(r => r.json()),
            fetch('/api/recommended-courses').then(r => r.json()),
        ]).then(([trending, recommended]) => {
            setTrendingCourses(trending.courses);
            setRecommendedCourses(recommended.courses);
            setLoading(false);
        });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Navbar auth={auth} />
            {/* Hero Section */}
            <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-32 pb-32">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl" />
                
                <div className="relative max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                Master <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Tech Skills</span> Today
                            </h1>
                            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                                Learn AWS, Oracle, Database Management, and more from industry experts. Get certified and advance your tech career.
                            </p>
                            <div className="flex gap-4">
                                <Link 
                                    href="/courses"
                                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                                >
                                    Explore Courses
                                </Link>
                                <button className="px-8 py-3 border-2 border-slate-400 text-slate-300 font-semibold rounded-lg hover:border-white hover:text-white transition-colors">
                                    Learn More
                                </button>
                            </div>
                        </div>
                        
                        <div className="relative h-96 hidden lg:block">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-3xl opacity-20" />
                            <div className="relative bg-slate-800 border border-slate-700 rounded-2xl p-8 h-full flex flex-col justify-center items-center">
                                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 mb-4" />
                                <p className="text-slate-300 text-center">Premium learning platform for tech professionals</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="px-4 sm:px-6 lg:px-8 py-16 bg-slate-800/50">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-blue-400 mb-2">500+</div>
                        <p className="text-slate-300">Expert Courses</p>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-purple-400 mb-2">50K+</div>
                        <p className="text-slate-300">Active Students</p>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-blue-400 mb-2">4.8</div>
                        <p className="text-slate-300">Avg Rating</p>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-purple-400 mb-2">100%</div>
                        <p className="text-slate-300">Lifetime Access</p>
                    </div>
                </div>
            </section>

            {/* Trending Courses */}
            <section className="px-4 sm:px-6 lg:px-8 py-16">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-2">Trending Now</h2>
                            <p className="text-slate-400">Most popular courses this month</p>
                        </div>
                        <Link href="/courses?sort=popular" className="text-blue-400 hover:text-blue-300">
                            View All →
                        </Link>
                    </div>

                    {!loading && trendingCourses.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {trendingCourses.map(course => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Recommended Courses */}
            <section className="px-4 sm:px-6 lg:px-8 py-16 bg-slate-800/30">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-4xl font-bold text-white mb-2">Top Rated</h2>
                            <p className="text-slate-400">Highest rated courses by our community</p>
                        </div>
                        <Link href="/courses?sort=rating" className="text-blue-400 hover:text-blue-300">
                            View All →
                        </Link>
                    </div>

                    {!loading && recommendedCourses.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recommendedCourses.map(course => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Career?</h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Join thousands of professionals who are advancing their tech skills with our premium courses.
                    </p>
                    <Link 
                        href="/courses"
                        className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                    >
                        Start Learning Now
                    </Link>
                </div>
            </section>
            <Footer />
        </div>
    );
}

function CourseCard({ course }) {
    const avgRating = course.reviews?.reduce((sum, r) => sum + r.rating, 0) / (course.reviews?.length || 1) || 0;

    return (
        <Link href={`/courses/${course.slug}`}>
            <div className="group bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-blue-500 transition-all duration-300 cursor-pointer h-full flex flex-col">
                <div className="relative h-40 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
                    {course.thumbnail_url && (
                        <img
                            src={course.thumbnail_url && (course.thumbnail_url.startsWith('http') || course.thumbnail_url.startsWith('/storage/')) ? course.thumbnail_url : `/storage/${course.thumbnail_url}`}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                    )}
                    <div className="absolute top-3 right-3 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {course.level}
                    </div>
                </div>

                <div className="p-4 flex-1 flex flex-col">
                    <p className="text-xs text-blue-400 font-semibold mb-2 uppercase">{course.category}</p>
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                        {course.title}
                    </h3>

                    <p className="text-sm text-slate-400 mb-4 line-clamp-2 flex-1">
                        {course.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-slate-400 mb-4 border-t border-slate-700 pt-4">
                        <div className="flex items-center gap-1">
                            <Users size={16} />
                            <span>{course.enrollments_count} enrolled</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock size={16} />
                            <span>{course.total_duration} min</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star 
                                    key={i}
                                    size={16} 
                                    className={i < Math.floor(avgRating) ? "fill-yellow-400 text-yellow-400" : "text-slate-600"}
                                />
                            ))}
                            <span className="text-xs text-slate-400 ml-1">{avgRating.toFixed(1)}</span>
                        </div>
                        <span className="text-lg font-bold text-white">${course.price}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}


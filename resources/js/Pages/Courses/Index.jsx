import React, { useState, useEffect, useRef } from 'react';
import { Head, usePage, Link, router } from '@inertiajs/react';
import { Search, Filter, Star, Users, Clock } from 'lucide-react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function CourseIndex({ courses: initialCourses, filters: initialFilters, auth }) {
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({
        search: initialFilters?.search || '',
        category: initialFilters?.category || '',
        level: initialFilters?.level || '',
        sort: initialFilters?.sort || 'latest',
        instructor: initialFilters?.instructor || ''
    });
    const didInit = useRef(false);

    useEffect(() => {
        fetch('/api/categories').then(r => r.json()).then(d => setCategories(d.categories));
    }, []);

    useEffect(() => {
        // Skip first run to preserve initial URL (e.g., /courses/instructors=6)
        if (!didInit.current) {
            didInit.current = true;
            return;
        }
        const delayDebounceFn = setTimeout(() => {
            router.get('/courses', filters, {
                preserveState: true,
                preserveScroll: true,
            });
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [filters]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const avgRating = (courseData) => {
        return courseData.rating || 0;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Head title="Explore Courses — NelnadoSolutions" />
            <Navbar auth={auth} />
            {/* Header */}
            <section className="px-4 sm:px-6 lg:px-8 pt-32 pb-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold text-white mb-2">Explore Courses</h1>
                    <p className="text-slate-400">Discover thousands of courses from industry experts</p>
                </div>
            </section>

            {/* Filters */}
            <section className="px-4 sm:px-6 lg:px-8 py-8 bg-slate-800/50 border-y border-slate-700">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-3 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={filters.search || ''}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                            />
                        </div>

                        {/* Category */}
                        <select
                            value={filters.category}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                        >
                            <option value="">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>

                        {/* Level */}
                        <select
                            value={filters.level}
                            onChange={(e) => handleFilterChange('level', e.target.value)}
                            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                        >
                            <option value="">All Levels</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>

                        {/* Sort */}
                        <select
                            value={filters.sort}
                            onChange={(e) => handleFilterChange('sort', e.target.value)}
                            className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                        >
                            <option value="latest">Latest</option>
                            <option value="popular">Most Popular</option>
                            <option value="rating">Highest Rated</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* Courses Grid */}
            <section className="px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-7xl mx-auto">
                    {initialCourses.data.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                                {initialCourses.data.map(course => (
                                    <CourseCard key={course.id} course={course} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {initialCourses.links && initialCourses.links.length > 1 && (
                                <div className="flex justify-center gap-2 flex-wrap">
                                    {initialCourses.links.map((link, idx) => (
                                        <a
                                            key={idx}
                                            href={link.url}
                                            className={`px-4 py-2 rounded-lg border transition-colors ${
                                                link.active
                                                    ? 'bg-blue-600 border-blue-600 text-white'
                                                    : 'border-slate-600 text-slate-400 hover:border-slate-500'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-slate-400 text-lg">No courses found. Try adjusting your filters.</p>
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </div>
    );
}

function CourseCard({ course }) {
    return (
        <Link href={`/courses/${course.slug}`}>
            <div className="group bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:border-blue-500 transition-all duration-300 cursor-pointer h-full flex flex-col">
                <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
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

                <div className="p-6 flex-1 flex flex-col">
                    <p className="text-xs text-blue-400 font-semibold mb-2 uppercase">{course.category}</p>
                    <h3 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
                        {course.title}
                    </h3>

                    <p className="text-sm text-slate-400 mb-4 line-clamp-2 flex-1">
                        {course.description}
                    </p>

                    <div className="space-y-4 border-t border-slate-700 pt-4">
                        <div className="flex items-center justify-between text-sm text-slate-400">
                            <div className="flex items-center gap-2">
                                <Users size={16} />
                                <span>{course.total_students} students</span>
                            </div>
                            <div className="flex items-center gap-2">
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
                                        className={i < Math.floor(course.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-slate-600"}
                                    />
                                ))}
                                <span className="text-xs text-slate-400 ml-1">({Number(course.rating || 0).toFixed(1)})</span>
                            </div>
                            <span className="text-lg font-bold text-white">${Number(course.price || 0).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

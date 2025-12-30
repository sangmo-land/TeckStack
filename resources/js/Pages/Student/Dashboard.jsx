import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { BookOpen, Heart, Trophy, Clock, BarChart3, Settings } from 'lucide-react';

export default function StudentDashboard({ enrollments, wishlistCount, completedCoursesCount, totalCourses }) {
    const [progressData, setProgressData] = useState([]);

    useEffect(() => {
        setProgressData(enrollments.map(e => ({
            id: e.id,
            progress: e.progress_percentage,
        })));
    }, [enrollments]);

    const inProgressCount = enrollments.filter(e => e.status === 'active').length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Header */}
            <section className="px-4 sm:px-6 lg:px-8 pt-12 pb-8 border-b border-slate-700">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold text-white mb-2">My Learning</h1>
                    <p className="text-slate-400">Track your progress and continue learning</p>
                </div>
            </section>

            {/* Stats */}
            <section className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <StatCard icon={<BookOpen />} label="Enrolled Courses" value={totalCourses} />
                        <StatCard icon={<Clock />} label="In Progress" value={inProgressCount} />
                        <StatCard icon={<Trophy />} label="Completed" value={completedCoursesCount} />
                        <StatCard icon={<Heart />} label="Wishlist" value={wishlistCount} />
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-7xl mx-auto">
                    {enrollments.length > 0 ? (
                        <>
                            <h2 className="text-2xl font-bold text-white mb-6">Continue Learning</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {enrollments.map(enrollment => (
                                    <EnrollmentCard key={enrollment.id} enrollment={enrollment} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-16">
                            <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-white mb-2">No Courses Yet</h2>
                            <p className="text-slate-400 mb-6">Start your learning journey today!</p>
                            <Link
                                href="/courses"
                                className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Explore Courses
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

function StatCard({ icon, label, value }) {
    return (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 font-medium">{label}</p>
                <div className="text-blue-400">{icon}</div>
            </div>
            <p className="text-4xl font-bold text-white">{value}</p>
        </div>
    );
}

function EnrollmentCard({ enrollment }) {
    const progressPercentage = enrollment.progress_percentage || 0;
    const isCompleted = enrollment.status === 'completed';

    return (
        <Link href={`/courses/${enrollment.course.slug}`}>
            <div className="group bg-slate-800 border border-slate-700 rounded-lg overflow-hidden hover:border-blue-500 transition-all duration-300 cursor-pointer">
                <div className="relative h-40 bg-gradient-to-br from-blue-500 to-purple-600">
                    {enrollment.course.thumbnail_url && (
                        <img
                            src={enrollment.course.thumbnail_url && (enrollment.course.thumbnail_url.startsWith('http') || enrollment.course.thumbnail_url.startsWith('/storage/')) ? enrollment.course.thumbnail_url : `/storage/${enrollment.course.thumbnail_url}`}
                            alt={enrollment.course.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                    )}
                    {isCompleted && (
                        <div className="absolute inset-0 bg-green-600/40 flex items-center justify-center">
                            <Trophy className="text-white" size={40} />
                        </div>
                    )}
                </div>

                <div className="p-4">
                    <h3 className="font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                        {enrollment.course.title}
                    </h3>

                    <p className="text-xs text-slate-400 mb-4">
                        By {enrollment.course.instructor.name}
                    </p>

                    <div className="mb-4">
                        <div className="flex justify-between mb-2">
                            <span className="text-xs text-slate-400">Progress</span>
                            <span className="text-xs font-semibold text-blue-400">{progressPercentage}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                            <div
                                className={`h-full rounded-full transition-all duration-300 ${
                                    isCompleted ? 'bg-green-500' : 'bg-blue-500'
                                }`}
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                    </div>

                    <p className={`text-xs font-semibold ${isCompleted ? 'text-green-400' : 'text-slate-400'}`}>
                        {isCompleted ? '✓ Completed' : 'In Progress'}
                    </p>
                </div>
            </div>
        </Link>
    );
}

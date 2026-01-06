import React from 'react';
import { Link, Head } from "@inertiajs/react";
import {
    Users,
    Star,
    BookOpen,
    TrendingUp,
    Plus,
    BarChart3,
} from "lucide-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Footer from "@/Components/Footer";

export default function InstructorDashboard({
    courses,
    totalStudents,
    totalReviews,
    averageRating,
}) {
    return (
        <AuthenticatedLayout useMarketingNavbar>
            <Head title="Instructor Dashboard" />
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                {/* Header */}
                <section className="px-4 sm:px-6 lg:px-8 pt-12 pb-8 border-b border-slate-700">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">
                                Teaching Dashboard
                            </h1>
                            <p className="text-slate-400">
                                Manage your courses and track student progress
                            </p>
                        </div>
                        <Link
                            href="/dashboard/create-course"
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus size={20} /> Create Course
                        </Link>
                    </div>
                </section>

                {/* Stats */}
                <section className="px-4 sm:px-6 lg:px-8 py-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <StatCard
                                icon={<BookOpen />}
                                label="Total Courses"
                                value={courses.length}
                                color="blue"
                            />
                            <StatCard
                                icon={<Users />}
                                label="Total Students"
                                value={totalStudents}
                                color="purple"
                            />
                            <StatCard
                                icon={<Star />}
                                label="Average Rating"
                                value={averageRating}
                                color="yellow"
                            />
                            <StatCard
                                icon={<TrendingUp />}
                                label="Total Reviews"
                                value={totalReviews}
                                color="green"
                            />
                        </div>
                    </div>
                </section>

                {/* Courses */}
                <section className="px-4 sm:px-6 lg:px-8 py-8">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-2xl font-bold text-white mb-6">
                            My Courses
                        </h2>

                        {courses.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {courses.map((course) => (
                                    <CourseCard
                                        key={course.id}
                                        course={course}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-slate-800 border border-slate-700 rounded-lg">
                                <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">
                                    No Courses Yet
                                </h3>
                                <p className="text-slate-400 mb-6">
                                    Create your first course to start teaching!
                                </p>
                                <Link
                                    href="/dashboard/create-course"
                                    className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Create Your First Course
                                </Link>
                            </div>
                        )}
                    </div>
                </section>
                <Footer />
            </div>
        </AuthenticatedLayout>
    );
}

function StatCard({ icon, label, value, color }) {
    const colorMap = {
        blue: 'text-blue-400',
        purple: 'text-purple-400',
        yellow: 'text-yellow-400',
        green: 'text-green-400',
    };

    return (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 font-medium">{label}</p>
                <div className={colorMap[color]}>{icon}</div>
            </div>
            <p className="text-4xl font-bold text-white">{typeof value === 'number' ? value : value}</p>
        </div>
    );
}

function CourseCard({ course }) {
    const enrollmentsCount = course.enrollments?.length || 0;
    const publishStatus = course.is_published ? 'Published' : 'Draft';
    const publishColor = course.is_published ? 'bg-green-600/20 text-green-400' : 'bg-slate-600/20 text-slate-400';
    
    const thumbnailSrc = course.thumbnail_url
        ? course.thumbnail_url.startsWith("http") ||
          course.thumbnail_url.startsWith("/storage/")
            ? course.thumbnail_url
            : `/storage/${course.thumbnail_url}`
        : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop";

    return (
        <div className="group bg-slate-800 border border-slate-700 rounded-lg overflow-hidden hover:border-blue-500 transition-all duration-300">
            <div className="relative h-40 bg-gradient-to-br from-blue-500 to-purple-600">
                <img
                    src={thumbnailSrc}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${publishColor}`}
                >
                    {publishStatus}
                </div>
            </div>

            <div className="p-4">
                <h3 className="font-bold text-white mb-2 line-clamp-2">
                    {course.title}
                </h3>

                <div className="space-y-2 mb-4 text-sm text-slate-400">
                    <div className="flex justify-between">
                        <span>Students</span>
                        <span className="text-white font-semibold">
                            {enrollmentsCount}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>Price</span>
                        <span className="text-white font-semibold">
                            $
                            {course.price
                                ? parseFloat(course.price).toFixed(2)
                                : "0.00"}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>Rating</span>
                        <span className="text-yellow-400 font-semibold">
                            {course.rating && typeof course.rating === "number"
                                ? course.rating.toFixed(1)
                                : "—"}
                        </span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Link
                        href={`/courses/${course.slug}`}
                        className="flex-1 px-3 py-2 bg-blue-600/20 text-blue-400 font-semibold rounded text-center text-sm hover:bg-blue-600/40 transition-colors"
                    >
                        View
                    </Link>
                    <Link
                        href={`/dashboard/courses/${course.id}/edit`}
                        className="flex-1 px-3 py-2 bg-slate-600/20 text-slate-400 font-semibold rounded text-center text-sm hover:bg-slate-600/40 transition-colors"
                    >
                        Edit
                    </Link>
                </div>
            </div>
        </div>
    );
}

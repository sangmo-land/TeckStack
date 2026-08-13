import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CourseTree, { Badge } from '@/Components/CourseTree';
import { Head, router, usePage, Link, useForm } from '@inertiajs/react';
import React, { useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
    TrendingUp,
    Users,
    BookOpen,
    Clock3,
    Activity,
    AlertCircle,
    CheckCircle2,
    Plus,
    Star,
    BarChart3,
    Heart,
    Trophy,
    Clock,
} from 'lucide-react';





function CourseCard({ course }) {
    const enrollmentsCount = course.enrollments?.length || 0;
    const publishStatus = course.is_published ? 'Published' : 'Draft';
    const publishColor = course.is_published ? 'bg-green-600/20 text-green-400' : 'bg-slate-600/20 text-slate-400';
    const ratingDisplay = course.rating && typeof course.rating === 'number' ? course.rating.toFixed(1) : '—';

    return (
        <div className="group bg-slate-800 border border-slate-700 rounded-lg overflow-hidden hover:border-blue-500 transition-all duration-300">
            <div className="relative h-40 bg-gradient-to-br from-blue-500 to-purple-600">
                {course.thumbnail_url && (
                    <img
                        src={course.thumbnail_url && (course.thumbnail_url.startsWith('http') || course.thumbnail_url.startsWith('/storage/')) ? course.thumbnail_url : `/storage/${course.thumbnail_url}`}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                )}
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${publishColor}`}>
                    {publishStatus}
                </div>
            </div>

            <div className="p-4">
                <h3 className="font-bold text-white mb-2 line-clamp-2">{course.title}</h3>

                <div className="space-y-2 mb-4 text-sm text-slate-400">
                    <div className="flex justify-between">
                        <span>Students</span>
                        <span className="text-white font-semibold">{enrollmentsCount}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Price</span>
                        <span className="text-white font-semibold">${parseFloat(course.price).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Rating</span>
                        <span className="text-yellow-400 font-semibold">{ratingDisplay}</span>
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

function StudentStatCard({ icon, label, value }) {
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


function ProgressBar({ pct }) {
    return (
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div
                className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-600"
                style={{ width: `${pct}%` }}
            />
        </div>
    );
}

export default function Dashboard() {
    const { 
        course, 
        coursesList, 
        userRole, 
        instructorCourses, 
        totalStudents, 
        totalReviews, 
        averageRating,
        enrollments,
        wishlistCount,
        completedCoursesCount,
        totalCourses,
        inProgressCount,
        canEditCourse = true,
        adminStats,
        recentActivity,
        engagementData
    } = usePage().props;

    const kpis = useMemo(() => {
        if (userRole === 'admin' && adminStats) {
            return [
                { label: 'Active Learners', value: adminStats.activeLearners.toString(), change: '', icon: Users, tone: 'primary' },
                { label: 'Courses Published', value: adminStats.publishedCourses.toString(), change: '', icon: BookOpen, tone: 'emerald' },
                { label: 'Avg. Completion', value: `${adminStats.avgCompletion}%`, change: '', icon: TrendingUp, tone: 'amber' },
                { label: 'Time Spent', value: `${adminStats.totalHours}k hrs`, change: '', icon: Clock3, tone: 'blue' },
            ];
        }
        return [];
    }, [userRole, adminStats]);

    const activity = useMemo(() => {
        if (userRole === 'admin' && recentActivity) {
            return recentActivity.map(item => ({
                title: 'New enrollment',
                meta: `${item.user_name} joined "${item.course_title}"`,
                time: new Date(item.created_at).toLocaleString()
            }));
        }
        return [];
    }, [userRole, recentActivity]);

    return (
        <AuthenticatedLayout useMarketingNavbar>
            <Head title="Dashboard" />

            {/* Student Dashboard Section */}
            {userRole === "student" && (
                <>
                    {/* Student Header */}
                    <section className="px-4 sm:px-6 lg:px-8 pt-12 pb-8 border-b border-slate-700 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                        <div className="max-w-7xl mx-auto">
                            <h1 className="text-4xl font-bold text-white mb-2">
                                My Learning
                            </h1>
                            <p className="text-slate-400">
                                Track your progress and continue learning
                            </p>
                        </div>
                    </section>

                    {/* Student Stats */}
                    <section className="px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <StudentStatCard
                                    icon={<BookOpen />}
                                    label="Enrolled Courses"
                                    value={totalCourses || 0}
                                />
                                <StudentStatCard
                                    icon={<Clock />}
                                    label="In Progress"
                                    value={inProgressCount || 0}
                                />
                                <StudentStatCard
                                    icon={<Trophy />}
                                    label="Completed"
                                    value={completedCoursesCount || 0}
                                />
                                <StudentStatCard
                                    icon={<Heart />}
                                    label="Wishlist"
                                    value={wishlistCount || 0}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Student Courses */}
                    <section className="px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                        <div className="max-w-7xl mx-auto">
                            {enrollments?.length > 0 ? (
                                <>
                                    <h2 className="text-2xl font-bold text-white mb-6">
                                        Continue Learning
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {enrollments.map((enrollment) => (
                                            <EnrollmentCard
                                                key={enrollment.id}
                                                enrollment={enrollment}
                                            />
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-16">
                                    <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                                    <h2 className="text-2xl font-bold text-white mb-2">
                                        No Courses Yet
                                    </h2>
                                    <p className="text-slate-400 mb-6">
                                        Start your learning journey today!
                                    </p>
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
                </>
            )}

            {/* Instructor Dashboard Section */}
            {userRole === "instructor" && (
                <>
                    {/* Instructor Header */}
                    <section className="px-4 sm:px-6 lg:px-8 pt-12 pb-8 border-b border-slate-700 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                        <div className="max-w-7xl mx-auto flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                                    Teaching Dashboard
                                </h1>
                                <p className="text-slate-400">
                                    Manage your courses and track student
                                    progress
                                </p>
                            </div>
                            <Link
                                href="/dashboard/create-course"
                                className="inline-flex flex-none items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Plus size={20} /> Create Course
                            </Link>
                        </div>
                    </section>

                    {/* Instructor Stats */}
                    <section className="px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <StatCard
                                    icon={<BookOpen />}
                                    label="Total Courses"
                                    value={instructorCourses?.length || 0}
                                    color="blue"
                                />
                                <StatCard
                                    icon={<Users />}
                                    label="Total Students"
                                    value={totalStudents || 0}
                                    color="purple"
                                />
                                <StatCard
                                    icon={<Star />}
                                    label="Average Rating"
                                    value={averageRating || 0}
                                    color="yellow"
                                />
                                <StatCard
                                    icon={<TrendingUp />}
                                    label="Total Reviews"
                                    value={totalReviews || 0}
                                    color="green"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Instructor Courses */}
                    <section className="px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-2xl font-bold text-white mb-6">
                                My Courses
                            </h2>

                            {instructorCourses?.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {instructorCourses.map((course) => (
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
                                        Create your first course to start
                                        teaching!
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

                    <div className="px-4 sm:px-6 lg:px-8 py-8">
                        <div className="bg-white dark:bg-gray-800 rounded-lg border-t-4 border-slate-600 p-6 mb-8">
                            <p className="text-gray-600 dark:text-gray-300 text-center">
                                Below is the course hierarchy management
                                section. You can view and edit chapter
                                structures here.
                            </p>
                        </div>
                    </div>
                </>
            )}

            <div className="bg-gradient-to-b from-gray-50 to-white">
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-sm font-medium uppercase tracking-wide text-primary-600">
                                Overview
                            </p>
                            <h1 className="mt-1 text-3xl font-semibold text-gray-900">
                                Learning Performance
                            </h1>
                            <p className="mt-2 text-sm text-gray-600">
                                Real-time health of your courses, learners, and
                                content.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            {(userRole === "instructor" ||
                                userRole === "admin") && (
                                <Link
                                    href="/instructor/dashboard"
                                    className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 flex items-center gap-2 sm:px-4"
                                >
                                    <BookOpen className="h-4 w-4 flex-none" />
                                    Teaching Dashboard
                                </Link>
                            )}
                            <button className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:px-4">
                                Export
                            </button>
                            <button className="rounded-lg bg-primary-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 sm:px-4">
                                New Report
                            </button>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {kpis.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.label}
                                    className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100"
                                >
                                    <div className="flex items-center justify-between">
                                        <Badge tone={item.tone}>
                                            {item.label}
                                        </Badge>
                                        <Icon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <div className="mt-3 text-2xl font-semibold text-gray-900">
                                        {item.value}
                                    </div>
                                    <div className="mt-1 text-sm text-gray-500">
                                        {item.change}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-6 grid gap-6 lg:grid-cols-3">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100 text-gray-900 sm:p-6 dark:bg-gray-900 dark:text-gray-50 dark:ring-gray-800">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                                            Course Hierarchy
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-300">
                                            Select a course to view chapters
                                        </p>
                                    </div>
                                    <select
                                        className="w-full max-w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:w-auto sm:max-w-[16rem] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
                                        value={course?.id || ""}
                                        onChange={(e) =>
                                            router.get(
                                                route("dashboard"),
                                                {
                                                    course_id:
                                                        e.target.value ||
                                                        undefined,
                                                },
                                                {
                                                    preserveState: true,
                                                    replace: true,
                                                }
                                            )
                                        }
                                    >
                                        <option value="">Latest Course</option>
                                        {coursesList?.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mt-4">
                                    <CourseTree
                                        course={course}
                                        canEdit={canEditCourse}
                                    />
                                </div>
                            </div>

                            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100 sm:p-6">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">
                                            Engagement Pulse
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Past 7 days
                                        </p>
                                    </div>
                                    <Badge
                                        tone="primary"
                                        className="flex items-center gap-2"
                                    >
                                        <Activity className="h-4 w-4" /> Live
                                    </Badge>
                                </div>
                                <div className="mt-6 h-48">
                                    {engagementData &&
                                    engagementData.length > 0 ? (
                                        <ResponsiveContainer
                                            width="100%"
                                            height="100%"
                                        >
                                            <LineChart data={engagementData}>
                                                <CartesianGrid
                                                    strokeDasharray="3 3"
                                                    stroke="#e2e8f0"
                                                />
                                                <XAxis
                                                    dataKey="date"
                                                    tick={{
                                                        fill: "#64748b",
                                                        fontSize: 12,
                                                    }}
                                                    stroke="#cbd5e1"
                                                />
                                                <YAxis
                                                    tick={{
                                                        fill: "#64748b",
                                                        fontSize: 12,
                                                    }}
                                                    stroke="#cbd5e1"
                                                />
                                                <Tooltip
                                                    contentStyle={{
                                                        backgroundColor:
                                                            "#1e293b",
                                                        border: "none",
                                                        borderRadius: "8px",
                                                        color: "#fff",
                                                    }}
                                                />
                                                <Legend
                                                    wrapperStyle={{
                                                        fontSize: "12px",
                                                    }}
                                                />
                                                <Line
                                                    type="monotone"
                                                    dataKey="enrollments"
                                                    stroke="#3b82f6"
                                                    strokeWidth={2}
                                                    dot={{
                                                        fill: "#3b82f6",
                                                        r: 4,
                                                    }}
                                                    name="Enrollments"
                                                />
                                                <Line
                                                    type="monotone"
                                                    dataKey="activity"
                                                    stroke="#8b5cf6"
                                                    strokeWidth={2}
                                                    dot={{
                                                        fill: "#8b5cf6",
                                                        r: 4,
                                                    }}
                                                    name="Learning Activity"
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="h-full rounded-xl bg-gradient-to-r from-primary-50 via-white to-primary-50 ring-1 ring-gray-100 flex items-center justify-center">
                                            <p className="text-sm text-gray-500">
                                                No engagement data available
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4 flex items-center gap-3 text-sm text-gray-600">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                    {engagementData && engagementData.length > 0
                                        ? `Tracking ${engagementData.reduce(
                                              (sum, d) =>
                                                  sum +
                                                  d.enrollments +
                                                  d.activity,
                                              0
                                          )} events this week`
                                        : "Stable engagement with slight uplift in completion rate."}
                                </div>
                            </div>

                            <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100 sm:p-6">
                                <div className="flex items-center justify-between gap-2">
                                    <p className="text-sm font-medium text-gray-700">
                                        Recent Activity
                                    </p>
                                    <button className="flex-none text-sm font-medium text-primary-600 hover:text-primary-700">
                                        View all
                                    </button>
                                </div>
                                <div className="mt-4 space-y-4">
                                    {activity.map((item) => (
                                        <div
                                            key={item.title}
                                            className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
                                        >
                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {item.title}
                                                </p>
                                                <p className="break-words text-xs text-gray-500">
                                                    {item.meta}
                                                </p>
                                            </div>
                                            <span className="flex-none text-xs text-gray-400">
                                                {item.time}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Removed hardcoded progress section - can be added back with real data later */}

                            {/* Removed hardcoded alerts section - can be added back with real data later */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

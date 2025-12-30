import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
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
    FolderTree,
    ChevronRight,
    ChevronDown,
    Plus,
    Code,
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

function Badge({ tone = 'primary', children }) {
    const tones = {
        primary: 'bg-primary-50 text-primary-700 ring-primary-100',
        emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
        amber: 'bg-amber-50 text-amber-700 ring-amber-100',
        blue: 'bg-blue-50 text-blue-700 ring-blue-100',
    };
    return (
        <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${tones[tone]}`}>
            {children}
        </span>
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

function TreeNode({ node, depth = 0, defaultOpen = false, canEdit = true }) {
    const [open, setOpen] = React.useState(defaultOpen);
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [snippetModalOpen, setSnippetModalOpen] = React.useState(false);
    const [snippetData, setSnippetData] = React.useState({
        title: '',
        language: 'javascript',
        code: '',
    });
    const hasChildren = node.children && node.children.length > 0;

    const handleInsert = (position) => {
        const title = window.prompt('Title for new subtopic', 'New subtopic');
        setMenuOpen(false);
        if (!title) return;

        router.post(
            route('chapters.insert', node.id),
            { position, title },
            {
                preserveScroll: true,
                preserveState: true,
                onFinish: () => setOpen(true),
            }
        );
    };

    const handleCreateSnippet = () => {
        if (!snippetData.title.trim() || !snippetData.code.trim()) {
            alert('Title and code are required');
            return;
        }

        router.post(
            route('snippets.store', node.id),
            snippetData,
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    setSnippetModalOpen(false);
                    setSnippetData({ title: '', language: 'javascript', code: '' });
                },
            }
        );
    };

    const handleDelete = () => {
        if (!confirm(`Are you sure you want to delete "${node.title}"? This action cannot be undone.`)) {
            return;
        }
        setMenuOpen(false);
        router.delete(
            route('chapters.destroy', node.id),
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };
    return (
        <div className="space-y-1">
            <div
                className="group relative flex items-start gap-3 rounded-xl px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800"
                style={{ paddingLeft: `${depth * 1.25}rem` }}
            >
                <button
                    className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setOpen((v) => !v)}
                    aria-label={open ? 'Collapse' : 'Expand'}
                    title={open ? 'Collapse' : 'Expand'}
                >
                    {hasChildren ? (
                        open ? <ChevronDown className="h-4 w-4 text-gray-600" /> : <ChevronRight className="h-4 w-4 text-gray-600" />
                    ) : (
                        <span className="inline-block h-4 w-4" />
                    )}
                </button>

                <div className="flex h-7 w-16 flex-none items-center justify-center rounded-md bg-primary-50 text-primary-700 ring-1 ring-primary-200 dark:bg-primary-950 dark:text-primary-300 dark:ring-primary-900">
                    <span className="text-sm font-semibold">{node.full_number ?? '—'}</span>
                </div>

                <div className="flex items-start gap-2">
                    {hasChildren ? (
                        <FolderTree className="h-4 w-4 text-primary-600" />
                    ) : (
                        <BookOpen className="h-4 w-4 text-primary-600" />
                    )}
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{node.title}</span>
                            {node.is_published === false && (
                                <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800 ring-1 ring-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:ring-yellow-800">Draft</span>
                            )}
                            {node.is_free && (
                                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800 ring-1 ring-emerald-200 dark:bg-emerald-900 dark:text-emerald-200 dark:ring-emerald-800">Free</span>
                            )}
                        </div>
                        {node.description && (
                            <p className="mt-0.5 text-xs text-gray-600 line-clamp-2 dark:text-gray-400">{node.description}</p>
                        )}
                    </div>
                </div>
                <div className="ml-auto flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <span>{node.duration_minutes ? `${node.duration_minutes} mins` : '—'}</span>

                    {canEdit && (
                        <button
                            type="button"
                            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:bg-gray-50 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                            title="Add code snippet"
                            onClick={() => setSnippetModalOpen(true)}
                        >
                            <Code className="h-4 w-4" />
                        </button>
                    )}

                    {canEdit && (
                        <div className="relative">
                            <button
                                type="button"
                                className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:bg-gray-50 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                                aria-haspopup="menu"
                                aria-expanded={menuOpen}
                            onClick={() => setMenuOpen((v) => !v)}
                        >
                            <Plus className="h-4 w-4" />
                        </button>

                        {menuOpen && (
                            <div
                                className="absolute right-0 z-20 mt-2 w-56 rounded-lg border border-gray-200 bg-white p-2 text-sm shadow-lg ring-1 ring-black/5 dark:border-gray-700 dark:bg-gray-800"
                                onMouseLeave={() => setMenuOpen(false)}
                            >
                                <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Add subtopic</p>
                                <div className="space-y-1">
                                    <button
                                        type="button"
                                        className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left hover:bg-gray-50 dark:hover:bg-gray-700"
                                        onClick={() => handleInsert('sibling_before')}
                                    >
                                        <span>Sibling · before</span>
                                        <span className="text-[11px] text-gray-500">top</span>
                                    </button>
                                    <button
                                        type="button"
                                        className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left hover:bg-gray-50 dark:hover:bg-gray-700"
                                        onClick={() => handleInsert('sibling_after')}
                                    >
                                        <span>Sibling · after</span>
                                        <span className="text-[11px] text-gray-500">bottom</span>
                                    </button>
                                    <button
                                        type="button"
                                        className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left hover:bg-gray-50 dark:hover:bg-gray-700"
                                        onClick={() => handleInsert('child_before')}
                                    >
                                        <span>Child · before</span>
                                        <span className="text-[11px] text-gray-500">first</span>
                                    </button>
                                    <button
                                        type="button"
                                        className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left hover:bg-gray-50 dark:hover:bg-gray-700"
                                        onClick={() => handleInsert('child_after')}
                                    >
                                        <span>Child · after</span>
                                        <span className="text-[11px] text-gray-500">last</span>
                                    </button>
                                </div>
                                <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
                                <div className="space-y-1">
                                    <button
                                        type="button"
                                        className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                                        onClick={handleDelete}
                                    >
                                        <span>Delete topic</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    )}
                </div>
            </div>

            {snippetModalOpen && canEdit && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 text-gray-900 shadow-xl dark:bg-gray-900 dark:text-gray-50">
                        <h3 className="mb-4 text-lg font-semibold">Add Code Snippet</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input
                                    type="text"
                                    value={snippetData.title}
                                    onChange={(e) => setSnippetData({ ...snippetData, title: e.target.value })}
                                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
                                    placeholder="e.g., Basic Arrow Function"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Language</label>
                                <select
                                    value={snippetData.language}
                                    onChange={(e) => setSnippetData({ ...snippetData, language: e.target.value })}
                                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
                                >
                                    <option value="javascript">JavaScript</option>
                                    <option value="typescript">TypeScript</option>
                                    <option value="python">Python</option>
                                    <option value="php">PHP</option>
                                    <option value="html">HTML</option>
                                    <option value="css">CSS</option>
                                    <option value="sql">SQL</option>
                                    <option value="java">Java</option>
                                    <option value="cpp">C++</option>
                                    <option value="csharp">C#</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Code</label>
                                <textarea
                                    value={snippetData.code}
                                    onChange={(e) => setSnippetData({ ...snippetData, code: e.target.value })}
                                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-mono text-gray-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
                                    placeholder="Paste your code here..."
                                    rows={8}
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setSnippetModalOpen(false)}
                                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleCreateSnippet}
                                className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700"
                            >
                                Create Snippet
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {hasChildren && open && (
                <div className="space-y-1">
                    {node.children.map((child) => (
                        <TreeNode key={child.id} node={child} depth={depth + 1} defaultOpen={depth < 1} canEdit={canEdit} />
                    ))}
                </div>
            )}
        </div>
    );
}

function CourseTree({ course, canEdit = true }) {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [chapterTitle, setChapterTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    if (!course) {
        return (
            <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300">
                No course selected. Choose a course to see its chapter hierarchy.
            </div>
        );
    }

    const hasChapters = course.chapters && course.chapters.length > 0;

    const handleCreateChapter = (e) => {
        e.preventDefault();
        if (!chapterTitle.trim()) {
            setError('Chapter title is required');
            return;
        }
        
        setIsLoading(true);
        setError('');

        router.post(route('chapters.create'), {
            course_id: course.id,
            title: chapterTitle,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setChapterTitle('');
                setShowCreateForm(false);
                setIsLoading(false);
            },
            onError: (errors) => {
                setError(errors.title || errors.course_id || 'Failed to create chapter');
                setIsLoading(false);
            },
        });
    };

    return (
        <div className="rounded-2xl bg-white p-6 text-gray-900 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:text-gray-50 dark:ring-gray-800">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">Hierarchy</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{course.title}</p>
                </div>
                <Badge tone="primary" className="flex items-center gap-1">
                    <FolderTree className="h-4 w-4" />
                    Chapters
                </Badge>
            </div>

            <div className="mt-4">
                {hasChapters ? (
                    <div className="space-y-1">
                        {course.chapters.map((chapter) => (
                            <TreeNode key={chapter.id} node={chapter} depth={0} defaultOpen canEdit={canEdit} />
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-8 text-center">
                            <FolderTree className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-600 mb-3" />
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">No chapters yet</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Create your first chapter to structure course content</p>
                            
                            {!showCreateForm ? (
                                canEdit && (
                                    <button
                                        onClick={() => setShowCreateForm(true)}
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                                    >
                                        <Plus className="h-4 w-4" />
                                        Create First Chapter
                                    </button>
                                )
                            ) : (
                                <form onSubmit={handleCreateChapter} className="space-y-3">
                                    <input
                                        type="text"
                                        value={chapterTitle}
                                        onChange={(e) => {
                                            setChapterTitle(e.target.value);
                                            setError('');
                                        }}
                                        placeholder="Enter chapter title..."
                                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {error && <p className="text-red-500 text-xs">{error}</p>}
                                    <div className="flex gap-2 justify-center">
                                        <button
                                            type="submit"
                                            disabled={isLoading || !chapterTitle.trim()}
                                            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            {isLoading ? 'Creating...' : 'Create'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowCreateForm(false);
                                                setChapterTitle('');
                                                setError('');
                                            }}
                                            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                )}
            </div>
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
            {userRole === 'student' && (
                <>
                    {/* Student Header */}
                    <section className="px-4 sm:px-6 lg:px-8 pt-12 pb-8 border-b border-slate-700 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                        <div className="max-w-7xl mx-auto">
                            <h1 className="text-4xl font-bold text-white mb-2">My Learning</h1>
                            <p className="text-slate-400">Track your progress and continue learning</p>
                        </div>
                    </section>

                    {/* Student Stats */}
                    <section className="px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <StudentStatCard icon={<BookOpen />} label="Enrolled Courses" value={totalCourses || 0} />
                                <StudentStatCard icon={<Clock />} label="In Progress" value={inProgressCount || 0} />
                                <StudentStatCard icon={<Trophy />} label="Completed" value={completedCoursesCount || 0} />
                                <StudentStatCard icon={<Heart />} label="Wishlist" value={wishlistCount || 0} />
                            </div>
                        </div>
                    </section>

                    {/* Student Courses */}
                    <section className="px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                        <div className="max-w-7xl mx-auto">
                            {enrollments?.length > 0 ? (
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
                </>
            )}

            {/* Instructor Dashboard Section */}
            {userRole === 'instructor' && (
                <>
                    {/* Instructor Header */}
                    <section className="px-4 sm:px-6 lg:px-8 pt-12 pb-8 border-b border-slate-700 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                        <div className="max-w-7xl mx-auto flex justify-between items-center">
                            <div>
                                <h1 className="text-4xl font-bold text-white mb-2">Teaching Dashboard</h1>
                                <p className="text-slate-400">Manage your courses and track student progress</p>
                            </div>
                            <Link
                                href="/dashboard/create-course"
                                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Plus size={20} /> Create Course
                            </Link>
                        </div>
                    </section>

                    {/* Instructor Stats */}
                    <section className="px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <StatCard icon={<BookOpen />} label="Total Courses" value={instructorCourses?.length || 0} color="blue" />
                                <StatCard icon={<Users />} label="Total Students" value={totalStudents || 0} color="purple" />
                                <StatCard icon={<Star />} label="Average Rating" value={averageRating || 0} color="yellow" />
                                <StatCard icon={<TrendingUp />} label="Total Reviews" value={totalReviews || 0} color="green" />
                            </div>
                        </div>
                    </section>

                    {/* Instructor Courses */}
                    <section className="px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-2xl font-bold text-white mb-6">My Courses</h2>

                            {instructorCourses?.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {instructorCourses.map(course => (
                                        <CourseCard key={course.id} course={course} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16 bg-slate-800 border border-slate-700 rounded-lg">
                                    <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-white mb-2">No Courses Yet</h3>
                                    <p className="text-slate-400 mb-6">Create your first course to start teaching!</p>
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
                                Below is the course hierarchy management section. You can view and edit chapter structures here.
                            </p>
                        </div>
                    </div>
                </>
            )}

            <div className="bg-gradient-to-b from-gray-50 to-white">
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-sm font-medium uppercase tracking-wide text-primary-600">Overview</p>
                            <h1 className="mt-1 text-3xl font-semibold text-gray-900">Learning Performance</h1>
                            <p className="mt-2 text-sm text-gray-600">Real-time health of your courses, learners, and content.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                                Export
                            </button>
                            <button className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700">
                                New Report
                            </button>
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {kpis.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.label} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
                                    <div className="flex items-center justify-between">
                                        <Badge tone={item.tone}>{item.label}</Badge>
                                        <Icon className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <div className="mt-3 text-2xl font-semibold text-gray-900">{item.value}</div>
                                    <div className="mt-1 text-sm text-gray-500">{item.change}</div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-6 grid gap-6 lg:grid-cols-3">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-50 dark:ring-gray-800">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">Course Hierarchy</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-300">Select a course to view chapters</p>
                                    </div>
                                    <select
                                        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
                                        value={course?.id || ''}
                                        onChange={(e) => router.get(route('dashboard'), { course_id: e.target.value || undefined }, { preserveState: true, replace: true })}
                                    >
                                        <option value="">Latest Course</option>
                                        {coursesList?.map((c) => (
                                            <option key={c.id} value={c.id}>{c.title}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mt-4">
                                    <CourseTree course={course} canEdit={canEditCourse} />
                                </div>
                            </div>

                            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">Engagement Pulse</p>
                                        <p className="text-xs text-gray-500">Past 7 days</p>
                                    </div>
                                    <Badge tone="primary" className="flex items-center gap-2">
                                        <Activity className="h-4 w-4" /> Live
                                    </Badge>
                                </div>
                                <div className="mt-6 h-48">
                                    {engagementData && engagementData.length > 0 ? (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={engagementData}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                                <XAxis 
                                                    dataKey="date" 
                                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                                    stroke="#cbd5e1"
                                                />
                                                <YAxis 
                                                    tick={{ fill: '#64748b', fontSize: 12 }}
                                                    stroke="#cbd5e1"
                                                />
                                                <Tooltip 
                                                    contentStyle={{ 
                                                        backgroundColor: '#1e293b', 
                                                        border: 'none', 
                                                        borderRadius: '8px',
                                                        color: '#fff'
                                                    }}
                                                />
                                                <Legend 
                                                    wrapperStyle={{ fontSize: '12px' }}
                                                />
                                                <Line 
                                                    type="monotone" 
                                                    dataKey="enrollments" 
                                                    stroke="#3b82f6" 
                                                    strokeWidth={2}
                                                    dot={{ fill: '#3b82f6', r: 4 }}
                                                    name="Enrollments"
                                                />
                                                <Line 
                                                    type="monotone" 
                                                    dataKey="activity" 
                                                    stroke="#8b5cf6" 
                                                    strokeWidth={2}
                                                    dot={{ fill: '#8b5cf6', r: 4 }}
                                                    name="Learning Activity"
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="h-full rounded-xl bg-gradient-to-r from-primary-50 via-white to-primary-50 ring-1 ring-gray-100 flex items-center justify-center">
                                            <p className="text-sm text-gray-500">No engagement data available</p>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-4 flex items-center gap-3 text-sm text-gray-600">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                    {engagementData && engagementData.length > 0 
                                        ? `Tracking ${engagementData.reduce((sum, d) => sum + d.enrollments + d.activity, 0)} events this week`
                                        : 'Stable engagement with slight uplift in completion rate.'}
                                </div>
                            </div>

                            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-700">Recent Activity</p>
                                    <button className="text-sm font-medium text-primary-600 hover:text-primary-700">View all</button>
                                </div>
                                <div className="mt-4 space-y-4">
                                    {activity.map((item) => (
                                        <div key={item.title} className="flex items-start justify-between gap-4">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                                                <p className="text-xs text-gray-500">{item.meta}</p>
                                            </div>
                                            <span className="text-xs text-gray-400">{item.time}</span>
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

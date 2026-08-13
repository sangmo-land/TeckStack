import { router } from '@inertiajs/react';
import React, { useState } from 'react';
import {
    BookOpen,
    ChevronDown,
    ChevronRight,
    Code,
    FolderTree,
    Plus,
} from 'lucide-react';

export function Badge({ tone = 'primary', children }) {
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
            <div className="group relative flex items-start gap-2 rounded-xl px-2 py-2 hover:bg-gray-50 sm:gap-3 sm:px-3 dark:hover:bg-gray-800">
                <button
                    className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded hover:bg-gray-100 dark:hover:bg-gray-700"
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

                <div className="flex h-7 w-12 flex-none items-center justify-center rounded-md bg-primary-50 text-primary-700 ring-1 ring-primary-200 sm:w-16 dark:bg-primary-950 dark:text-primary-300 dark:ring-primary-900">
                    <span className="text-xs font-semibold sm:text-sm">{node.full_number ?? '—'}</span>
                </div>

                <div className="flex min-w-0 flex-1 items-start gap-2">
                    {hasChildren ? (
                        <FolderTree className="h-4 w-4 flex-none text-primary-600" />
                    ) : (
                        <BookOpen className="h-4 w-4 flex-none text-primary-600" />
                    )}
                    <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <span className="break-words text-sm font-medium text-gray-900 dark:text-gray-100">{node.title}</span>
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
                        {/* Duration rides under the title on phones, where the
                            meta column has no room for it. */}
                        {node.duration_minutes ? (
                            <p className="mt-0.5 text-xs text-gray-500 sm:hidden dark:text-gray-400">
                                {node.duration_minutes} mins
                            </p>
                        ) : null}
                    </div>
                </div>
                <div className="flex flex-none items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <span className="hidden whitespace-nowrap sm:inline">
                        {node.duration_minutes ? `${node.duration_minutes} mins` : '—'}
                    </span>

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
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-4 text-gray-900 shadow-xl sm:p-6 dark:bg-gray-900 dark:text-gray-50">
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

            {/* Nesting is expressed by indenting the children container rather
                than by a depth-scaled padding on each row: deep trees stay
                inside the viewport on phones instead of scrolling sideways. */}
            {hasChildren && open && (
                <div className="ml-3 space-y-1 border-l border-gray-200 pl-1 sm:ml-5 sm:pl-2 dark:border-gray-700">
                    {node.children.map((child) => (
                        <TreeNode key={child.id} node={child} depth={depth + 1} defaultOpen={depth < 1} canEdit={canEdit} />
                    ))}
                </div>
            )}
        </div>
    );
}

const DEFAULT_SHELL =
    'rounded-2xl bg-white p-4 text-gray-900 shadow-sm ring-1 ring-gray-100 sm:p-6 dark:bg-gray-900 dark:text-gray-50 dark:ring-gray-800';

export default function CourseTree({ course, canEdit = true, className = DEFAULT_SHELL }) {
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
        <div className={className}>
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">Hierarchy</p>
                    <p className="break-words text-xs text-gray-600 dark:text-gray-300">{course.title}</p>
                </div>
                <div className="flex flex-none items-center gap-2">
                    {/* With chapters already present, the per-node "+" menu is the only way to
                        add a top-level chapter — this keeps that one click away. */}
                    {canEdit && hasChapters && !showCreateForm && (
                        <button
                            type="button"
                            onClick={() => setShowCreateForm(true)}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700"
                        >
                            <Plus className="h-3.5 w-3.5" />
                            Add chapter
                        </button>
                    )}
                    <Badge tone="primary">
                        <FolderTree className="h-4 w-4" />
                        Chapters
                    </Badge>
                </div>
            </div>

            {hasChapters && showCreateForm && canEdit && (
                <form onSubmit={handleCreateChapter} className="mt-4 space-y-3 rounded-xl border border-gray-200 p-4 dark:border-gray-700">
                    <input
                        type="text"
                        value={chapterTitle}
                        onChange={(e) => {
                            setChapterTitle(e.target.value);
                            setError('');
                        }}
                        placeholder="Enter chapter title..."
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-50"
                    />
                    {error && <p className="text-xs text-red-500">{error}</p>}
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            disabled={isLoading || !chapterTitle.trim()}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
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
                            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

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

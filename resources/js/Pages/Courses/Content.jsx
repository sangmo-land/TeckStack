import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { 
    ChevronDown, 
    ChevronRight, 
    PlayCircle, 
    Clock, 
    CheckCircle,
    Lock,
    Code,
    Copy,
    Check
} from 'lucide-react';

export default function CourseContent({ auth, course, chapters }) {
    const [expandedChapters, setExpandedChapters] = useState({});
    const [copiedSnippets, setCopiedSnippets] = useState({});

    console.log('CourseContent - Chapters:', chapters);
    console.log('CourseContent - Chapters length:', chapters?.length);

    const toggleChapter = (chapterId) => {
        setExpandedChapters(prev => ({
            ...prev,
            [chapterId]: !prev[chapterId]
        }));
    };

    const copyToClipboard = async (code, snippetId) => {
        try {
            await navigator.clipboard.writeText(code);
            setCopiedSnippets(prev => ({ ...prev, [snippetId]: true }));
            setTimeout(() => {
                setCopiedSnippets(prev => ({ ...prev, [snippetId]: false }));
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const renderChapters = (chaptersList, depth = 0) => {
        return chaptersList.map((chapter) => {
            const isExpanded = expandedChapters[chapter.id];
            const hasChildren = chapter.children && chapter.children.length > 0;
            const hasSnippets = chapter.code_snippets && chapter.code_snippets.length > 0;

            return (
                <div key={chapter.id} className="mb-2">
                    <div
                        className={`flex items-start space-x-3 p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-slate-600 transition-colors ${
                            depth > 0 ? 'ml-' + (depth * 8) : ''
                        }`}
                    >
                        {hasChildren && (
                            <button
                                onClick={() => toggleChapter(chapter.id)}
                                className="mt-1 text-slate-400 hover:text-white transition-colors"
                            >
                                {isExpanded ? (
                                    <ChevronDown className="w-5 h-5" />
                                ) : (
                                    <ChevronRight className="w-5 h-5" />
                                )}
                            </button>
                        )}

                        <div className="flex-shrink-0 mt-1">
                            {chapter.is_free || auth?.user ? (
                                <PlayCircle className="w-5 h-5 text-blue-400" />
                            ) : (
                                <Lock className="w-5 h-5 text-slate-600" />
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-3">
                                    <span className="text-sm font-mono text-blue-400">
                                        {chapter.full_number}
                                    </span>
                                    <h3 className="text-white font-medium">{chapter.title}</h3>
                                    {chapter.is_free && (
                                        <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
                                            Free
                                        </span>
                                    )}
                                </div>
                                {chapter.duration_minutes && (
                                    <div className="flex items-center space-x-1 text-slate-400 text-sm">
                                        <Clock className="w-4 h-4" />
                                        <span>{chapter.duration_minutes} min</span>
                                    </div>
                                )}
                            </div>

                            {chapter.description && (
                                <p className="text-slate-400 text-sm mb-3">{chapter.description}</p>
                            )}

                            {chapter.content && isExpanded && (
                                <div 
                                    className="prose prose-invert max-w-none text-slate-300 text-sm mb-4"
                                    dangerouslySetInnerHTML={{ __html: chapter.content }}
                                />
                            )}

                            {hasSnippets && isExpanded && (
                                <div className="space-y-3 mt-4">
                                    {chapter.code_snippets.map((snippet) => (
                                        <div key={snippet.id} className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
                                            <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-700">
                                                <div className="flex items-center space-x-3">
                                                    <Code className="w-4 h-4 text-blue-400" />
                                                    <span className="text-white font-medium text-sm">{snippet.title}</span>
                                                    <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded">
                                                        {snippet.language}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => copyToClipboard(snippet.code, snippet.id)}
                                                    className="flex items-center space-x-1 px-3 py-1 text-sm text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                                                >
                                                    {copiedSnippets[snippet.id] ? (
                                                        <>
                                                            <Check className="w-4 h-4" />
                                                            <span>Copied!</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Copy className="w-4 h-4" />
                                                            <span>Copy</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                            {snippet.description && (
                                                <div className="px-4 py-2 text-slate-400 text-sm border-b border-slate-700">
                                                    {snippet.description}
                                                </div>
                                            )}
                                            <pre className="p-4 overflow-x-auto">
                                                <code className="text-sm text-green-400 font-mono">
                                                    {snippet.code}
                                                </code>
                                            </pre>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {hasChildren && isExpanded && (
                        <div className="mt-2">
                            {renderChapters(chapter.children, depth + 1)}
                        </div>
                    )}
                </div>
            );
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <Navbar auth={auth} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                {/* Course Header */}
                <div className="mb-12">
                    <Link href="/courses" className="text-blue-400 hover:text-blue-300 text-sm mb-4 inline-block">
                        ← Back to Courses
                    </Link>
                    <h1 className="text-4xl font-bold text-white mb-4">{course.title}</h1>
                    <p className="text-xl text-slate-300 mb-6">{course.description}</p>
                    
                    <div className="flex flex-wrap gap-4">
                        <div className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg">
                            <span className="text-slate-400 text-sm">Category: </span>
                            <span className="text-white font-medium">{course.category}</span>
                        </div>
                        <div className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg">
                            <span className="text-slate-400 text-sm">Level: </span>
                            <span className="text-white font-medium capitalize">{course.level}</span>
                        </div>
                        <div className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg">
                            <span className="text-slate-400 text-sm">Price: </span>
                            <span className="text-white font-medium">${course.price}</span>
                        </div>
                    </div>
                </div>

                {/* Course Content */}
                <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-white mb-6">Course Content</h2>
                    {renderChapters(chapters)}
                </div>
            </div>
        </div>
    );
}

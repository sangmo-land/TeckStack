import React, { useState, useMemo, useEffect } from "react";
import { Link, Head, router } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
    ChevronDown,
    ChevronRight,
    PlayCircle,
    Clock,
    Lock,
    Code,
    Copy,
    Check,
    ArrowLeft,
    ArrowRight,
    FileText,
    Video,
    List,
    X,
    Menu,
} from "lucide-react";

// Code Snippet Component (Reused from Show.jsx)
function CodeSnippet({ snippet }) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(snippet.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const getLanguageColor = (lang) => {
        const colors = {
            mysql: "from-blue-500 to-cyan-500",
            sql: "from-blue-500 to-cyan-500",
            php: "from-purple-500 to-indigo-500",
            javascript: "from-yellow-500 to-orange-500",
            python: "from-green-500 to-emerald-500",
            java: "from-red-500 to-orange-500",
            css: "from-pink-500 to-purple-500",
            html: "from-orange-500 to-red-500",
        };
        return colors[lang?.toLowerCase()] || "from-slate-500 to-slate-600";
    };

    const getLanguageName = (lang) => {
        const langMap = {
            mysql: "sql",
            oracle: "sql",
            sql: "sql",
            javascript: "javascript",
            php: "php",
            python: "python",
            java: "java",
            css: "css",
            html: "markup",
            json: "json",
            bash: "bash",
            shell: "bash",
            plsql: "sql",
            tsql: "sql",
        };
        return langMap[lang?.toLowerCase()] || "text";
    };

    return (
        <div className="bg-slate-900/80 rounded-lg border border-slate-700/50 overflow-hidden mb-4">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-700/50">
                <div className="flex items-center gap-2">
                    <Code size={16} className="text-slate-400" />
                    <span className="text-sm font-medium text-slate-300">
                        {snippet.title}
                    </span>
                    <span
                        className={`px-2 py-0.5 text-xs rounded-full bg-gradient-to-r ${getLanguageColor(
                            snippet.language,
                        )} text-white font-medium`}
                    >
                        {snippet.language?.toUpperCase() || "CODE"}
                    </span>
                </div>
                <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700/50 hover:bg-slate-700 text-slate-300 text-sm rounded-md transition-colors"
                >
                    {copied ? (
                        <>
                            <Check size={14} className="text-green-400" />
                            <span className="text-green-400">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy size={14} />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>
            {snippet.description && (
                <div className="px-4 py-2 bg-slate-800/30 text-sm text-slate-400 border-b border-slate-700/30">
                    {snippet.description}
                </div>
            )}
            <div className="overflow-x-auto bg-slate-950/80">
                <SyntaxHighlighter
                    language={getLanguageName(snippet.language)}
                    style={vscDarkPlus}
                    customStyle={{
                        margin: 0,
                        padding: "1rem",
                        background: "rgba(15, 23, 42, 0.8)",
                        fontSize: "0.875rem",
                        lineHeight: "1.5",
                    }}
                    showLineNumbers={true}
                    wrapLines={true}
                    lineNumberStyle={{
                        color: "#64748b",
                        paddingRight: "1em",
                        userSelect: "none",
                    }}
                >
                    {snippet.code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}

export default function CourseContent({ auth, course, chapters }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [currentChapterId, setCurrentChapterId] = useState(null);
    const [expandedChapters, setExpandedChapters] = useState({});

    // Flatten chapters for linear navigation
    const flatChapters = useMemo(() => {
        const list = [];
        const walk = (nodes = []) => {
            nodes.forEach((node) => {
                list.push(node);
                if (node.children && node.children.length) {
                    walk(node.children);
                }
            });
        };
        walk(chapters || []);
        return list;
    }, [chapters]);

    // Initialize from URL param
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const chapterIdParam = params.get("chapter");

        if (chapterIdParam) {
            setCurrentChapterId(Number(chapterIdParam));
        } else if (flatChapters.length > 0) {
            // Default to first chapter if none specified
            // setCurrentChapterId(flatChapters[0].id);
        }
    }, [flatChapters]);

    // Update URL when chapter changes without reloading
    const selectChapter = (id) => {
        setCurrentChapterId(id);
        const url = new URL(window.location.href);
        url.searchParams.set("chapter", id);
        window.history.pushState({}, "", url);

        // On mobile, close sidebar after selection
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    };

    const currentChapter = useMemo(
        () => flatChapters.find((c) => c.id === currentChapterId),
        [flatChapters, currentChapterId],
    );

    const currentChapterIndex = currentChapter
        ? flatChapters.findIndex((c) => c.id === currentChapter.id)
        : -1;

    const previousChapter =
        currentChapterIndex > 0 ? flatChapters[currentChapterIndex - 1] : null;
    const nextChapter =
        currentChapterIndex >= 0 &&
        currentChapterIndex < flatChapters.length - 1
            ? flatChapters[currentChapterIndex + 1]
            : null;

    const toggleAccordion = (id) => {
        setExpandedChapters((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    // Render Sidebar Item
    const renderSidebarItem = (chapter, depth = 0) => {
        const hasChildren = chapter.children && chapter.children.length > 0;
        const isActive = currentChapterId === chapter.id;
        const isExpanded =
            expandedChapters[chapter.id] ||
            isActive ||
            (hasChildren &&
                chapter.children.some((c) => c.id === currentChapterId));

        return (
            <div key={chapter.id} className="mb-1">
                <div
                    className={`
                        flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 group
                        ${isActive ? "bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]" : "text-slate-400 hover:bg-slate-800/50 hover:text-white border border-transparent"}
                        ${depth > 0 ? "ml-4" : ""}
                    `}
                    onClick={(e) => {
                        if (hasChildren) {
                            toggleAccordion(chapter.id);
                            selectChapter(chapter.id);
                        } else {
                            selectChapter(chapter.id);
                        }
                    }}
                >
                    {hasChildren && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleAccordion(chapter.id);
                            }}
                            className={`p-1 rounded-full transition-colors ${isActive ? "bg-blue-500/20 text-blue-400" : "hover:bg-slate-700 text-slate-500 group-hover:text-slate-300"}`}
                        >
                            {isExpanded ? (
                                <ChevronDown size={14} />
                            ) : (
                                <ChevronRight size={14} />
                            )}
                        </button>
                    )}

                    <div className="flex-1 text-sm font-medium whitespace-nowrap flex gap-2 items-center">
                        <span
                            className={`font-mono text-xs opacity-60 ${isActive ? "text-blue-400" : "text-slate-500"}`}
                        >
                            {chapter.full_number}
                        </span>
                        <span>{chapter.title}</span>
                    </div>

                    {chapter.is_free && (
                        <span className="text-[10px] bg-green-500/20 text-green-400 px-1 rounded">
                            Free
                        </span>
                    )}
                    {!chapter.is_free && !auth.user && <Lock size={12} />}
                </div>

                {hasChildren && isExpanded && (
                    <div className="mt-1 border-l border-slate-800 ml-2 pl-2">
                        {chapter.children.map((child) =>
                            renderSidebarItem(child, depth + 1),
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="h-[100dvh] w-full bg-slate-950 flex flex-col overflow-hidden">
            <Head
                title={`${currentChapter ? currentChapter.title : "Course Content"} - ${course.title}`}
            />

            {/* Top Bar */}
            <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="flex items-center gap-2 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        <span className="font-medium text-sm">
                            Course Content
                        </span>
                    </button>

                    <Link
                        href={`/courses/${course.slug}`}
                        className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={18} />
                        <span className="hidden sm:inline font-medium text-sm">
                            Back to Course Info
                        </span>
                    </Link>

                    <div className="h-6 w-px bg-slate-800 mx-2" />

                    <h1 className="text-white font-bold truncate max-w-xs sm:max-w-md">
                        {course.title}
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    {/* Progress or User Menu could go here */}
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar Navigation */}
                <aside
                    className={`
                        fixed inset-y-16 left-0 z-40 w-80 bg-slate-900/95 backdrop-blur-sm border-r border-slate-800 transform transition-transform duration-300 ease-in-out overflow-auto
                        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                        lg:relative lg:inset-auto lg:translate-x-0 lg:block
                        ${!isSidebarOpen && "lg:hidden"} 
                    `}
                >
                    <div className="p-4">
                        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                            Course Content
                        </h3>
                        {chapters.map((chapter) => renderSidebarItem(chapter))}
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-950 p-4 lg:p-8 relative w-full">
                    {!currentChapter ? (
                        <div className="max-w-3xl mx-auto text-center py-20">
                            <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 inline-block mb-6">
                                <PlayCircle
                                    size={48}
                                    className="text-blue-500 mx-auto mb-4"
                                />
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    Select a chapter to start learning
                                </h2>
                                <p className="text-slate-400">
                                    Choose a section from the sidebar to view
                                    its content.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-4xl mx-auto">
                            {/* Chapter Header */}
                            <div className="mb-8">
                                <div className="flex items-center gap-3 text-blue-400 font-mono text-sm mb-4">
                                    <span className="px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]">
                                        Chapter {currentChapter.full_number}
                                    </span>
                                    {currentChapter.duration_minutes && (
                                        <span className="flex items-center gap-1.5 text-slate-400">
                                            <Clock size={14} />
                                            {
                                                currentChapter.duration_minutes
                                            }{" "}
                                            min read
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-8 tracking-tight leading-tight break-words">
                                    {currentChapter.title}
                                </h1>
                            </div>

                            {/* Content Block */}
                            <div className="space-y-12">
                                {currentChapter.description && (
                                    <div className="text-slate-300 text-2xl leading-relaxed font-light border-l-4 border-blue-500/50 pl-6 py-4 bg-gradient-to-r from-blue-900/10 to-transparent rounded-r-lg">
                                        {currentChapter.description}
                                    </div>
                                )}

                                {currentChapter.video_url && (
                                    <div className="relative group">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                                        <div className="relative bg-black rounded-xl overflow-hidden border border-slate-800 shadow-2xl ring-1 ring-white/10">
                                            <div className="aspect-video w-full">
                                                <iframe
                                                    src={
                                                        currentChapter.video_url
                                                    }
                                                    className="w-full h-full"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {currentChapter.content && (
                                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 lg:p-12 text-slate-300 shadow-xl ring-1 ring-white/5 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                                        <div
                                            className="relative prose prose-xl md:prose-2xl prose-invert prose-slate max-w-none 
                                            prose-p:text-slate-300 prose-p:leading-loose prose-headings:text-slate-100 prose-headings:font-bold 
                                            prose-li:text-slate-300 prose-strong:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300 
                                            prose-code:text-blue-200 prose-code:bg-blue-900/30 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                                            prose-blockquote:border-l-blue-500 prose-blockquote:bg-slate-800/50 prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:rounded-r-lg prose-blockquote:not-italic"
                                            dangerouslySetInnerHTML={{
                                                __html: currentChapter.content,
                                            }}
                                        />
                                    </div>
                                )}

                                {currentChapter.code_snippets &&
                                    currentChapter.code_snippets.length > 0 && (
                                        <div className="space-y-4">
                                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                                <Code className="text-blue-400" />
                                                Code Snippets
                                            </h3>
                                            {currentChapter.code_snippets.map(
                                                (snippet) => (
                                                    <CodeSnippet
                                                        key={snippet.id}
                                                        snippet={snippet}
                                                    />
                                                ),
                                            )}
                                        </div>
                                    )}
                            </div>

                            {/* Navigation Footer */}
                            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-800">
                                <button
                                    onClick={() =>
                                        previousChapter &&
                                        selectChapter(previousChapter.id)
                                    }
                                    disabled={!previousChapter}
                                    className={`
                                        w-full sm:w-auto justify-between sm:justify-start
                                        group flex items-center gap-4 px-6 py-4 rounded-xl font-medium transition-all duration-300 border
                                        ${
                                            previousChapter
                                                ? "text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-800 border-slate-700 hover:border-slate-600 hover:shadow-lg hover:-translate-y-0.5"
                                                : "text-slate-600 bg-slate-900 border-slate-800 cursor-not-allowed opacity-50"
                                        }
                                    `}
                                >
                                    <div
                                        className={`p-2 rounded-full ${previousChapter ? "bg-slate-700 group-hover:bg-slate-600" : "bg-slate-800"}`}
                                    >
                                        <ArrowLeft size={20} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                                            Previous Lesson
                                        </div>
                                        <div className="text-sm font-medium text-slate-300 group-hover:text-blue-400 transition-colors">
                                            {previousChapter?.title || "None"}
                                        </div>
                                    </div>
                                </button>

                                <button
                                    onClick={() =>
                                        nextChapter &&
                                        selectChapter(nextChapter.id)
                                    }
                                    disabled={!nextChapter}
                                    className={`
                                        w-full sm:w-auto justify-between sm:justify-end
                                        group flex items-center gap-4 px-6 py-4 rounded-xl font-medium transition-all duration-300 border
                                        ${
                                            nextChapter
                                                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:-translate-y-0.5"
                                                : "bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed opacity-50"
                                        }
                                    `}
                                >
                                    <div className="text-right">
                                        <div className="text-xs text-blue-200 uppercase tracking-wider mb-1">
                                            Next Lesson
                                        </div>
                                        <div className="text-sm font-bold">
                                            {nextChapter?.title || "Completed"}
                                        </div>
                                    </div>
                                    <div
                                        className={`p-2 rounded-full ${nextChapter ? "bg-white/20" : "bg-slate-700"}`}
                                    >
                                        <ArrowRight size={20} />
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

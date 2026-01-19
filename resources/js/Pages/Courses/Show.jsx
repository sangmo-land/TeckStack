import React, { useEffect, useMemo, useState } from 'react';
import { usePage, Link, useForm, Head, router } from '@inertiajs/react';
import {
    Star,
    Users,
    Clock,
    Heart,
    ShoppingCart,
    CheckCircle,
    ChevronDown,
    BookOpen,
    Award,
    Globe,
    Video,
    FileText,
    HelpCircle,
    Play,
    Code,
    Copy,
    Check,
    ExternalLink,
    X,
    ArrowLeft,
    ArrowRight,
    Twitter,
    Linkedin,
    Edit,
} from "lucide-react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// Code Snippet Component
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

    // Map language names to syntax highlighter compatible names
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
        <div className="bg-slate-900/80 rounded-lg border border-slate-700/50 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-700/50">
                <div className="flex items-center gap-2">
                    <Code size={16} className="text-slate-400" />
                    <span className="text-sm font-medium text-slate-300">
                        {snippet.title}
                    </span>
                    <span
                        className={`px-2 py-0.5 text-xs rounded-full bg-gradient-to-r ${getLanguageColor(
                            snippet.language
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

// Remove a single wrapping <p>...</p> pair from content strings
const stripWrappingParagraph = (content = "") => {
    const trimmed = content.trim();
    if (trimmed.startsWith("<p>") && trimmed.endsWith("</p>")) {
        return trimmed.slice(3, -4).trim();
    }
    return trimmed;
};

// Recursive Chapter Component
function ChapterItem({
    chapter,
    level = 1,
    index = 0,
    onOpenChapter,
    showCodeSnippets = true,
}) {
    const hasChildren = chapter.children && chapter.children.length > 0;
    const hasSnippets =
        chapter.code_snippets && chapter.code_snippets.length > 0;

    // Different styling based on level
    const getLevelStyles = () => {
        switch (level) {
            case 1:
                return {
                    container:
                        "bg-slate-900/50 border border-slate-700/50 rounded-xl overflow-hidden hover:border-purple-500/30",
                    summary: "p-5 cursor-pointer hover:bg-slate-700/30",
                    badge: "w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 text-white font-bold text-sm",
                    title: "font-bold text-white text-lg",
                    content: "bg-slate-950/50 border-t border-slate-700/50",
                };
            case 2:
                return {
                    container: "bg-slate-800/30 border-l-2 border-slate-700/50",
                    summary: "px-5 py-4 cursor-pointer hover:bg-slate-700/20",
                    badge: "w-8 h-8 rounded-lg bg-slate-800 text-slate-400 text-xs",
                    title: "text-slate-300 font-medium",
                    content: "bg-slate-900/30 border-t border-slate-700/30",
                };
            default:
                return {
                    container: "bg-slate-800/20 border-l-2 border-slate-600/30",
                    summary: `px-${
                        4 + level
                    } py-3 cursor-pointer hover:bg-slate-700/10`,
                    badge: "w-7 h-7 rounded bg-slate-700 text-slate-400 text-xs",
                    title: "text-slate-400 text-sm",
                    content: "bg-slate-900/20 border-t border-slate-600/20",
                };
        }
    };

    const styles = getLevelStyles();

    // Leaf node without children but might have snippets
    if (!hasChildren) {
        return (
            <div className="bg-slate-800/20">
                <div
                    className={`flex items-center gap-4 ${styles.summary} transition-colors`}
                    onClick={() => onOpenChapter?.(chapter.id, "modal")}
                >
                    <div
                        className={`${styles.badge} flex items-center justify-center`}
                    >
                        {chapter.full_number}
                    </div>
                    <div className="flex-1 flex items-center gap-3">
                        <Play size={16} className="text-blue-400" />
                        <span className={styles.title}>{chapter.title}</span>
                        {chapter.is_free && (
                            <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
                                Free
                            </span>
                        )}
                        {hasSnippets && (
                            <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full flex items-center gap-1">
                                <Code size={12} />
                                {chapter.code_snippets.length}
                            </span>
                        )}
                    </div>
                    {chapter.duration_minutes && (
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Clock size={14} />
                            <span>{chapter.duration_minutes} min</span>
                        </div>
                    )}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onOpenChapter?.(chapter.id, "window");
                        }}
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs text-blue-300 bg-blue-500/10 border border-blue-400/30 rounded-md hover:bg-blue-500/20"
                    >
                        <ExternalLink size={14} />
                        New tab
                    </button>
                </div>
                {hasSnippets && (
                    <div className="px-5 py-4 space-y-3 bg-slate-950/30">
                        {showCodeSnippets &&
                            chapter.code_snippets.map((snippet) => (
                                <CodeSnippet
                                    key={snippet.id}
                                    snippet={snippet}
                                />
                            ))}
                    </div>
                )}
            </div>
        );
    }

    // Parent node with children - use details/summary
    return (
        <details
            className={`group ${styles.container} transition-all duration-300`}
        >
            <summary
                className={`${styles.summary} transition-colors flex items-center justify-between list-none [&::-webkit-details-marker]:hidden`}
            >
                <div className="flex items-center gap-4">
                    <div
                        className={`${styles.badge} flex items-center justify-center`}
                    >
                        {chapter.full_number || index + 1}
                    </div>
                    <div>
                        <h3 className={styles.title}>{chapter.title}</h3>
                        <p className="text-sm text-slate-400 mt-1">
                            {chapter.children?.length || 0} sections
                            {chapter.duration_minutes &&
                                ` • ${chapter.duration_minutes} min`}
                            {hasSnippets &&
                                ` • ${chapter.code_snippets.length} code snippets`}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onOpenChapter?.(chapter.id, "window");
                        }}
                        className="p-2 text-slate-300 hover:text-white rounded-md hover:bg-slate-700/60"
                    >
                        <ExternalLink size={16} />
                    </button>
                    <ChevronDown
                        className="text-slate-400 group-open:rotate-180 transition-transform duration-300"
                        size={20}
                    />
                </div>
            </summary>
            <div className={styles.content}>
                {hasSnippets && (
                    <div className="px-5 py-4 space-y-3 bg-slate-950/50 border-b border-slate-700/30">
                        {showCodeSnippets &&
                            chapter.code_snippets.map((snippet) => (
                                <CodeSnippet
                                    key={snippet.id}
                                    snippet={snippet}
                                />
                            ))}
                    </div>
                )}
                <div className="divide-y divide-slate-700/30">
                    {chapter.children.map((child, idx) => (
                        <ChapterItem
                            key={child.id}
                            chapter={child}
                            level={level + 1}
                            index={idx}
                            onOpenChapter={onOpenChapter}
                            showCodeSnippets={showCodeSnippets}
                        />
                    ))}
                </div>
            </div>
        </details>
    );
}

export default function CourseShow({
    course,
    isEnrolled,
    isWishlisted,
    userReview,
    reviews,
}) {
    const { auth } = usePage().props;
    const [showReviews, setShowReviews] = useState(false);
    const [showCodeSnippets, setShowCodeSnippets] = useState(true);
    const [rating, setRating] = useState(userReview?.rating || 0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [reviewForm, setReviewForm] = useState({
        title: userReview?.title || "",
        content: userReview?.content || "",
        rating: userReview?.rating || 0,
    });

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
        walk(course.root_chapters || []);
        return list;
    }, [course.root_chapters]);

    const [selectedChapterId, setSelectedChapterId] = useState(null);
    const [isContentModalOpen, setIsContentModalOpen] = useState(false);

    const selectedChapter = useMemo(
        () => flatChapters.find((c) => c.id === selectedChapterId) || null,
        [flatChapters, selectedChapterId],
    );

    const currentChapterIndex = selectedChapter
        ? flatChapters.findIndex((c) => c.id === selectedChapter.id)
        : -1;
    const previousChapter =
        currentChapterIndex > 0 ? flatChapters[currentChapterIndex - 1] : null;
    const nextChapter =
        currentChapterIndex >= 0 &&
        currentChapterIndex < flatChapters.length - 1
            ? flatChapters[currentChapterIndex + 1]
            : null;

    const openChapter = (chapterId, mode = "modal") => {
        const target = flatChapters.find((c) => c.id === chapterId);
        if (!target) return;

        // Always open in new window/tab pointing to the content page
        const contentUrl = `/courses/${course.slug}/content?chapter=${chapterId}`;
        window.open(contentUrl, "_blank");
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const chapterIdParam = params.get("chapter");
        if (!chapterIdParam || !flatChapters.length) return;

        const numericId = Number(chapterIdParam);
        const target = flatChapters.find(
            (c) =>
                c.id === (Number.isNaN(numericId) ? chapterIdParam : numericId),
        );
        if (target) {
            setSelectedChapterId(target.id);
            setIsContentModalOpen(true);
        }
    }, [flatChapters]);

    const handleEnroll = () => {
        if (!auth.user) {
            router.visit("/login");
            return;
        }

        router.post(
            `/courses/${course.slug}/enroll`,
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    // Optionally show a success message
                },
                onError: (errors) => {
                    console.error("Error enrolling:", errors);
                },
            },
        );
    };

    const handleWishlist = () => {
        if (!auth.user) {
            router.visit("/login");
            return;
        }

        router.post(
            `/courses/${course.slug}/wishlist`,
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    // Optionally show a success message
                },
                onError: (errors) => {
                    console.error("Error toggling wishlist:", errors);
                },
            },
        );
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();

        router.post(
            `/courses/${course.slug}/reviews`,
            {
                ...reviewForm,
                update: !!userReview,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    // Optionally show a success message
                },
                onError: (errors) => {
                    console.error("Error submitting review:", errors);
                },
            },
        );
    };

    // Resolve instructor image URL (prefers InstructorProfile.avatar_url, falls back to User.avatar_url or Instructor.image)
    const getInstructorImageUrl = () => {
        const raw =
            course?.instructor?.instructorProfile?.avatar_url ||
            course?.instructor?.avatar_url ||
            course?.instructor?.image ||
            "";
        if (!raw) return "";
        // Absolute or already storage-prefixed
        if (raw.startsWith("http")) return raw;
        if (raw.startsWith("/storage/")) return raw;
        if (raw.startsWith("storage/")) return `/${raw}`;
        // If value already contains instructor-images folder
        if (raw.includes("instructor-images/")) {
            const cleaned = raw.replace(/^\/?storage\//, "");
            return `/storage/${cleaned}`;
        }
        // Assume it's a filename within instructor-images
        const filename = raw.replace(/^\/+/, "");
        return `/storage/instructor-images/${filename}`;
    };

    const titleSafe = String(course?.title || "Course");
    const descSafe = String(course?.description || "");
    const slugSafe = String(course?.slug || "");

    return (
        <>
            <Head title={`${titleSafe} — NelnadoSolutions`} />
            {/* JSON-LD structured data moved out of Head to avoid Inertia Head tag limitations */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Course",
                        name: titleSafe,
                        description: descSafe,
                        provider: {
                            "@type": "Organization",
                            name: "NelnadoSolutions",
                        },
                        inLanguage: course?.language || "en",
                        offers: {
                            "@type": "Offer",
                            price: Number(course?.price || 0),
                            priceCurrency: "USD",
                            availability: "https://schema.org/InStock",
                        },
                    }),
                }}
            />
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                <Navbar auth={auth} />
                {/* Hero Banner with Parallax Effect */}
                <section
                    className="relative h-[500px] bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 overflow-hidden bg-cover bg-center"
                    style={
                        course.cover_image
                            ? {
                                  backgroundImage: `url('${
                                      course.cover_image &&
                                      (course.cover_image.startsWith("http") ||
                                          course.cover_image.startsWith(
                                              "/storage/",
                                          ))
                                          ? course.cover_image
                                          : `/storage/${course.cover_image}`
                                  }')`,
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                              }
                            : {}
                    }
                >
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage:
                                    "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                                backgroundSize: "40px 40px",
                            }}
                        />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/60 to-slate-950" />

                    {/* Floating decorative elements */}
                    <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000" />

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                        <div className="flex-1 py-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full mb-4">
                                <BookOpen size={16} className="text-blue-300" />
                                <span className="text-blue-200 text-sm font-semibold uppercase tracking-wide">
                                    {course.category}
                                </span>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                                <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                                    {course.title}
                                </h1>
                                {(auth.user?.role === "admin" ||
                                    auth.user?.id === course.instructor_id) && (
                                    <Link
                                        href={`/dashboard/courses/${course.id}/edit`}
                                        className="inline-flex max-w-fit items-center gap-2 px-4 py-2 bg-slate-800/80 hover:bg-slate-700 text-white rounded-lg border border-slate-600 transition-colors"
                                    >
                                        <Edit size={18} />
                                        <span>Edit Course</span>
                                    </Link>
                                )}
                            </div>

                            <p className="text-xl text-slate-200 mb-8 max-w-3xl leading-relaxed">
                                {course.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-6 text-slate-100">
                                <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-700/50">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={18}
                                                className={
                                                    i <
                                                    Math.floor(
                                                        parseFloat(
                                                            course.rating,
                                                        ) || 0,
                                                    )
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "fill-slate-600 text-slate-600"
                                                }
                                            />
                                        ))}
                                    </div>
                                    <span className="font-semibold">
                                        {parseFloat(course.rating || 0).toFixed(
                                            1,
                                        )}
                                    </span>
                                    <span className="text-slate-300">
                                        ({reviews.total} reviews)
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-700/50">
                                    <Users
                                        size={18}
                                        className="text-blue-400"
                                    />
                                    <span className="font-semibold">
                                        {course.total_students.toLocaleString()}
                                    </span>
                                    <span className="text-slate-300">
                                        students enrolled
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-700/50">
                                    <Globe
                                        size={18}
                                        className="text-green-400"
                                    />
                                    <span className="font-semibold capitalize">
                                        {course.language}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-700/40 flex items-center justify-center border border-slate-700/50">
                                        {getInstructorImageUrl() && (
                                            <img
                                                src={getInstructorImageUrl()}
                                                alt={course.instructor.name}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">
                                            Created by
                                        </p>
                                        <p className="text-white font-semibold">
                                            {course.instructor.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* About Section with enhanced styling */}
                            <section className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-blue-500/10 rounded-lg">
                                        <BookOpen
                                            className="text-blue-400"
                                            size={24}
                                        />
                                    </div>
                                    <h2 className="text-3xl font-bold text-white">
                                        About This Course
                                    </h2>
                                </div>
                                <p className="text-slate-300 text-lg leading-relaxed">
                                    {course.overview}
                                </p>
                            </section>

                            {/* What You'll Learn - Enhanced Grid */}
                            {course.learning_outcomes && (
                                <section className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="p-3 bg-green-500/10 rounded-lg">
                                            <CheckCircle
                                                className="text-green-400"
                                                size={24}
                                            />
                                        </div>
                                        <h2 className="text-3xl font-bold text-white">
                                            What You'll Learn
                                        </h2>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {course.learning_outcomes.map(
                                            (outcome, idx) => (
                                                <div
                                                    key={idx}
                                                    className="group flex gap-3 p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10"
                                                >
                                                    <CheckCircle
                                                        className="text-green-400 flex-shrink-0 group-hover:scale-110 transition-transform"
                                                        size={20}
                                                    />
                                                    <span className="text-slate-300 group-hover:text-slate-100 transition-colors">
                                                        {outcome}
                                                    </span>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </section>
                            )}

                            {/* Requirements Section */}
                            {course.requirements &&
                                course.requirements.length > 0 && (
                                    <section className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-3 bg-orange-500/10 rounded-lg">
                                                <HelpCircle
                                                    className="text-orange-400"
                                                    size={24}
                                                />
                                            </div>
                                            <h2 className="text-3xl font-bold text-white">
                                                Requirements
                                            </h2>
                                        </div>
                                        <ul className="space-y-3">
                                            {course.requirements.map(
                                                (req, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="flex gap-3 text-slate-300"
                                                    >
                                                        <span className="text-orange-400">
                                                            ▸
                                                        </span>
                                                        <span>{req}</span>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </section>
                                )}

                            {/* Course Content - Enhanced Accordion */}
                            <section className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-purple-500/10 rounded-lg">
                                            <Video
                                                className="text-purple-400"
                                                size={24}
                                            />
                                        </div>
                                        <h2 className="text-3xl font-bold text-white">
                                            Course Content
                                        </h2>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() =>
                                                setShowCodeSnippets(
                                                    !showCodeSnippets,
                                                )
                                            }
                                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                                                showCodeSnippets
                                                    ? "bg-blue-500/20 border border-blue-400/30 text-blue-300 hover:bg-blue-500/30"
                                                    : "bg-slate-700/50 border border-slate-600 text-slate-300 hover:bg-slate-700"
                                            }`}
                                        >
                                            {showCodeSnippets ? "Hide" : "Show"}{" "}
                                            Code Snippets
                                        </button>
                                        <div className="text-sm text-slate-400">
                                            {course.root_chapters?.length || 0}{" "}
                                            chapters
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {course.root_chapters?.map(
                                        (chapter, idx) => (
                                            <ChapterItem
                                                key={chapter.id}
                                                chapter={chapter}
                                                level={1}
                                                index={idx}
                                                onOpenChapter={openChapter}
                                                showCodeSnippets={
                                                    showCodeSnippets
                                                }
                                            />
                                        ),
                                    )}
                                </div>
                            </section>

                            {/* Instructor Info - Enhanced Card */}
                            <section className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-3 bg-indigo-500/10 rounded-lg">
                                        <Users
                                            className="text-indigo-400"
                                            size={24}
                                        />
                                    </div>
                                    <h2 className="text-3xl font-bold text-white">
                                        Your Instructor
                                    </h2>
                                </div>
                                <div className="flex flex-col md:flex-row gap-6">
                                    <div className="w-32 h-32 rounded-2xl overflow-hidden bg-slate-700/40 flex-shrink-0 flex items-center justify-center shadow-lg border border-slate-700/50">
                                        {getInstructorImageUrl() && (
                                            <img
                                                src={getInstructorImageUrl()}
                                                alt={course.instructor.name}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-white mb-1">
                                            {course.instructor.name}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-3 mb-4 text-slate-300 text-sm">
                                            {course.instructor.role && (
                                                <span className="inline-flex items-center gap-2 px-2 py-1 bg-slate-900/50 border border-slate-700/50 rounded">
                                                    <Users
                                                        size={14}
                                                        className="text-slate-400"
                                                    />
                                                    {course.instructor.role
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        course.instructor.role.slice(
                                                            1,
                                                        )}
                                                </span>
                                            )}
                                            {course.instructor.email && (
                                                <span className="inline-flex items-center gap-2 px-2 py-1 bg-slate-900/50 border border-slate-700/50 rounded">
                                                    <Globe
                                                        size={14}
                                                        className="text-slate-400"
                                                    />
                                                    {course.instructor.email}
                                                </span>
                                            )}
                                            {course.instructor.created_at && (
                                                <span className="inline-flex items-center gap-2 px-2 py-1 bg-slate-900/50 border border-slate-700/50 rounded">
                                                    <Clock
                                                        size={14}
                                                        className="text-slate-400"
                                                    />
                                                    Member since{" "}
                                                    {new Date(
                                                        course.instructor
                                                            .created_at,
                                                    ).getFullYear()}
                                                </span>
                                            )}
                                        </div>
                                        {course.instructor
                                            .instructorProfile && (
                                            <>
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {course.instructor.instructorProfile.expertise?.map(
                                                        (exp, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm rounded-full"
                                                            >
                                                                {exp}
                                                            </span>
                                                        ),
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    {course.instructor
                                                        .instructorProfile
                                                        .is_verified && (
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-green-500/20 text-green-300 border border-green-400/30">
                                                            <CheckCircle
                                                                size={14}
                                                                className="text-green-300"
                                                            />
                                                            Verified Instructor
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-slate-300 mb-6 leading-relaxed">
                                                    {
                                                        course.instructor
                                                            .instructorProfile
                                                            .bio
                                                    }
                                                </p>
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                                                        <p className="text-sm text-slate-400 mb-1">
                                                            Total Students
                                                        </p>
                                                        <p className="text-2xl font-bold text-white">
                                                            {course.instructor.instructorProfile.total_students?.toLocaleString() ||
                                                                0}
                                                        </p>
                                                    </div>
                                                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                                                        <p className="text-sm text-slate-400 mb-1">
                                                            Courses
                                                        </p>
                                                        <p className="text-2xl font-bold text-white">
                                                            {course.instructor
                                                                .instructorProfile
                                                                .total_courses ||
                                                                0}
                                                        </p>
                                                    </div>
                                                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                                                        <p className="text-sm text-slate-400 mb-1">
                                                            Rating
                                                        </p>
                                                        <div className="flex items-center gap-2">
                                                            <Star
                                                                size={18}
                                                                className="fill-yellow-400 text-yellow-400"
                                                            />
                                                            <p className="text-2xl font-bold text-white">
                                                                {course
                                                                    .instructor
                                                                    .instructorProfile
                                                                    .average_rating ||
                                                                    parseFloat(
                                                                        course.rating ||
                                                                            0,
                                                                    ).toFixed(
                                                                        1,
                                                                    )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                {(course.instructor
                                                    .instructorProfile
                                                    .website ||
                                                    course.instructor
                                                        .instructorProfile
                                                        .linkedin_url ||
                                                    course.instructor
                                                        .instructorProfile
                                                        .twitter_url) && (
                                                    <div className="mt-6 flex items-center gap-3">
                                                        {course.instructor
                                                            .instructorProfile
                                                            .website && (
                                                            <a
                                                                href={
                                                                    course
                                                                        .instructor
                                                                        .instructorProfile
                                                                        .website
                                                                }
                                                                target="_blank"
                                                                rel="noopener"
                                                                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-slate-900/50 border border-slate-700/50 rounded-md text-slate-300 hover:text-white hover:border-slate-600"
                                                            >
                                                                <Globe
                                                                    size={16}
                                                                />
                                                                Website
                                                            </a>
                                                        )}
                                                        {course.instructor
                                                            .instructorProfile
                                                            .linkedin_url && (
                                                            <a
                                                                href={
                                                                    course
                                                                        .instructor
                                                                        .instructorProfile
                                                                        .linkedin_url
                                                                }
                                                                target="_blank"
                                                                rel="noopener"
                                                                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-slate-900/50 border border-slate-700/50 rounded-md text-slate-300 hover:text-white hover:border-slate-600"
                                                            >
                                                                <Linkedin
                                                                    size={16}
                                                                />
                                                                LinkedIn
                                                            </a>
                                                        )}
                                                        {course.instructor
                                                            .instructorProfile
                                                            .twitter_url && (
                                                            <a
                                                                href={
                                                                    course
                                                                        .instructor
                                                                        .instructorProfile
                                                                        .twitter_url
                                                                }
                                                                target="_blank"
                                                                rel="noopener"
                                                                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-slate-900/50 border border-slate-700/50 rounded-md text-slate-300 hover:text-white hover:border-slate-600"
                                                            >
                                                                <Twitter
                                                                    size={16}
                                                                />
                                                                Twitter
                                                            </a>
                                                        )}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                        {!course.instructor
                                            .instructorProfile && (
                                            <div className="text-slate-300">
                                                <p className="mb-4">
                                                    This instructor hasn’t added
                                                    a public profile yet. You
                                                    can still explore their
                                                    courses and reviews.
                                                </p>
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                                                        <p className="text-sm text-slate-400 mb-1">
                                                            Course Rating
                                                        </p>
                                                        <div className="flex items-center gap-2">
                                                            <Star
                                                                size={18}
                                                                className="fill-yellow-400 text-yellow-400"
                                                            />
                                                            <p className="text-2xl font-bold text-white">
                                                                {parseFloat(
                                                                    course.rating ||
                                                                        0,
                                                                ).toFixed(1)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                                                        <p className="text-sm text-slate-400 mb-1">
                                                            Students
                                                        </p>
                                                        <p className="text-2xl font-bold text-white">
                                                            {course.total_students?.toLocaleString?.() ||
                                                                course.total_students ||
                                                                0}
                                                        </p>
                                                    </div>
                                                    <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
                                                        <p className="text-sm text-slate-400 mb-1">
                                                            Language
                                                        </p>
                                                        <p className="text-2xl font-bold text-white capitalize">
                                                            {course.language ||
                                                                "en"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </section>

                            {/* Reviews Section - Enhanced */}
                            <section className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-3 bg-yellow-500/10 rounded-lg">
                                        <Star
                                            className="text-yellow-400"
                                            size={24}
                                        />
                                    </div>
                                    <h2 className="text-3xl font-bold text-white">
                                        Student Reviews
                                    </h2>
                                </div>

                                {isEnrolled && (
                                    <form
                                        onSubmit={handleReviewSubmit}
                                        className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6 mb-8"
                                    >
                                        <h3 className="font-bold text-white text-lg mb-6">
                                            {userReview
                                                ? "Update Your Review"
                                                : "Share Your Experience"}
                                        </h3>

                                        <div className="mb-6">
                                            <label className="block text-slate-300 mb-3 font-semibold">
                                                Your Rating
                                            </label>
                                            <div className="flex gap-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() =>
                                                            setReviewForm({
                                                                ...reviewForm,
                                                                rating: star,
                                                            })
                                                        }
                                                        onMouseEnter={() =>
                                                            setHoveredRating(
                                                                star,
                                                            )
                                                        }
                                                        onMouseLeave={() =>
                                                            setHoveredRating(0)
                                                        }
                                                        className="transition-all hover:scale-110"
                                                    >
                                                        <Star
                                                            size={36}
                                                            className={
                                                                star <=
                                                                (hoveredRating ||
                                                                    reviewForm.rating)
                                                                    ? "fill-yellow-400 text-yellow-400"
                                                                    : "text-slate-600 hover:text-slate-500"
                                                            }
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <input
                                            type="text"
                                            placeholder="Give your review a title"
                                            value={reviewForm.title}
                                            onChange={(e) =>
                                                setReviewForm({
                                                    ...reviewForm,
                                                    title: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 mb-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                                            required
                                        />

                                        <textarea
                                            placeholder="Share your thoughts about this course... What did you like? What could be improved?"
                                            value={reviewForm.content}
                                            onChange={(e) =>
                                                setReviewForm({
                                                    ...reviewForm,
                                                    content: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 mb-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 h-32 resize-none transition-all"
                                            required
                                        />

                                        <button
                                            type="submit"
                                            className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                        >
                                            {userReview
                                                ? "Update Review"
                                                : "Submit Review"}
                                        </button>
                                    </form>
                                )}

                                {reviews.data.length > 0 ? (
                                    <div className="space-y-4">
                                        {reviews.data.map((review) => (
                                            <div
                                                key={review.id}
                                                className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-6 hover:border-slate-600/50 transition-colors"
                                            >
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                                            {review.user.name.charAt(
                                                                0,
                                                            )}
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-white text-lg">
                                                                {review.title}
                                                            </h4>
                                                            <p className="text-sm text-slate-400">
                                                                {
                                                                    review.user
                                                                        .name
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        {[...Array(5)].map(
                                                            (_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    size={16}
                                                                    className={
                                                                        i <
                                                                        review.rating
                                                                            ? "fill-yellow-400 text-yellow-400"
                                                                            : "text-slate-700"
                                                                    }
                                                                />
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="text-slate-300 leading-relaxed">
                                                    {review.content}
                                                </p>
                                                <p className="text-xs text-slate-500 mt-3">
                                                    {new Date(
                                                        review.created_at,
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        },
                                                    )}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <Star
                                            size={48}
                                            className="text-slate-700 mx-auto mb-4"
                                        />
                                        <p className="text-slate-400 text-lg">
                                            No reviews yet. Be the first to
                                            share your thoughts!
                                        </p>
                                    </div>
                                )}
                            </section>
                        </div>

                        {/* Sidebar - Enhanced Sticky Card */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-8 space-y-6">
                                {/* Main CTA Card */}
                                <div className="bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border-2 border-slate-700/50 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
                                    <div className="mb-6">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                                $
                                                {parseFloat(
                                                    course.price,
                                                ).toFixed(2)}
                                            </span>
                                            {course.original_price && (
                                                <span className="text-xl text-slate-500 line-through">
                                                    $
                                                    {parseFloat(
                                                        course.original_price,
                                                    ).toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {isEnrolled ? (
                                        <Link
                                            href={`/my-learning`}
                                            className="w-full block text-center px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 mb-4"
                                        >
                                            <div className="flex items-center justify-center gap-2">
                                                <Play size={20} />
                                                <span>Continue Learning</span>
                                            </div>
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={handleEnroll}
                                            className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 mb-4"
                                        >
                                            <div className="flex items-center justify-center gap-2">
                                                <ShoppingCart size={20} />
                                                <span>Enroll Now</span>
                                            </div>
                                        </button>
                                    )}

                                    <button
                                        onClick={handleWishlist}
                                        className={`w-full px-6 py-3 border-2 font-semibold rounded-xl transition-all mb-6 transform hover:-translate-y-0.5 ${
                                            isWishlisted
                                                ? "bg-red-500/20 border-red-500 text-red-300 hover:bg-red-500/30"
                                                : "border-slate-600 text-slate-300 hover:border-slate-500 hover:bg-slate-700/30"
                                        }`}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <Heart
                                                size={20}
                                                className={
                                                    isWishlisted
                                                        ? "fill-current"
                                                        : ""
                                                }
                                            />
                                            <span>
                                                {isWishlisted
                                                    ? "Added to Wishlist"
                                                    : "Add to Wishlist"}
                                            </span>
                                        </div>
                                    </button>

                                    <div className="space-y-4 border-t border-slate-700/50 pt-6">
                                        <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <Award
                                                    className="text-purple-400"
                                                    size={20}
                                                />
                                                <span className="text-sm text-slate-300 font-medium">
                                                    Level
                                                </span>
                                            </div>
                                            <span className="text-white font-semibold capitalize px-3 py-1 bg-purple-500/20 rounded-full text-sm">
                                                {course.level}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <Clock
                                                    className="text-blue-400"
                                                    size={20}
                                                />
                                                <span className="text-sm text-slate-300 font-medium">
                                                    Duration
                                                </span>
                                            </div>
                                            <span className="text-white font-semibold">
                                                {course.total_duration || 0} min
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <BookOpen
                                                    className="text-green-400"
                                                    size={20}
                                                />
                                                <span className="text-sm text-slate-300 font-medium">
                                                    Chapters
                                                </span>
                                            </div>
                                            <span className="text-white font-semibold">
                                                {course.root_chapters?.length ||
                                                    0}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <Globe
                                                    className="text-orange-400"
                                                    size={20}
                                                />
                                                <span className="text-sm text-slate-300 font-medium">
                                                    Language
                                                </span>
                                            </div>
                                            <span className="text-white font-semibold capitalize">
                                                {course.language}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-6 p-5 bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/30 rounded-xl">
                                        <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                                            <CheckCircle
                                                className="text-green-400"
                                                size={18}
                                            />
                                            <span>This course includes:</span>
                                        </h4>
                                        <ul className="space-y-2 text-sm text-slate-300">
                                            <li className="flex items-center gap-2">
                                                <CheckCircle
                                                    size={16}
                                                    className="text-green-400 flex-shrink-0"
                                                />
                                                <span>
                                                    Lifetime access to all
                                                    content
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle
                                                    size={16}
                                                    className="text-green-400 flex-shrink-0"
                                                />
                                                <span>
                                                    Certificate of completion
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle
                                                    size={16}
                                                    className="text-green-400 flex-shrink-0"
                                                />
                                                <span>
                                                    30-day money-back guarantee
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <CheckCircle
                                                    size={16}
                                                    className="text-green-400 flex-shrink-0"
                                                />
                                                <span>
                                                    Access on mobile and desktop
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isContentModalOpen && selectedChapter && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div
                        className="absolute inset-0 bg-black/70"
                        onClick={() => setIsContentModalOpen(false)}
                    />
                    <div className="relative w-full max-w-5xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-slate-800/80">
                            <div>
                                <p className="text-xs text-slate-400">
                                    Chapter {selectedChapter.full_number}
                                </p>
                                <h3 className="text-xl font-bold text-white">
                                    {selectedChapter.title}
                                </h3>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() =>
                                        openChapter(
                                            selectedChapter.id,
                                            "window",
                                        )
                                    }
                                    className="inline-flex items-center gap-1 px-3 py-1 text-sm text-blue-300 bg-blue-500/10 border border-blue-400/30 rounded-md hover:bg-blue-500/20"
                                >
                                    <ExternalLink size={16} />
                                    Open in tab
                                </button>
                                <button
                                    onClick={() => setIsContentModalOpen(false)}
                                    className="p-2 text-slate-300 hover:text-white hover:bg-slate-700/60 rounded-md"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="overflow-y-auto max-h-[72vh] px-6 py-5 space-y-6">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-slate-300 font-semibold">
                                    <FileText
                                        size={18}
                                        className="text-blue-300"
                                    />
                                    <span>Reading First</span>
                                </div>
                                <div
                                    className="bg-slate-800/60 border border-slate-700/70 rounded-xl p-5 text-slate-200 leading-relaxed prose prose-invert prose-slate max-w-none"
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            selectedChapter.content ||
                                            '<p class="text-slate-400 italic">No content provided for this chapter yet.</p>',
                                    }}
                                />
                            </div>

                            {selectedChapter.video_url && (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-slate-300 font-semibold">
                                        <Video
                                            size={18}
                                            className="text-purple-300"
                                        />
                                        <span>Supplementary Video</span>
                                    </div>
                                    <div className="bg-slate-800/60 border border-slate-700/70 rounded-xl p-4">
                                        <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
                                            <iframe
                                                src={selectedChapter.video_url}
                                                title={selectedChapter.title}
                                                className="w-full h-full"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {selectedChapter.code_snippets?.length > 0 && (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-slate-300 font-semibold">
                                        <Code
                                            size={18}
                                            className="text-emerald-300"
                                        />
                                        <span>Code Snippets</span>
                                    </div>
                                    <div className="space-y-3">
                                        {selectedChapter.code_snippets.map(
                                            (snippet) => (
                                                <CodeSnippet
                                                    key={snippet.id}
                                                    snippet={snippet}
                                                />
                                            ),
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-700 bg-slate-800/80">
                            <button
                                disabled={!previousChapter}
                                onClick={() =>
                                    previousChapter &&
                                    openChapter(previousChapter.id)
                                }
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                    previousChapter
                                        ? "bg-slate-700 text-white hover:bg-slate-600"
                                        : "bg-slate-800 text-slate-600 cursor-not-allowed"
                                }`}
                            >
                                <ArrowLeft size={16} />
                                {previousChapter
                                    ? previousChapter.title
                                    : "No previous"}
                            </button>
                            <div className="text-slate-400 text-xs">
                                Reading {currentChapterIndex + 1} of{" "}
                                {flatChapters.length}
                            </div>
                            <button
                                disabled={!nextChapter}
                                onClick={() =>
                                    nextChapter && openChapter(nextChapter.id)
                                }
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                    nextChapter
                                        ? "bg-blue-600 text-white hover:bg-blue-500"
                                        : "bg-slate-800 text-slate-600 cursor-not-allowed"
                                }`}
                            >
                                {nextChapter ? nextChapter.title : "Completed"}
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Footer />
        </>
    );
}

import React, { useState, useEffect } from 'react';
import { usePage, useForm, Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { BookOpen, Plus, X, AlertCircle } from 'lucide-react';

export default function EditCourse({ course }) {
    const { user } = usePage().props.auth;
    const initialPreview = course.thumbnail_url 
        ? (course.thumbnail_url.startsWith('http') || course.thumbnail_url.startsWith('/storage/') 
            ? course.thumbnail_url 
            : `/storage/${course.thumbnail_url}`)
        : null;

    const [preview, setPreview] = useState(initialPreview);
    const [outcomes, setOutcomes] = useState(course.learning_outcomes || ['']);
    const [requirements, setRequirements] = useState(course.requirements || ['']);

    const { data, setData, post, transform, errors, processing } = useForm({
        _method: "PATCH",
        title: course.title || "",
        description: course.description || "",
        overview: course.overview || "",
        category: course.category || "",
        level: course.level || "beginner",
        price: course.price || "",
        language: course.language || "English",
        thumbnail_url: course.thumbnail_url || "",
        learning_outcomes: course.learning_outcomes || [],
        requirements: course.requirements || [],
        is_published: course.is_published || false,
    });

    const categories = [
        "Web Development",
        "Mobile Development",
        "Data Science",
        "Machine Learning",
        "AI & ChatGPT",
        "Cloud Computing",
        "DevOps",
        "Cybersecurity",
        "Blockchain",
        "Other",
    ];

    const levels = ["beginner", "intermediate", "advanced"];

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target.result);
                setData("thumbnail_url", file);
            };
            reader.readAsDataURL(file);
        }
    };

    const addOutcome = () => setOutcomes([...outcomes, ""]);
    const removeOutcome = (index) =>
        setOutcomes(outcomes.filter((_, i) => i !== index));
    const updateOutcome = (index, value) => {
        const updated = [...outcomes];
        updated[index] = value;
        setOutcomes(updated);
    };

    const addRequirement = () => setRequirements([...requirements, ""]);
    const removeRequirement = (index) =>
        setRequirements(requirements.filter((_, i) => i !== index));
    const updateRequirement = (index, value) => {
        const updated = [...requirements];
        updated[index] = value;
        setRequirements(updated);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const filteredOutcomes = outcomes.filter((o) => o.trim());
        const filteredRequirements = requirements.filter((r) => r.trim());

        transform((data) => ({
            ...data,
            learning_outcomes: filteredOutcomes,
            requirements: filteredRequirements,
        }));

        post(route("courses.update", course.id));
    };

    return (
        <AuthenticatedLayout useMarketingNavbar>
            <Head title={`Edit ${course.title}`} />

            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                {/* Header */}
                <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-700/50">
                    <div className="relative max-w-7xl mx-auto">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-blue-500/20 rounded-lg">
                                    <BookOpen className="w-8 h-8 text-blue-400" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold text-white">Edit Course</h1>
                                    <p className="text-slate-400 mt-2">Update your course details</p>
                                </div>
                            </div>
                            <Link
                                href={route('instructor.dashboard')}
                                className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                            >
                                ← Back
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Form Section */}
                <section className="px-4 sm:px-6 lg:px-8 py-12">
                    <div className="max-w-4xl mx-auto">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Basic Information */}
                            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
                                <h2 className="text-2xl font-bold text-white mb-6">Basic Information</h2>

                                <div className="space-y-6">
                                    {/* Title */}
                                    <div>
                                        <label className="block text-sm font-semibold text-white mb-2">
                                            Course Title <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            placeholder="e.g., Advanced React.js Patterns"
                                            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        />
                                        {errors.title && (
                                            <div className="mt-2 flex items-center gap-2 text-red-400 text-sm">
                                                <AlertCircle size={16} />
                                                {errors.title}
                                            </div>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block text-sm font-semibold text-white mb-2">
                                            Short Description <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Brief one-line summary"
                                            maxLength="160"
                                            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        />
                                        <p className="text-xs text-slate-400 mt-1">{data.description.length}/160 characters</p>
                                        {errors.description && (
                                            <div className="mt-2 flex items-center gap-2 text-red-400 text-sm">
                                                <AlertCircle size={16} />
                                                {errors.description}
                                            </div>
                                        )}
                                    </div>

                                    {/* Overview */}
                                    <div>
                                        <label className="block text-sm font-semibold text-white mb-2">
                                            Full Course Overview
                                        </label>
                                        <textarea
                                            value={data.overview}
                                            onChange={(e) => setData('overview', e.target.value)}
                                            placeholder="Detailed description of what students will learn..."
                                            rows="5"
                                            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                                        />
                                    </div>

                                    {/* Thumbnail */}
                                    <div>
                                        <label className="block text-sm font-semibold text-white mb-2">
                                            Course Thumbnail Image
                                        </label>
                                        <div className="flex gap-6">
                                            <div className="flex-1">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 cursor-pointer"
                                                />
                                                <p className="text-xs text-slate-400 mt-2">JPG, PNG (max 5MB)</p>
                                            </div>
                                            {preview && (
                                                <div className="w-32 h-32 rounded-lg overflow-hidden border border-slate-600">
                                                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
                                <h2 className="text-2xl font-bold text-white mb-6">Course Details</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Category */}
                                    <div>
                                        <label className="block text-sm font-semibold text-white mb-2">
                                            Category <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={data.category}
                                            onChange={(e) => setData('category', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map((cat) => (
                                                <option key={cat} value={cat}>
                                                    {cat}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.category && (
                                            <div className="mt-2 flex items-center gap-2 text-red-400 text-sm">
                                                <AlertCircle size={16} />
                                                {errors.category}
                                            </div>
                                        )}
                                    </div>

                                    {/* Level */}
                                    <div>
                                        <label className="block text-sm font-semibold text-white mb-2">
                                            Difficulty Level <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={data.level}
                                            onChange={(e) => setData('level', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        >
                                            {levels.map((level) => (
                                                <option key={level} value={level}>
                                                    {level.charAt(0).toUpperCase() + level.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Language */}
                                    <div>
                                        <label className="block text-sm font-semibold text-white mb-2">
                                            Language
                                        </label>
                                        <select
                                            value={data.language}
                                            onChange={(e) => setData('language', e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        >
                                            <option value="English">English</option>
                                            <option value="Spanish">Spanish</option>
                                            <option value="French">French</option>
                                            <option value="German">German</option>
                                            <option value="Chinese">Chinese</option>
                                            <option value="Japanese">Japanese</option>
                                        </select>
                                    </div>

                                    {/* Price */}
                                    <div>
                                        <label className="block text-sm font-semibold text-white mb-2">
                                            Price ($)
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            placeholder="0.00"
                                            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        />
                                        <p className="text-xs text-slate-400 mt-1">Leave blank for free course</p>
                                    </div>
                                </div>

                                {/* Publish Status */}
                                <div className="mt-6">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={data.is_published}
                                            onChange={(e) => setData('is_published', e.target.checked)}
                                            className="w-5 h-5 rounded bg-slate-700 border-slate-600 text-blue-500 focus:ring-2 focus:ring-blue-500"
                                        />
                                        <div>
                                            <span className="text-white font-semibold">Publish Course</span>
                                            <p className="text-sm text-slate-400">Make this course visible to students</p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Learning Outcomes */}
                            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
                                <h2 className="text-2xl font-bold text-white mb-6">What Students Will Learn</h2>

                                <div className="space-y-4">
                                    {outcomes.map((outcome, index) => (
                                        <div key={index} className="flex gap-3">
                                            <input
                                                type="text"
                                                value={outcome}
                                                onChange={(e) => updateOutcome(index, e.target.value)}
                                                placeholder={`Learning outcome ${index + 1}`}
                                                className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                            />
                                            {outcomes.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeOutcome(index)}
                                                    className="px-3 py-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
                                                >
                                                    <X size={18} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addOutcome}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-colors mt-2"
                                    >
                                        <Plus size={18} />
                                        Add Learning Outcome
                                    </button>
                                </div>
                            </div>

                            {/* Requirements */}
                            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
                                <h2 className="text-2xl font-bold text-white mb-6">Prerequisites & Requirements</h2>

                                <div className="space-y-4">
                                    {requirements.map((requirement, index) => (
                                        <div key={index} className="flex gap-3">
                                            <input
                                                type="text"
                                                value={requirement}
                                                onChange={(e) => updateRequirement(index, e.target.value)}
                                                placeholder={`Requirement ${index + 1}`}
                                                className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                            />
                                            {requirements.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeRequirement(index)}
                                                    className="px-3 py-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
                                                >
                                                    <X size={18} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addRequirement}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-colors mt-2"
                                    >
                                        <Plus size={18} />
                                        Add Requirement
                                    </button>
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="flex gap-4 justify-end">
                                <Link
                                    href={route('instructor.dashboard')}
                                    className="px-6 py-3 rounded-lg border border-slate-600 text-white hover:bg-slate-700/50 transition-colors"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 transition-all"
                                >
                                    {processing ? 'Updating...' : 'Update Course'}
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}

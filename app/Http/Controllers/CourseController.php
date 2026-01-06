<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Notification;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function create()
    {
        return Inertia::render('Courses/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255|unique:courses',
            'description' => 'required|string|max:160',
            'overview' => 'nullable|string',
            'category' => 'required|string',
            'level' => 'required|in:beginner,intermediate,advanced',
            'price' => 'nullable|numeric|min:0',
            'language' => 'nullable|string',
            'learning_outcomes' => 'nullable|array',
            'requirements' => 'nullable|array',
        ]);

        $course = auth()->user()->courses()->create(
            array_merge($validated, [
                'is_published' => false,
                'instructor_id' => auth()->id(),
            ])
        );

        return redirect()->route('instructor.dashboard')->with('success', 'Course created successfully!');
    }

public function edit(Course $course)
    {
    // Ensure user owns this course
    if ($course->instructor_id !== auth()->id() && auth()->user()->role !== 'admin') {
    abort(403);
    }
    
    return Inertia::render('Courses/Edit', [
    'course' => $course,
    ]);
    }
    
    public function update(Request $request, Course $course)
    {
    // Ensure user owns this course
    if ($course->instructor_id !== auth()->id() && auth()->user()->role !== 'admin') {
    abort(403);
    }
    
    $validated = $request->validate([
    'title' => 'required|string|max:255|unique:courses,title,' . $course->id,
    'description' => 'required|string|max:160',
    'overview' => 'nullable|string',
    'category' => 'required|string',
    'level' => 'required|in:beginner,intermediate,advanced',
    'price' => 'nullable|numeric|min:0',
    'language' => 'nullable|string',
    'learning_outcomes' => 'nullable|array',
    'requirements' => 'nullable|array',
    'is_published' => 'boolean',
    ]);
    
    $course->update($validated);
    
    return redirect()->route('instructor.dashboard')->with('success', 'Course updated successfully!');
    }
    public function index(Request $request)
    {
        // Accept instructor filter from either query (?instructor=ID) or route (/courses/instructors=ID)
        $routeInstructor = $request->route('instructor');
        $queryInstructor = $request->query('instructor');
        $activeInstructor = $routeInstructor ?? $queryInstructor;

        $query = Course::query()
            ->with('instructor', 'instructor.instructorProfile')
            ->withCount('enrollments');

        // Show published courses OR user's own courses (even if unpublished)
        if (auth()->check()) {
            $query->where(function($q) {
                $q->where('is_published', true)
                  ->orWhere('instructor_id', auth()->id());
            });
        } else {
            $query->where('is_published', true);
        }

        if ($request->has('category') && $request->category) {
            $query->where('category', $request->category);
        }

        if ($request->has('level') && $request->level) {
            $query->where('level', $request->level);
        }

        // Filter by instructor (user_id) from route or query param
        if (!empty($activeInstructor)) {
            $query->where('instructor_id', $activeInstructor);
        }

        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where('title', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%")
                ->orWhere('category', 'like', "%{$search}%");
        }

        $sortBy = $request->get('sort', 'latest');
        if ($sortBy === 'popular') {
            $query->orderByDesc('total_students');
        } elseif ($sortBy === 'rating') {
            $query->orderByDesc('rating');
        } else {
            $query->orderByDesc('published_at');
        }

        $courses = $query->paginate(12);

        return Inertia::render('Courses/Index', [
            'courses' => $courses,
            'filters' => [
                'category' => $request->get('category', ''),
                'level' => $request->get('level', ''),
                'search' => $request->get('search', ''),
                'instructor' => $activeInstructor ?? '',
                'sort' => $request->get('sort', 'latest'),
            ],
        ]);
    }

    public function show(Course $course)
    {
        if (!$course->is_published && (!auth()->check() || auth()->user()->id !== $course->instructor_id)) {
            abort(404);
        }

        $course->load('instructor', 'instructor.instructorProfile', 'reviews.user');
        
        // Build chapters hierarchy recursively
        $rootChapters = $course->chapters()
            ->whereNull('parent_id')
            ->orderBy('order')
            ->get()
            ->map(function ($chapter) {
                return $this->buildChapterTree($chapter);
            });

        $isEnrolled = auth()->check() ? auth()->user()->enrolledCourses()->where('course_id', $course->id)->exists() : false;
        $isWishlisted = auth()->check() ? auth()->user()->wishlist()->where('course_id', $course->id)->exists() : false;
        $userReview = auth()->check() ? $course->reviews()->where('user_id', auth()->id())->first() : null;

        return Inertia::render('Courses/Show', [
            'course' => array_merge($course->toArray(), [
                'root_chapters' => $rootChapters
            ]),
            'isEnrolled' => $isEnrolled,
            'isWishlisted' => $isWishlisted,
            'userReview' => $userReview,
            'reviews' => $course->reviews()->with('user')->latest()->paginate(5),
        ]);
    }

    public function content(Course $course)
    {
        if (!$course->is_published && (!auth()->check() || auth()->user()->id !== $course->instructor_id)) {
            abort(404);
        }

        // Get hierarchical chapters structure
        $chapters = $course->rootChapters()
            ->with(['allChildren.codeSnippets'])
            ->get()
            ->map(function ($chapter) {
                return $this->buildChapterTree($chapter);
            });

        \Log::info('Course Content - Chapters Count', [
            'course_id' => $course->id,
            'root_chapters' => $course->rootChapters()->count(),
            'chapters_returned' => $chapters->count(),
        ]);

        return Inertia::render('Courses/Content', [
            'course' => $course,
            'chapters' => $chapters,
        ]);
    }

    private function buildChapterTree($chapter)
    {
        $data = [
            'id' => $chapter->id,
            'title' => $chapter->title,
            'description' => $chapter->description,
            'content' => $chapter->content,
            'full_number' => $chapter->full_number,
            'level' => $chapter->level,
            'duration_minutes' => $chapter->duration_minutes,
            'video_url' => $chapter->video_url,
            'is_published' => $chapter->is_published,
            'is_free' => $chapter->is_free,
            'code_snippets' => $chapter->codeSnippets->map(function ($snippet) {
                return [
                    'id' => $snippet->id,
                    'title' => $snippet->title,
                    'description' => $snippet->description,
                    'code' => $snippet->code,
                    'language' => $snippet->language,
                    'order' => $snippet->order,
                ];
            }),
            'children' => $chapter->children->map(function ($child) {
                return $this->buildChapterTree($child);
            }),
        ];

        return $data;
    }

    public function getCategories()
    {
        $categories = Course::where('is_published', true)
            ->distinct()
            ->pluck('category')
            ->sort();

        return response()->json(['categories' => $categories->values()]);
    }

    public function getTrendingCourses()
    {
        $courses = Course::where('is_published', true)
            ->with('instructor', 'instructor.instructorProfile')
            ->orderByDesc('total_students')
            ->limit(8)
            ->get();

        return response()->json(['courses' => $courses]);
    }

    public function getRecommendedCourses()
    {
        $courses = Course::where('is_published', true)
            ->with('instructor', 'instructor.instructorProfile')
            ->orderByDesc('rating')
            ->limit(6)
            ->get();

        return response()->json(['courses' => $courses]);
    }

    public function enroll(Course $course)
    {
        $user = auth()->user();
        
        if ($user->enrollments()->where('course_id', $course->id)->exists()) {
            return response()->json(['message' => 'Already enrolled'], 400);
        }

        $user->enrollments()->create([
            'course_id' => $course->id,
            'status' => 'active',
            'enrolled_at' => now(),
        ]);

        // Increment total students
        $course->increment('total_students');

        // Create notification for the user
        Notification::create([
            'user_id' => $user->id,
            'type' => 'enrollment',
            'title' => 'Course Enrollment',
            'message' => "You've successfully enrolled in {$course->title}",
            'link' => "/courses/{$course->slug}",
        ]);

        // Notify instructor
        if ($course->instructor_id) {
            Notification::create([
                'user_id' => $course->instructor_id,
                'type' => 'enrollment',
                'title' => 'New Student Enrolled',
                'message' => "{$user->name} enrolled in your course: {$course->title}",
                'link' => "/courses/{$course->slug}",
            ]);
        }

        return response()->json(['message' => 'Enrolled successfully']);
    }

    public function toggleWishlist(Course $course)
    {
        $user = auth()->user();
        
        $wishlist = $user->wishlist()->where('course_id', $course->id)->first();
        
        if ($wishlist) {
            $wishlist->delete();
            return response()->json(['message' => 'Removed from wishlist', 'wishlisted' => false]);
        }

        $user->wishlist()->create([
            'course_id' => $course->id,
        ]);

        return response()->json(['message' => 'Added to wishlist', 'wishlisted' => true]);
    }

    public function storeReview(Request $request, Course $course)
    {
        $user = auth()->user();
        
        // Check if user is enrolled
        if (!$user->enrollments()->where('course_id', $course->id)->exists()) {
            return response()->json(['message' => 'You must be enrolled to review this course'], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $review = $course->reviews()->updateOrCreate(
            ['user_id' => $user->id],
            $validated
        );

        // Update course rating
        $course->update([
            'rating' => $course->reviews()->avg('rating')
        ]);

        // Notify instructor about new review
        if ($course->instructor_id && $validated['rating'] >= 4) {
            Notification::create([
                'user_id' => $course->instructor_id,
                'type' => 'review',
                'title' => 'New Course Review',
                'message' => "{$user->name} left a {$validated['rating']}-star review on {$course->title}",
                'link' => "/courses/{$course->slug}",
            ]);
        }

        return response()->json(['message' => 'Review submitted successfully', 'review' => $review]);
    }}
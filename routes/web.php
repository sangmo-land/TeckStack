<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ChapterHierarchyController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\NotificationController;
use App\Models\User;
use App\Models\Review;
use App\Models\Course;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $testimonials = Review::with('user', 'course')
        ->whereNotNull('content')
        ->where('rating', '>=', 4)
        ->latest()
        ->take(3)
        ->get()
        ->map(fn($review) => [
            'text' => $review->content,
            'author' => $review->user->name,
            'rating' => $review->rating,
            'course' => $review->course->title,
        ]);

    // Get actual learner count
    $learnerCount = User::whereIn('role', ['student', 'instructor'])->count();

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'testimonials' => $testimonials,
        'learnerCount' => $learnerCount,
    ]);
});

Route::get('/courses', [CourseController::class, 'index'])->name('courses.index');
// Instructor-filtered courses path must be declared before the slug route
Route::get('/courses/instructors={instructor}', [CourseController::class, 'index'])->name('courses.byInstructor');
Route::get('/courses/{course}', [CourseController::class, 'show'])->name('courses.show');
Route::get('/courses/{course}/content', [CourseController::class, 'content'])->name('courses.content');

// Enrollment and Wishlist routes
Route::middleware('auth')->group(function () {
    Route::post('/courses/{course}/enroll', [CourseController::class, 'enroll'])->name('courses.enroll');
    Route::post('/courses/{course}/wishlist', [CourseController::class, 'toggleWishlist'])->name('courses.wishlist');
    Route::post('/courses/{course}/reviews', [CourseController::class, 'storeReview'])->name('courses.reviews.store');
    
    // Student Dashboard / My Learning
    Route::get('/my-learning', [DashboardController::class, 'studentDashboard'])->name('student.dashboard');
    
    // Notifications
    Route::get('/api/notifications', [NotificationController::class, 'index']);
    Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead'])->name('notifications.read');
    Route::post('/notifications/read-all', [NotificationController::class, 'markAllAsRead'])->name('notifications.readAll');
});

// API Routes
Route::get('/api/categories', [CourseController::class, 'getCategories']);
Route::get('/api/trending-courses', [CourseController::class, 'getTrendingCourses']);
Route::get('/api/recommended-courses', [CourseController::class, 'getRecommendedCourses']);

Route::get('/about', function () {
    $team = User::select('name', 'role', 'avatar_url', 'email')
        ->whereIn('role', ['admin', 'instructor'])
        ->orderBy('role')
        ->orderBy('name')
        ->get()
        ->map(function ($user) {
            $avatar = $user->avatar_url ?: 'https://i.pravatar.cc/300?u=' . urlencode($user->email ?: $user->name);

            return [
                'name' => $user->name,
                'role' => ucfirst($user->role ?? 'Team'),
                'avatar_url' => $avatar,
                'expertise' => $user->email, // fallback detail
            ];
        });

    // Get actual student count
    $studentCount = User::whereIn('role', ['student', 'instructor'])->count();

    // Get actual course count
    $courseCount = Course::count();

    return Inertia::render('About', [
        'team' => $team,
        'studentCount' => $studentCount,
        'courseCount' => $courseCount,
    ]);
})->name('about');

Route::get('/privacy', function () {
    return Inertia::render('Privacy');
})->name('privacy');

Route::get('/terms', function () {
    return Inertia::render('Terms');
})->name('terms');

// Debug route
Route::get('/debug-chapters', function() {
    $course = \App\Models\Course::first();
    $chapters = $course->rootChapters()->with('allChildren.codeSnippets')->get();
    return response()->json([
        'root_count' => $chapters->count(),
        'total_chapters' => \App\Models\Chapter::count(),
        'chapters' => $chapters,
    ]);
});

Route::get('/instructors', [InstructorController::class, 'index'])->name('instructors');
Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/pricing', function () {
    return Inertia::render('Pricing');
})->name('pricing');

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::get('/instructor/dashboard', [DashboardController::class, 'instructorDashboard'])
    ->middleware(['auth', 'verified'])
    ->name('instructor.dashboard');

Route::post('/chapters/{chapter}/insert', [ChapterHierarchyController::class, 'insert'])
    ->middleware(['auth', 'verified'])
    ->name('chapters.insert');

Route::post('/chapters/{chapter}/snippets', [ChapterHierarchyController::class, 'storeSnippet'])
    ->middleware(['auth', 'verified'])
    ->name('snippets.store');

Route::delete('/chapters/{chapter}', [ChapterHierarchyController::class, 'destroy'])
    ->middleware(['auth', 'verified'])
    ->name('chapters.destroy');

// Course creation routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard/create-course', [CourseController::class, 'create'])->name('courses.create');
    Route::post('/courses', [CourseController::class, 'store'])->name('courses.store');
Route::get('/dashboard/courses/{course}/edit', [CourseController::class, 'edit'])->name('courses.edit');
    Route::patch('/dashboard/courses/{course}', [CourseController::class, 'update'])->name('courses.update');
});

Route::post('/chapters/create', [ChapterHierarchyController::class, 'create'])
    ->middleware(['auth', 'verified'])
    ->name('chapters.create');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

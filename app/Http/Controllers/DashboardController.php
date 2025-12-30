<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $courseId = $request->query('course_id');

        // Prepare data for admin/instructor view - filter for students
        if ($user->role === 'student') {
            // Students can only see their enrolled courses
            $coursesList = $user->enrollments()
                ->with('course')
                ->latest()
                ->get()
                ->pluck('course')
                ->unique('id')
                ->map(fn($c) => ['id' => $c->id, 'title' => $c->title])
                ->values();

            // Ensure the selected course is one the student is enrolled in
            $course = null;
            if ($courseId) {
                $course = Course::with(['rootChapters' => function ($query) {
                    $query->orderBy('order')->with('allChildren');
                }])
                ->where('id', $courseId)
                ->first();

                // Verify student is enrolled in this course
                if ($course && !$user->enrollments()->where('course_id', $course->id)->exists()) {
                    $course = null;
                }
            }

            // If no course selected, get the first enrolled course
            if (!$course) {
                $firstEnrollment = $user->enrollments()->with('course')->first();
                if ($firstEnrollment) {
                    $course = Course::with(['rootChapters' => function ($query) {
                        $query->orderBy('order')->with('allChildren');
                    }])->find($firstEnrollment->course_id);
                }
            }
        } elseif ($user->isInstructor()) {
            // Instructors see only the courses they teach
            $coursesList = $user->courses()
                ->select('id', 'title')
                ->orderBy('title')
                ->take(25)
                ->get();

            $courseQuery = Course::with(['rootChapters' => function ($query) {
                    $query->orderBy('order')->with('allChildren');
                }])
                ->where('instructor_id', $user->id);

            if ($courseId) {
                $courseQuery->where('id', $courseId);
            }

            $course = $courseQuery
                ->orderByDesc('published_at')
                ->orderBy('id')
                ->first();

            // If no specific course found/owned, fallback to first taught course
            if (!$course) {
                $course = $user->courses()
                    ->with(['rootChapters' => function ($query) {
                        $query->orderBy('order')->with('allChildren');
                    }])
                    ->orderByDesc('published_at')
                    ->orderBy('id')
                    ->first();
            }
        } else {
            // Admins see all courses
            $coursesList = Course::select('id', 'title')
                ->orderBy('title')
                ->take(25)
                ->get();

            $course = Course::with(['rootChapters' => function ($query) {
                    $query->orderBy('order')->with('allChildren');
                }])
                ->when($courseId, fn ($q) => $q->where('id', $courseId))
                ->orderByDesc('published_at')
                ->orderBy('id')
                ->first();
        }

        $chapterMapper = function ($chapter) use (&$chapterMapper) {
            return [
                'id' => $chapter->id,
                'title' => $chapter->title,
                'description' => $chapter->description,
                'full_number' => $chapter->full_number,
                'is_published' => $chapter->is_published,
                'is_free' => $chapter->is_free,
                'duration_minutes' => $chapter->duration_minutes,
                'order' => $chapter->order,
                'children' => collect($chapter->allChildren ?? [])->map($chapterMapper)->values(),
            ];
        };

        $coursePayload = null;
        if ($course) {
            $coursePayload = [
                'id' => $course->id,
                'title' => $course->title,
                'category' => $course->category,
                'level' => $course->level,
                'thumbnail_url' => $course->thumbnail_url,
                'chapters' => collect($course->rootChapters ?? [])->map($chapterMapper)->values(),
            ];
        }

        $data = [
            'userRole' => $user->role,
            'course' => $coursePayload,
            'coursesList' => $coursesList,
            'canEditCourse' => $user->role !== 'student', // Only non-students can edit
        ];

        // Add admin-specific stats
        if ($user->role === 'admin') {
            $totalEnrollments = \DB::table('enrollments')->count();
            $publishedCourses = Course::where('is_published', true)->count();
            $completedEnrollments = \DB::table('enrollments')->where('status', 'completed')->count();
            $totalEnrollmentsCount = \DB::table('enrollments')->count();
            $avgCompletion = $totalEnrollmentsCount > 0 ? round(($completedEnrollments / $totalEnrollmentsCount) * 100) : 0;
            
            // Calculate total learning time from chapter progress
            $totalMinutes = \DB::table('chapter_progress')
                ->join('chapters', 'chapter_progress.chapter_id', '=', 'chapters.id')
                ->sum('chapters.duration_minutes');
            $totalHours = round($totalMinutes / 60, 1);

            $data['adminStats'] = [
                'activeLearners' => $totalEnrollments,
                'publishedCourses' => $publishedCourses,
                'avgCompletion' => $avgCompletion,
                'totalHours' => $totalHours,
            ];

            // Get engagement data for the past 7 days
            $engagementData = [];
            for ($i = 6; $i >= 0; $i--) {
                $date = now()->subDays($i);
                $dayEnrollments = \DB::table('enrollments')
                    ->whereDate('created_at', $date->toDateString())
                    ->count();
                $dayProgress = \DB::table('chapter_progress')
                    ->whereDate('created_at', $date->toDateString())
                    ->count();
                
                $engagementData[] = [
                    'date' => $date->format('M d'),
                    'enrollments' => $dayEnrollments,
                    'activity' => $dayProgress,
                ];
            }
            
            $data['engagementData'] = $engagementData;

            // Get recent activity
            $recentEnrollments = \DB::table('enrollments')
                ->join('users', 'enrollments.user_id', '=', 'users.id')
                ->join('courses', 'enrollments.course_id', '=', 'courses.id')
                ->select('users.name as user_name', 'courses.title as course_title', 'enrollments.created_at')
                ->orderBy('enrollments.created_at', 'desc')
                ->limit(5)
                ->get();

            $data['recentActivity'] = $recentEnrollments;
        }

        // Add instructor-specific data if user is instructor
        if ($user->isInstructor()) {
            $courses = $user->courses()->with('enrollments')->get();
            $totalStudents = $courses->sum(fn($c) => $c->enrollments->count());
            $totalReviews = $courses->sum(fn($c) => $c->reviews()->count());
            $averageRating = $courses->avg(fn($c) => $c->reviews()->avg('rating')) ?? 0;

            $data['instructorCourses'] = $courses;
            $data['totalStudents'] = $totalStudents;
            $data['totalReviews'] = $totalReviews;
            $data['averageRating'] = round($averageRating, 1);
        }

        // Add student-specific data if user is student
        if ($user->role === 'student') {
            $enrollments = $user->enrollments()->with('course.instructor')->latest()->get();
            $wishlist = $user->wishlist()->count();
            $completedCourses = $user->enrollments()->where('status', 'completed')->count();
            $inProgress = $user->enrollments()->where('status', 'active')->count();

            $data['enrollments'] = $enrollments;
            $data['wishlistCount'] = $wishlist;
            $data['completedCoursesCount'] = $completedCourses;
            $data['totalCourses'] = $enrollments->count();
            $data['inProgressCount'] = $inProgress;
        }

        return Inertia::render('Dashboard', $data);
    }

    public function studentDashboard()
    {
        $user = auth()->user();
        $enrollments = $user->enrollments()->with('course.instructor')->latest()->get();
        $wishlist = $user->wishlist()->with('course')->count();
        $completedCourses = $user->enrollments()->where('status', 'completed')->count();

        return Inertia::render('Student/Dashboard', [
            'enrollments' => $enrollments,
            'wishlistCount' => $wishlist,
            'completedCoursesCount' => $completedCourses,
            'totalCourses' => $enrollments->count(),
        ]);
    }

    public function instructorDashboard()
    {
        $user = auth()->user();
        
        if (!$user->isInstructor()) {
            abort(403);
        }

        $courses = $user->courses()->with('enrollments')->get();
        $totalStudents = $courses->sum(fn($c) => $c->enrollments->count());
        $totalReviews = $courses->sum(fn($c) => $c->reviews()->count());
        $averageRating = $courses->avg(fn($c) => $c->reviews()->avg('rating')) ?? 0;

        return Inertia::render('Instructor/Dashboard', [
            'courses' => $courses,
            'totalStudents' => $totalStudents,
            'totalReviews' => $totalReviews,
            'averageRating' => round($averageRating, 1),
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EnrollmentController extends Controller
{
    public function enroll(Course $course)
    {
        if (auth()->user()->enrolledCourses()->where('course_id', $course->id)->exists()) {
            return response()->json(['message' => 'Already enrolled'], 409);
        }

        $enrollment = Enrollment::create([
            'user_id' => auth()->id(),
            'course_id' => $course->id,
            'price_paid' => $course->price,
            'enrolled_at' => now(),
            'status' => 'active',
        ]);

        $course->increment('total_students');

        return response()->json(['enrollment' => $enrollment, 'message' => 'Successfully enrolled']);
    }

    public function getCourseProgress(Course $course)
    {
        $enrollment = Enrollment::where('user_id', auth()->id())
            ->where('course_id', $course->id)
            ->first();

        if (!$enrollment) {
            return response()->json(['message' => 'Not enrolled'], 403);
        }

        $course->load('modules.lessons');

        return response()->json([
            'enrollment' => $enrollment,
            'course' => $course,
        ]);
    }

    public function getUserEnrollments()
    {
        $enrollments = Enrollment::where('user_id', auth()->id())
            ->with('course.instructor', 'course.instructor.instructorProfile')
            ->latest()
            ->get();

        return response()->json(['enrollments' => $enrollments]);
    }
}

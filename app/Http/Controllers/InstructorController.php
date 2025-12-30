<?php

namespace App\Http\Controllers;

use App\Models\Instructor;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class InstructorController extends Controller
{
    public function index(): Response
    {
        $instructors = Instructor::with(['user'])
            ->get()
            ->map(function (Instructor $instructor) {
                $name = $instructor->name ?? optional($instructor->user)->name ?? 'Instructor';
                // Keep image as path or URL only; no initials fallback
                $image = $instructor->image ?? '';

                return [
                    'id' => $instructor->id,
                    'userId' => $instructor->user_id,
                    'name' => $name,
                    'role' => $instructor->role_title ?? 'Instructor',
                    'expertise' => $instructor->expertise ?? [],
                    'rating' => (float) $instructor->rating,
                    // Derived via accessors on the model
                    'students' => (int) $instructor->students,
                    'courses' => (int) $instructor->courses,
                    'bio' => $instructor->bio ?? '',
                    'image' => $image,
                    'gradient' => $instructor->gradient ?? 'from-blue-500 to-cyan-600',
                    'certifications' => $instructor->certifications ?? [],
                    'yearsExperience' => (int) ($instructor->years_experience ?? 0),
                    'companies' => $instructor->companies ?? [],
                ];
            });

        $totalStudents = $instructors->sum('students');
        $averageRating = $instructors->avg('rating');
        $totalCourses = $instructors->sum('courses');

        return Inertia::render('Instructors', [
            'instructors' => $instructors,
            'stats' => [
                ['value' => $instructors->count() . '+', 'label' => 'Expert Instructors', 'color' => 'from-blue-500 to-blue-600'],
                ['value' => number_format((float) $averageRating, 1), 'label' => 'Average Rating', 'color' => 'from-green-500 to-green-600'],
                ['value' => number_format($totalStudents), 'label' => 'Students Taught', 'color' => 'from-orange-500 to-orange-600'],
                ['value' => $totalCourses, 'label' => 'Courses', 'color' => 'from-purple-500 to-pink-600'],
            ],
        ]);
    }
}

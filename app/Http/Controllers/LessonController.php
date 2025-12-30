<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\LessonProgress;
use App\Models\Enrollment;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    public function show(Lesson $lesson)
    {
        $lesson->load('module.course', 'progress');

        $enrollment = Enrollment::where('user_id', auth()->id())
            ->where('course_id', $lesson->module->course_id)
            ->first();

        if (!$enrollment && !auth()->user()->isAdmin()) {
            abort(403, 'You are not enrolled in this course.');
        }

        $userProgress = $lesson->progress()->where('user_id', auth()->id())->first();

        $module = $lesson->module;
        $course = $module->course;

        $previousLesson = $module->lessons()
            ->where('order', '<', $lesson->order)
            ->orderByDesc('order')
            ->first();

        $nextLesson = $module->lessons()
            ->where('order', '>', $lesson->order)
            ->orderBy('order')
            ->first();

        if (!$nextLesson) {
            $nextModule = $course->modules()
                ->where('order', '>', $module->order)
                ->orderBy('order')
                ->first();

            if ($nextModule) {
                $nextLesson = $nextModule->lessons()->orderBy('order')->first();
            }
        }

        return response()->json([
            'lesson' => $lesson,
            'progress' => $userProgress,
            'previousLesson' => $previousLesson,
            'nextLesson' => $nextLesson,
            'course' => $course,
        ]);
    }

    public function markComplete(Lesson $lesson)
    {
        $enrollment = Enrollment::where('user_id', auth()->id())
            ->where('course_id', $lesson->module->course_id)
            ->first();

        if (!$enrollment) {
            return response()->json(['message' => 'Not enrolled'], 403);
        }

        $progress = LessonProgress::updateOrCreate(
            ['user_id' => auth()->id(), 'lesson_id' => $lesson->id],
            [
                'is_completed' => true,
                'progress_percentage' => 100,
                'completed_at' => now(),
            ]
        );

        $this->updateCourseProgress($enrollment);

        return response()->json(['progress' => $progress]);
    }

    public function updateProgress(Lesson $lesson, Request $request)
    {
        $validated = $request->validate([
            'progress_percentage' => 'required|integer|min:0|max:100',
        ]);

        $progress = LessonProgress::updateOrCreate(
            ['user_id' => auth()->id(), 'lesson_id' => $lesson->id],
            [
                'progress_percentage' => $validated['progress_percentage'],
            ]
        );

        return response()->json(['progress' => $progress]);
    }

    private function updateCourseProgress(Enrollment $enrollment)
    {
        $course = $enrollment->course;
        $totalLessons = $course->lessons()->count();

        if ($totalLessons === 0) {
            return;
        }

        $completedLessons = LessonProgress::whereIn('lesson_id', $course->lessons()->pluck('id'))
            ->where('user_id', auth()->id())
            ->where('is_completed', true)
            ->count();

        $progressPercentage = round(($completedLessons / $totalLessons) * 100);

        if ($progressPercentage === 100) {
            $enrollment->update([
                'progress_percentage' => 100,
                'status' => 'completed',
                'completed_at' => now(),
            ]);
        } else {
            $enrollment->update(['progress_percentage' => $progressPercentage]);
        }
    }
}

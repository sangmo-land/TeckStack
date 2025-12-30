<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Course;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function store(Course $course, Request $request)
    {
        $enrollment = auth()->user()->enrollments()
            ->where('course_id', $course->id)
            ->first();

        if (!$enrollment) {
            return response()->json(['message' => 'You must be enrolled to review'], 403);
        }

        $existing = Review::where('user_id', auth()->id())
            ->where('course_id', $course->id)
            ->first();

        if ($existing && !$request->has('update')) {
            return response()->json(['message' => 'You already reviewed this course'], 409);
        }

        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'title' => 'required|string|max:255',
            'content' => 'required|string|max:1000',
        ]);

        if ($existing) {
            $review = $existing->update($validated);
            $review = Review::find($existing->id);
        } else {
            $review = Review::create([
                ...$validated,
                'user_id' => auth()->id(),
                'course_id' => $course->id,
            ]);
        }

        $course->update(['rating' => $course->reviews()->avg('rating')]);

        return response()->json(['review' => $review]);
    }

    public function destroy(Review $review)
    {
        if ($review->user_id !== auth()->id() && !auth()->user()->isAdmin()) {
            abort(403);
        }

        $course = $review->course;
        $review->delete();

        $course->update(['rating' => $course->reviews()->avg('rating') ?? 0]);

        return response()->json(['message' => 'Review deleted']);
    }

    public function markHelpful(Review $review)
    {
        $review->increment('helpful_count');
        return response()->json(['helpful_count' => $review->helpful_count]);
    }
}

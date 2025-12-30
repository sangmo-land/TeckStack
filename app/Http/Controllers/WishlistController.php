<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use App\Models\Course;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function toggle(Course $course)
    {
        $wishlist = Wishlist::where('user_id', auth()->id())
            ->where('course_id', $course->id)
            ->first();

        if ($wishlist) {
            $wishlist->delete();
            return response()->json(['message' => 'Removed from wishlist', 'isWishlisted' => false]);
        } else {
            Wishlist::create([
                'user_id' => auth()->id(),
                'course_id' => $course->id,
            ]);
            return response()->json(['message' => 'Added to wishlist', 'isWishlisted' => true]);
        }
    }

    public function getUserWishlist()
    {
        $wishlist = Wishlist::where('user_id', auth()->id())
            ->with('course.instructor', 'course.instructor.instructorProfile')
            ->latest()
            ->get();

        return response()->json(['wishlist' => $wishlist]);
    }
}

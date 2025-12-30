<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InstructorProfile extends Model
{
    use HasFactory;

    protected $table = 'instructor_profiles';

    protected $fillable = [
        'user_id',
        'bio',
        'avatar_url',
        'website',
        'linkedin_url',
        'twitter_url',
        'expertise',
        'total_students',
        'total_courses',
        'total_reviews',
        'average_rating',
        'is_verified',
    ];

    protected $casts = [
        'expertise' => 'array',
        'total_students' => 'integer',
        'total_courses' => 'integer',
        'total_reviews' => 'integer',
        'average_rating' => 'decimal:2',
        'is_verified' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function courses()
    {
        return $this->user->courses();
    }
}

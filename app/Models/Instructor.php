<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Instructor extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'role_title',
        'expertise',
        'rating',
        // 'students' and 'courses' are stored columns but derived in getters
        'students',
        'courses',
        'bio',
        'image',
        'gradient',
        'certifications',
        'years_experience',
        'companies',
    ];

    protected $casts = [
        'expertise' => 'array',
        'certifications' => 'array',
        'companies' => 'array',
        'rating' => 'decimal:2',
        'students' => 'integer',
        'courses' => 'integer',
        'years_experience' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function courses()
    {
        return $this->hasMany(Course::class, 'instructor_id', 'user_id');
    }

    public function enrollments()
    {
        // All enrollments for courses taught by this instructor
        return $this->hasManyThrough(Enrollment::class, Course::class, 'instructor_id', 'course_id', 'user_id', 'id');
    }

    public function getCoursesAttribute($value)
    {
        // Derived count of courses taught
        return (int) $this->courses()->count();
    }

    public function getStudentsAttribute($value)
    {
        // Derived distinct enrolled students across instructor's courses
        return (int) $this->enrollments()->distinct('user_id')->count('user_id');
    }
}

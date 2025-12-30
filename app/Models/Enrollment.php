<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'course_id',
        'price_paid',
        'discount',
        'status',
        'enrolled_at',
        'completed_at',
        'progress_percentage',
    ];

    protected $casts = [
        'price_paid' => 'decimal:2',
        'discount' => 'decimal:2',
        'enrolled_at' => 'datetime',
        'completed_at' => 'datetime',
        'progress_percentage' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function lessonProgress()
    {
        return $this->hasMany(LessonProgress::class, 'user_id', 'user_id')
            ->whereHas('lesson', function ($query) {
                $query->whereHas('module', function ($q) {
                    $q->where('course_id', $this->course_id);
                });
            });
    }
}

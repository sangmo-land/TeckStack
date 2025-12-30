<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LessonProgress extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'lesson_id',
        'progress_percentage',
        'is_completed',
        'completed_at',
    ];

    protected $casts = [
        'progress_percentage' => 'integer',
        'is_completed' => 'boolean',
        'completed_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function markComplete()
    {
        $this->update([
            'is_completed' => true,
            'progress_percentage' => 100,
            'completed_at' => now(),
        ]);
    }
}

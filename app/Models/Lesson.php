<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Lesson extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'module_id',
        'title',
        'description',
        'content',
        'video_url',
        'video_thumbnail',
        'duration',
        'order',
        'lesson_type',
        'resources',
        'is_free',
    ];

    protected $casts = [
        'duration' => 'integer',
        'order' => 'integer',
        'resources' => 'array',
        'is_free' => 'boolean',
    ];

    public function module()
    {
        return $this->belongsTo(Module::class);
    }

    public function course()
    {
        return $this->module->course();
    }

    public function progress()
    {
        return $this->hasMany(LessonProgress::class);
    }

    public function getUserProgress($userId)
    {
        return $this->progress()->where('user_id', $userId)->first();
    }
}

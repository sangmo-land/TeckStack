<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CodeSnippet extends Model
{
    protected $fillable = [
        'chapter_id',
        'title',
        'description',
        'code',
        'language',
        'order',
        'is_executable',
    ];

    protected $casts = [
        'is_executable' => 'boolean',
    ];

    protected $appends = ['display_number'];

    protected static function booted()
    {
        static::creating(function ($snippet) {
            // Auto-assign next order if not set
            if ($snippet->order === null || $snippet->order === '') {
                $maxOrder = static::where('chapter_id', $snippet->chapter_id)->max('order');
                $snippet->order = $maxOrder !== null ? $maxOrder + 1 : 0;
            }
        });
    }

    public function chapter(): BelongsTo
    {
        return $this->belongsTo(Chapter::class);
    }

    // Dynamic Attributes
    protected function displayNumber(): Attribute
    {
        return Attribute::make(
            get: function () {
                if ($this->chapter) {
                    return $this->chapter->full_number . '.' . ($this->order + 1);
                }
                return (string)($this->order + 1);
            }
        );
    }

    public function getHighlightedCodeAttribute(): string
    {
        // This can be used for syntax highlighting on the frontend
        return $this->code;
    }

    public function getFormattedLanguageAttribute(): string
    {
        $languages = [
            'mysql' => 'MySQL',
            'sql' => 'SQL',
            'php' => 'PHP',
            'javascript' => 'JavaScript',
            'python' => 'Python',
            'java' => 'Java',
            'csharp' => 'C#',
            'bash' => 'Bash',
        ];

        return $languages[$this->language] ?? ucfirst($this->language);
    }
}

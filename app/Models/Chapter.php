<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Chapter extends Model
{
    protected $fillable = [
        'course_id',
        'parent_id',
        'title',
        'description',
        'content',
        'order',
        'level',
        'duration_minutes',
        'video_url',
        'is_published',
        'is_free',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'is_free' => 'boolean',
    ];

    protected $appends = ['full_number'];

    protected static function booted()
    {
        static::saving(function ($chapter) {
            $chapter->updateLevel();
            
            // Auto-assign next order if not set
            if ($chapter->order === null || $chapter->order === '') {
                $chapter->order = $chapter->getNextOrder();
            }
        });

        static::deleted(function ($chapter) {
            // Reorder siblings after deletion
            $siblings = static::where('course_id', $chapter->course_id)
                ->where('parent_id', $chapter->parent_id)
                ->where('order', '>', $chapter->order)
                ->get();

            foreach ($siblings as $sibling) {
                $sibling->order = $sibling->order - 1;
                $sibling->saveQuietly();
            }
        });
    }

    // Relationships
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Chapter::class, 'parent_id');
    }

    public function children(): HasMany
    {
        return $this->hasMany(Chapter::class, 'parent_id')->orderBy('order');
    }

    public function allChildren(): HasMany
    {
        return $this->children()->with('allChildren');
    }

    public function codeSnippets(): HasMany
    {
        return $this->hasMany(CodeSnippet::class)->orderBy('order');
    }

    public function progress(): HasMany
    {
        return $this->hasMany(ChapterProgress::class);
    }

    // Dynamic Attributes
    protected function fullNumber(): Attribute
    {
        return Attribute::make(
            get: function () {
                if ($this->parent_id) {
                    $parent = $this->parent;
                    return $parent->full_number . '.' . ($this->order + 1);
                }
                return (string)($this->order + 1);
            }
        );
    }

    // Helper Methods
    public function updateLevel(): void
    {
        if ($this->parent_id) {
            $parent = $this->parent;
            $this->level = $parent->level + 1;
        } else {
            $this->level = 1;
        }
    }

    public function getNextOrder(): int
    {
        $maxOrder = static::where('course_id', $this->course_id)
            ->where('parent_id', $this->parent_id)
            ->max('order');

        return $maxOrder !== null ? $maxOrder + 1 : 0;
    }

    public function getDepth(): int
    {
        $depth = 0;
        $current = $this;
        
        while ($current->parent_id) {
            $depth++;
            $current = $current->parent;
        }
        
        return $depth;
    }

    public function canHaveChildren(): bool
    {
        return $this->level < 5; // Maximum 5 levels
    }

    public function getAncestors(): array
    {
        $ancestors = [];
        $current = $this->parent;
        
        while ($current) {
            $ancestors[] = $current;
            $current = $current->parent;
        }
        
        return array_reverse($ancestors);
    }

    public function getBreadcrumb(): string
    {
        $ancestors = $this->getAncestors();
        $breadcrumb = collect($ancestors)->pluck('title')->push($this->title);
        
        return $breadcrumb->join(' > ');
    }

    // Insertion helpers for graphical management
    public function insertAbove(array $data): self
    {
        // Shift all siblings at same level with order >= this chapter's order
        static::where('course_id', $this->course_id)
            ->where('parent_id', $this->parent_id)
            ->where('order', '>=', $this->order)
            ->increment('order');

        // Create new chapter
        return static::create(array_merge($data, [
            'course_id' => $this->course_id,
            'parent_id' => $this->parent_id,
            'order' => $this->order,
        ]));
    }

    public function insertBelow(array $data): self
    {
        // Shift all siblings at same level with order > this chapter's order
        static::where('course_id', $this->course_id)
            ->where('parent_id', $this->parent_id)
            ->where('order', '>', $this->order)
            ->increment('order');

        // Create new chapter
        return static::create(array_merge($data, [
            'course_id' => $this->course_id,
            'parent_id' => $this->parent_id,
            'order' => $this->order + 1,
        ]));
    }

    public function insertSubAbove(array $data): self
    {
        // Shift all children with order >= 0 (all of them)
        static::where('course_id', $this->course_id)
            ->where('parent_id', $this->id)
            ->where('order', '>=', 0)
            ->increment('order');

        // Create new sub-chapter as first child
        return static::create(array_merge($data, [
            'course_id' => $this->course_id,
            'parent_id' => $this->id,
            'order' => 0,
        ]));
    }

    public function insertSubBelow(array $data): self
    {
        // Get max order among children
        $maxOrder = static::where('course_id', $this->course_id)
            ->where('parent_id', $this->id)
            ->max('order');

        // Create new sub-chapter as last child
        return static::create(array_merge($data, [
            'course_id' => $this->course_id,
            'parent_id' => $this->id,
            'order' => $maxOrder !== null ? $maxOrder + 1 : 0,
        ]));
    }
}

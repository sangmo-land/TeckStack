<?php

namespace App\Filament\Resources\Courses\Pages;

use App\Filament\Resources\Courses\CourseResource;
use App\Models\Course;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListCourses extends ListRecords
{
    protected static string $resource = CourseResource::class;

    protected string $view = 'filament.resources.courses.pages.list-courses';

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make()
                ->label('Create Course')
                ->icon('heroicon-o-plus-circle')
                ->color('primary'),
        ];
    }

    public function getTotalCourses(): int
    {
        return Course::count();
    }

    public function getPublishedCourses(): int
    {
        return Course::where('is_published', true)->count();
    }

    public function getDraftCourses(): int
    {
        return Course::where('is_published', false)->count();
    }

    public function getTotalEnrollments(): int
    {
        return Course::withCount('enrollments')->get()->sum('enrollments_count');
    }
}

<?php

namespace Tests\Feature;

use App\Models\Course;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class CoursesFilterTest extends TestCase
{
    use RefreshDatabase;

    public function test_courses_index_filters_by_query_instructor(): void
    {
        $u1 = User::factory()->create(['name' => 'Instructor One']);
        $u2 = User::factory()->create(['name' => 'Instructor Two']);

        $c1 = Course::create([
            'instructor_id' => $u1->id,
            'title' => 'Course A',
            'slug' => 'course-a',
            'description' => 'Desc A',
            'overview' => 'Overview A',
            'category' => 'Databases',
            'level' => 'beginner',
            'price' => 10,
            'thumbnail_url' => null,
            'cover_image' => null,
            'total_duration' => 60,
            'total_students' => 0,
            'rating' => 4.0,
            'is_published' => true,
            'published_at' => now(),
            'language' => 'english',
            'learning_outcomes' => [],
            'requirements' => [],
        ]);

        $c2 = Course::create([
            'instructor_id' => $u2->id,
            'title' => 'Course B',
            'slug' => 'course-b',
            'description' => 'Desc B',
            'overview' => 'Overview B',
            'category' => 'Cloud',
            'level' => 'beginner',
            'price' => 20,
            'thumbnail_url' => null,
            'cover_image' => null,
            'total_duration' => 120,
            'total_students' => 0,
            'rating' => 4.5,
            'is_published' => true,
            'published_at' => now(),
            'language' => 'english',
            'learning_outcomes' => [],
            'requirements' => [],
        ]);

        $response = $this->get('/courses?instructor=' . $u1->id);
        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Courses/Index')
            ->where('filters.instructor', (string) $u1->id)
            ->has('courses.data', 1)
            ->where('courses.data.0.slug', $c1->slug)
        );
    }

    public function test_courses_index_filters_by_path_instructor(): void
    {
        $u1 = User::factory()->create(['name' => 'Instructor One']);
        $u2 = User::factory()->create(['name' => 'Instructor Two']);

        $c1 = Course::create([
            'instructor_id' => $u1->id,
            'title' => 'Course A',
            'slug' => 'course-a',
            'description' => 'Desc A',
            'overview' => 'Overview A',
            'category' => 'Databases',
            'level' => 'beginner',
            'price' => 10,
            'thumbnail_url' => null,
            'cover_image' => null,
            'total_duration' => 60,
            'total_students' => 0,
            'rating' => 4.0,
            'is_published' => true,
            'published_at' => now(),
            'language' => 'english',
            'learning_outcomes' => [],
            'requirements' => [],
        ]);

        $c2 = Course::create([
            'instructor_id' => $u2->id,
            'title' => 'Course B',
            'slug' => 'course-b',
            'description' => 'Desc B',
            'overview' => 'Overview B',
            'category' => 'Cloud',
            'level' => 'beginner',
            'price' => 20,
            'thumbnail_url' => null,
            'cover_image' => null,
            'total_duration' => 120,
            'total_students' => 0,
            'rating' => 4.5,
            'is_published' => true,
            'published_at' => now(),
            'language' => 'english',
            'learning_outcomes' => [],
            'requirements' => [],
        ]);

        $response = $this->get('/courses/instructors=' . $u2->id);
        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Courses/Index')
            ->where('filters.instructor', (string) $u2->id)
            ->has('courses.data', 1)
            ->where('courses.data.0.slug', $c2->slug)
        );
    }
}

<?php

namespace Tests\Feature;

use App\Models\Course;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SitemapTest extends TestCase
{
    use RefreshDatabase;

    public function test_sitemap_includes_static_pages_and_courses(): void
    {
        $instructor = User::factory()->create();

        $course = Course::create([
            'instructor_id' => $instructor->id,
            'title' => 'SEO Test Course',
            'slug' => 'seo-test-course',
            'description' => 'Desc',
            'overview' => 'Overview',
            'category' => 'Testing',
            'level' => 'beginner',
            'price' => 0,
            'thumbnail_url' => null,
            'cover_image' => null,
            'total_duration' => 10,
            'total_students' => 0,
            'rating' => 0,
            'is_published' => true,
            'published_at' => now(),
            'language' => 'english',
            'learning_outcomes' => [],
            'requirements' => [],
        ]);

        $response = $this->get('/sitemap.xml');
        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'application/xml');
        $content = $response->getContent();
        $base = rtrim(config('app.url') ?? '', '/');

        $this->assertStringContainsString('<loc>' . $base . '/' . '</loc>', $content);
        $this->assertStringContainsString('<loc>' . $base . '/courses' . '</loc>', $content);
        $this->assertStringContainsString('<loc>' . $base . '/instructors' . '</loc>', $content);
        $this->assertStringContainsString($base . '/courses/' . $course->slug, $content);
    }
}

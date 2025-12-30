<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $base = config('app.url') ?? '';
        $urls = [];

        $push = function (string $loc, ?string $lastmod = null) use (&$urls, $base) {
            $loc = rtrim($base, '/') . $loc;
            $urls[] = [
                'loc' => $loc,
                'lastmod' => $lastmod,
                'changefreq' => 'weekly',
                'priority' => '0.8',
            ];
        };

        // Static pages
        $push('/');
        $push('/courses');
        $push('/instructors');
        $push('/about');
        $push('/contact');
        $push('/pricing');

        // Courses
        $courses = Course::where('is_published', true)->select(['slug', 'updated_at'])->get();
        foreach ($courses as $course) {
            $push('/courses/' . $course->slug, optional($course->updated_at)->toAtomString());
        }

        $xml = \view('sitemap', ['urls' => $urls])->render();
        return response($xml, 200)->header('Content-Type', 'application/xml');
    }
}

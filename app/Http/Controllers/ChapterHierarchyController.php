<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Models\CodeSnippet;
use Illuminate\Http\Request;

class ChapterHierarchyController extends Controller
{
    public function create(Request $request)
    {
        $data = $request->validate([
            'course_id' => 'required|integer|exists:courses,id',
            'title' => 'required|string|max:255',
        ]);

        try {
            // Get the count of root chapters to determine if this is the first
            $existingChapters = Chapter::where('course_id', $data['course_id'])
                ->whereNull('parent_id')
                ->count();

            // First chapter gets order 0, subsequent chapters use auto-increment
            $order = $existingChapters === 0 ? 0 : null;

            $newChapter = Chapter::create([
                'course_id' => $data['course_id'],
                'title' => $data['title'],
                'description' => '',
                'content' => '',
                'duration_minutes' => 0,
                'is_published' => false,
                'is_free' => false,
                'order' => $order,
            ]);

            return redirect()
                ->route('dashboard', ['course_id' => $data['course_id']])
                ->with('status', "Chapter '{$newChapter->title}' created successfully");
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to create chapter: ' . $e->getMessage()]);
        }
    }

    public function insert(Request $request, Chapter $chapter)
    {
        $data = $request->validate([
            'position' => 'required|in:sibling_before,sibling_after,child_before,child_after',
            'title' => 'required|string|max:255',
        ]);

        $payload = [
            'course_id' => $chapter->course_id,
            'title' => $data['title'],
            'description' => $request->input('description'),
            'content' => $request->input('content'),
            'duration_minutes' => $request->input('duration_minutes'),
            'video_url' => $request->input('video_url'),
            'is_published' => false,
            'is_free' => false,
        ];

        $newChapter = match ($data['position']) {
            'sibling_before' => $chapter->insertAbove($payload),
            'sibling_after' => $chapter->insertBelow($payload),
            'child_before' => $chapter->insertSubAbove($payload),
            'child_after' => $chapter->insertSubBelow($payload),
        };

        return redirect()
            ->route('dashboard', ['course_id' => $chapter->course_id])
            ->with('status', "Chapter '{$newChapter->title}' added");
    }

    public function storeSnippet(Request $request, Chapter $chapter)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'language' => 'required|string|in:javascript,typescript,python,php,html,css,sql,java,cpp,csharp',
            'code' => 'required|string',
        ]);

        $maxOrder = CodeSnippet::where('chapter_id', $chapter->id)->max('order');

        $snippet = CodeSnippet::create([
            'chapter_id' => $chapter->id,
            'title' => $data['title'],
            'language' => $data['language'],
            'code' => $data['code'],
            'order' => $maxOrder !== null ? $maxOrder + 1 : 0,
            'is_executable' => false,
        ]);

        return redirect()
            ->back()
            ->with('status', "Code snippet '{$snippet->title}' added successfully");
    }

    public function destroy(Chapter $chapter)
    {
        $courseId = $chapter->course_id;
        $chapterTitle = $chapter->title;
        
        $chapter->delete();

        return redirect()
            ->route('dashboard', ['course_id' => $courseId])
            ->with('status', "Chapter '{$chapterTitle}' deleted successfully");
    }
}

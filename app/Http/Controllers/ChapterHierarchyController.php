<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use App\Models\CodeSnippet;
use App\Models\Course;
use Illuminate\Http\Request;

class ChapterHierarchyController extends Controller
{
    /**
     * Only the course's own instructor (or an admin) may reshape its chapters.
     * The hierarchy tool is reachable from the course editor now, so these
     * endpoints can no longer assume the caller is an admin.
     */
    private function authorizeCourse(int $courseId): void
    {
        $user = auth()->user();

        if ($user->isAdmin()) {
            return;
        }

        $ownsCourse = Course::where('id', $courseId)
            ->where('instructor_id', $user->id)
            ->exists();

        abort_unless($ownsCourse, 403, 'You can only manage chapters for your own courses.');
    }

    /**
     * The hierarchy tool lives on more than one page (admin dashboard, course
     * editor), so return the user to whichever one launched the action rather
     * than always bouncing them to the dashboard.
     */
    private function backToOrigin(int $courseId)
    {
        $previous = url()->previous();
        $previousPath = parse_url($previous, PHP_URL_PATH) ?: '';

        if ($previousPath === '' || $previousPath === '/') {
            return redirect()->route('dashboard', ['course_id' => $courseId]);
        }

        return redirect()->to($previous);
    }

    public function create(Request $request)
    {
        $data = $request->validate([
            'course_id' => 'required|integer|exists:courses,id',
            'title' => 'required|string|max:255',
        ]);

        $this->authorizeCourse($data['course_id']);

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

            return $this->backToOrigin($data['course_id'])
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

        $this->authorizeCourse($chapter->course_id);

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

        return $this->backToOrigin($chapter->course_id)
            ->with('status', "Chapter '{$newChapter->title}' added");
    }

    public function storeSnippet(Request $request, Chapter $chapter)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'language' => 'required|string|in:javascript,typescript,python,php,html,css,sql,java,cpp,csharp',
            'code' => 'required|string',
        ]);

        $this->authorizeCourse($chapter->course_id);

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
        $this->authorizeCourse($chapter->course_id);

        $courseId = $chapter->course_id;
        $chapterTitle = $chapter->title;

        $chapter->delete();

        return $this->backToOrigin($courseId)
            ->with('status', "Chapter '{$chapterTitle}' deleted successfully");
    }
}

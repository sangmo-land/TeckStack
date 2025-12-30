<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('lessons', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('module_id');
            $table->string('title');
            $table->text('description')->nullable();
            $table->longText('content')->nullable(); // Markdown or rich text
            $table->string('video_url')->nullable();
            $table->string('video_thumbnail')->nullable();
            $table->unsignedInteger('duration')->default(0); // in minutes
            $table->unsignedInteger('order')->default(1);
            $table->string('lesson_type')->default('video'); // video, quiz, assignment, resource
            $table->json('resources')->nullable(); // attachments, slides, etc.
            $table->boolean('is_free')->default(false);
            $table->timestamps();
            $table->softDeletes();
            
            $table->foreign('module_id')->references('id')->on('modules')->onDelete('cascade');
            $table->index('module_id');
            $table->unique(['module_id', 'order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lessons');
    }
};

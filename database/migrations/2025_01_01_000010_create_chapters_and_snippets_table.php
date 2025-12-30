<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('chapters', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained()->cascadeOnDelete();
            $table->foreignId('parent_id')->nullable()->constrained('chapters')->cascadeOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->longText('content')->nullable();
            $table->integer('order')->default(0);
            $table->integer('level')->default(1); // 1-5 depth levels
            // full_number is now a virtual/computed attribute, not stored in DB
            $table->integer('duration_minutes')->nullable();
            $table->string('video_url')->nullable();
            $table->boolean('is_published')->default(false);
            $table->boolean('is_free')->default(false);
            $table->timestamps();
            
            $table->index(['course_id', 'parent_id']);
            $table->index(['course_id', 'order']);
        });

        Schema::create('code_snippets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('chapter_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->longText('code');
            $table->string('language')->default('mysql'); // mysql, php, javascript, etc.
            $table->integer('order')->default(0);
            $table->boolean('is_executable')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('code_snippets');
        Schema::dropIfExists('chapters');
    }
};

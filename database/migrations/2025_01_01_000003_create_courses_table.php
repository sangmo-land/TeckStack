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
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('instructor_id');
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->longText('overview');
            $table->string('category'); // AWS, Oracle, Database Management, etc.
            $table->string('level')->default('beginner'); // beginner, intermediate, advanced
            $table->decimal('price', 8, 2);
            $table->string('thumbnail_url')->nullable();
            $table->string('cover_image')->nullable();
            $table->unsignedInteger('total_duration')->default(0); // in minutes
            $table->unsignedInteger('total_students')->default(0);
            $table->decimal('rating', 3, 2)->default(0);
            $table->boolean('is_published')->default(false);
            $table->dateTime('published_at')->nullable();
            $table->string('language')->default('english');
            $table->text('learning_outcomes')->nullable(); // JSON
            $table->text('requirements')->nullable(); // JSON
            $table->timestamps();
            $table->softDeletes();
            
            $table->foreign('instructor_id')->references('id')->on('users')->onDelete('cascade');
            $table->index('category');
            $table->index('level');
            $table->index('is_published');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};

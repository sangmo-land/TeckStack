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
        Schema::create('instructors', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->unique();
            $table->string('name');
            $table->string('role_title')->nullable();
            $table->json('expertise')->nullable();
            $table->decimal('rating', 3, 2)->default(0);
            $table->unsignedInteger('students')->default(0);
            $table->unsignedInteger('courses')->default(0);
            $table->text('bio')->nullable();
            $table->string('image')->nullable();
            $table->string('gradient')->nullable();
            $table->json('certifications')->nullable();
            $table->unsignedSmallInteger('years_experience')->default(0);
            $table->json('companies')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('instructors');
    }
};

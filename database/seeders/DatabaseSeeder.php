<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Seeders\InstructorSeeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create or update admin user
        User::updateOrCreate(
            ['email' => 'admin@mail.com'],
            [
                'name' => 'Admin User',
                'password' => bcrypt('password'),
                'role' => 'admin',
                'is_email_verified' => true,
            ]
        );

        // Create secondary admin user
        User::firstOrCreate(
            ['email' => 'admin2@mail.com'],
            [
                'name' => 'Admin Two',
                'password' => bcrypt('admin2'),
                'role' => 'admin',
                'is_email_verified' => true,
            ]
        );

        // Create student user
        User::firstOrCreate(
            ['email' => 'student@mail.com'],
            [
                'name' => 'Student User',
                'password' => bcrypt('student'),
                'role' => 'student',
                'is_email_verified' => true,
            ]
        );

        // Create teacher user
        User::firstOrCreate(
            ['email' => 'teacher@mail.com'],
            [
                'name' => 'Teacher User',
                'password' => bcrypt('teacher'),
                'role' => 'instructor',
                'is_email_verified' => true,
            ]
        );

        // Keep existing test user
        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => bcrypt('password')
            ]
        );

        // Seed courses
        $this->call([
            DatabaseMySQLCourseSeeder::class,
            DatabaseOracleCourseSeeder::class,
            InstructorSeeder::class,
        ]);
    }
}

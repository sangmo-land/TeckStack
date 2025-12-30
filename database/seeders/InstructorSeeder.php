<?php

namespace Database\Seeders;

use App\Models\Instructor;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class InstructorSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();

        $primaryInstructor = User::firstOrCreate(
            ['email' => 'michael.chen@mail.com'],
            [
                'name' => 'Michael Chen',
                'password' => bcrypt('password'),
                'role' => 'instructor',
                'is_email_verified' => true,
            ]
        );

        $gradients = [
            'from-blue-500 to-cyan-600',
            'from-purple-500 to-pink-600',
            'from-green-500 to-teal-600',
            'from-orange-500 to-red-600',
            'from-indigo-500 to-purple-600',
            'from-yellow-500 to-orange-600',
        ];

        $expertisePool = [
            'Cloud Computing',
            'Database Management',
            'Web Development',
            'Data Science',
            'Cybersecurity',
            'DevOps',
            'Mobile Development',
            'Blockchain',
            'AI/ML',
        ];

        $certificationsPool = [
            'AWS Solutions Architect',
            'Oracle Certified Master',
            'PostgreSQL Professional',
            'Kubernetes Administrator',
            'TensorFlow Developer',
            'CEH',
            'CISSP',
        ];

        $instructors = User::where('role', 'instructor')->get();

        foreach ($instructors as $index => $user) {
            $isPrimary = $user->email === 'michael.chen@mail.com';

            $expertise = $isPrimary
                ? ['Database Management', 'Oracle', 'PostgreSQL']
                : $faker->randomElements($expertisePool, rand(2, 3));

            $certifications = $isPrimary
                ? ['Oracle Certified Master', 'PostgreSQL Professional']
                : $faker->randomElements($certificationsPool, rand(1, 3));

            $companies = $isPrimary
                ? ['Oracle', 'SAP', 'Salesforce']
                : $faker->randomElements([
                    'Google', 'Amazon', 'Microsoft', 'Meta', 'Netflix', 'IBM', 'Oracle', 'SAP', 'Salesforce', 'Cisco'
                ], rand(2, 4));

            $payload = $isPrimary
                ? [
                    'name' => 'Michael Chen',
                    'role_title' => 'Database Expert',
                    'expertise' => $expertise,
                    'rating' => 4.8,
                    'students' => 9800,
                    'courses' => 15,
                    'bio' => 'Oracle certified master with extensive experience in database design, optimization, and administration. Published author on database systems.',
                    'image' => 'MC',
                    'gradient' => 'from-purple-500 to-pink-600',
                    'certifications' => $certifications,
                    'years_experience' => 12,
                    'companies' => $companies,
                ]
                : [
                    'name' => $user->name,
                    'role_title' => $faker->jobTitle(),
                    'expertise' => $expertise,
                    'rating' => $faker->randomFloat(1, 4.5, 5),
                    'students' => $faker->numberBetween(5000, 20000),
                    'courses' => $faker->numberBetween(5, 20),
                    'bio' => $faker->paragraph(2),
                    'image' => Str::upper(substr($user->name, 0, 2)),
                    'gradient' => $gradients[$index % count($gradients)],
                    'certifications' => $certifications,
                    'years_experience' => $faker->numberBetween(5, 20),
                    'companies' => $companies,
                ];

            Instructor::updateOrCreate(
                ['user_id' => $user->id],
                $payload
            );
        }
    }
}

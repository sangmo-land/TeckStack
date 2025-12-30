<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Chapter;
use App\Models\CodeSnippet;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseMySQLCourseSeeder extends Seeder
{
    public function run(): void
    {
        // Find or create an instructor
        $instructor = User::where('role', 'instructor')->first() ?? User::factory()->create([
            'name' => 'Dr. Michael Chen',
            'email' => 'michael.chen@teckstack.com',
            'role' => 'instructor',
        ]);

        // Create or update the course
        $course = Course::updateOrCreate(
            ['slug' => 'databases-with-mysql-complete-guide'],
            [
                'instructor_id' => $instructor->id,
                'title' => 'Databases with MySQL - Complete Guide',
                'description' => 'Master MySQL database management from basics to advanced concepts. Learn SQL queries, database design, optimization, and real-world applications.',
                'overview' => '<p>This comprehensive course will take you from MySQL beginner to advanced user. You will learn everything needed to design, implement, and optimize MySQL databases for real-world applications.</p>',
                'category' => 'Database Management',
                'level' => 'beginner',
                'price' => 49.99,
                'thumbnail_url' => null,
                'is_published' => true,
                'published_at' => now(),
            ]
        );

        // Chapter 1: Introduction to Databases
        $chapter1 = Chapter::create([
            'course_id' => $course->id,
            'title' => 'Introduction to Databases',
            'description' => 'Understanding database fundamentals and MySQL basics',
            'content' => '<p>Welcome to the world of databases! In this chapter, we will explore the fundamental concepts of databases and why they are essential in modern applications.</p>',
            'order' => 0,
            'is_published' => true,
            'is_free' => true,
        ]);

        // Chapter 1.1: What is a Database?
        $chapter1_1 = Chapter::create([
            'course_id' => $course->id,
            'parent_id' => $chapter1->id,
            'title' => 'What is a Database?',
            'description' => 'Understanding database concepts and terminology',
            'content' => '<p>A database is an organized collection of data stored electronically. Learn about DBMS, tables, rows, and columns.</p>',
            'order' => 0,
            'duration_minutes' => 15,
            'is_published' => true,
            'is_free' => true,
        ]);

        // Chapter 1.2: Installing MySQL
        $chapter1_2 = Chapter::create([
            'course_id' => $course->id,
            'parent_id' => $chapter1->id,
            'title' => 'Installing MySQL',
            'description' => 'Step-by-step MySQL installation guide',
            'content' => '<p>Learn how to install MySQL on Windows, macOS, and Linux systems.</p>',
            'order' => 1,
            'duration_minutes' => 20,
            'is_published' => true,
            'is_free' => true,
        ]);

        CodeSnippet::create([
            'chapter_id' => $chapter1_2->id,
            'title' => 'Check MySQL Version',
            'description' => 'Verify your MySQL installation',
            'code' => 'SELECT VERSION();',
            'language' => 'mysql',
            'order' => 0,
        ]);

        // Chapter 1.3: MySQL Tools
        $chapter1_3 = Chapter::create([
            'course_id' => $course->id,
            'parent_id' => $chapter1->id,
            'title' => 'MySQL Tools and Interfaces',
            'description' => 'MySQL Workbench, phpMyAdmin, and command line',
            'content' => '<p>Explore various tools to interact with MySQL databases.</p>',
            'order' => 2,
            'duration_minutes' => 25,
            'is_published' => true,
        ]);

        // Chapter 2: Database Design
        $chapter2 = Chapter::create([
            'course_id' => $course->id,
            'title' => 'Database Design Fundamentals',
            'description' => 'Learn how to design efficient database schemas',
            'content' => '<p>Good database design is crucial for performance and maintainability. Master the principles of database design.</p>',
            'order' => 1,
            'is_published' => true,
        ]);

        // Chapter 2.1: Entity-Relationship Diagrams
        $chapter2_1 = Chapter::create([
            'course_id' => $course->id,
            'parent_id' => $chapter2->id,
            'title' => 'Entity-Relationship Diagrams (ERD)',
            'description' => 'Visual representation of database structure',
            'content' => '<p>Learn to create ERDs to plan your database structure before implementation.</p>',
            'order' => 0,
            'duration_minutes' => 30,
            'is_published' => true,
        ]);

        // Chapter 2.2: Normalization
        $chapter2_2 = Chapter::create([
            'course_id' => $course->id,
            'parent_id' => $chapter2->id,
            'title' => 'Database Normalization',
            'description' => 'Organizing data to reduce redundancy',
            'content' => '<p>Understand the normal forms and how to normalize your database.</p>',
            'order' => 1,
            'duration_minutes' => 40,
            'is_published' => true,
        ]);

        // Chapter 2.2.1: First Normal Form (1NF)
        $chapter2_2_1 = Chapter::create([
            'course_id' => $course->id,
            'parent_id' => $chapter2_2->id,
            'title' => 'First Normal Form (1NF)',
            'description' => 'Eliminate repeating groups',
            'content' => '<p>Learn the rules of 1NF and how to apply them.</p>',
            'order' => 0,
            'duration_minutes' => 15,
            'is_published' => true,
        ]);

        // Chapter 2.2.2: Second Normal Form (2NF)
        $chapter2_2_2 = Chapter::create([
            'course_id' => $course->id,
            'parent_id' => $chapter2_2->id,
            'title' => 'Second Normal Form (2NF)',
            'description' => 'Remove partial dependencies',
            'content' => '<p>Understanding and implementing 2NF.</p>',
            'order' => 1,
            'duration_minutes' => 15,
            'is_published' => true,
        ]);

        // Chapter 2.2.3: Third Normal Form (3NF)
        $chapter2_2_3 = Chapter::create([
            'course_id' => $course->id,
            'parent_id' => $chapter2_2->id,
            'title' => 'Third Normal Form (3NF)',
            'description' => 'Eliminate transitive dependencies',
            'content' => '<p>Master 3NF for optimal database design.</p>',
            'order' => 2,
            'duration_minutes' => 20,
            'is_published' => true,
        ]);

        // Chapter 3: SQL Basics
        $chapter3 = Chapter::create([
            'course_id' => $course->id,
            'title' => 'SQL Query Language',
            'description' => 'Master SQL commands and queries',
            'content' => '<p>Structured Query Language (SQL) is the standard language for database operations.</p>',
            'order' => 2,
            'is_published' => true,
        ]);

        // Chapter 3.1: Creating Databases and Tables
        $chapter3_1 = Chapter::create([
            'course_id' => $course->id,
            'parent_id' => $chapter3->id,
            'title' => 'Creating Databases and Tables',
            'description' => 'DDL commands for database creation',
            'content' => '<p>Learn CREATE, ALTER, and DROP commands.</p>',
            'order' => 0,
            'duration_minutes' => 35,
            'is_published' => true,
        ]);

        CodeSnippet::create([
            'chapter_id' => $chapter3_1->id,
            'title' => 'Create Database',
            'description' => 'Create a new database',
            'code' => "CREATE DATABASE school_management;\nUSE school_management;",
            'language' => 'mysql',
            'order' => 0,
        ]);

        CodeSnippet::create([
            'chapter_id' => $chapter3_1->id,
            'title' => 'Create Students Table',
            'description' => 'Create a table with various data types',
            'code' => "CREATE TABLE students (\n    id INT PRIMARY KEY AUTO_INCREMENT,\n    first_name VARCHAR(50) NOT NULL,\n    last_name VARCHAR(50) NOT NULL,\n    email VARCHAR(100) UNIQUE NOT NULL,\n    date_of_birth DATE,\n    enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n    gpa DECIMAL(3,2),\n    is_active BOOLEAN DEFAULT TRUE\n);",
            'language' => 'mysql',
            'order' => 1,
        ]);

        // Chapter 3.2: Data Manipulation
        $chapter3_2 = Chapter::create([
            'course_id' => $course->id,
            'parent_id' => $chapter3->id,
            'title' => 'Data Manipulation (INSERT, UPDATE, DELETE)',
            'description' => 'Working with data in tables',
            'content' => '<p>Learn how to add, modify, and remove data from your tables.</p>',
            'order' => 1,
            'duration_minutes' => 40,
            'is_published' => true,
        ]);

        CodeSnippet::create([
            'chapter_id' => $chapter3_2->id,
            'title' => 'Insert Single Record',
            'description' => 'Add a new student to the database',
            'code' => "INSERT INTO students (first_name, last_name, email, date_of_birth, gpa)\nVALUES ('John', 'Doe', 'john.doe@email.com', '2000-05-15', 3.75);",
            'language' => 'mysql',
            'order' => 0,
        ]);

        CodeSnippet::create([
            'chapter_id' => $chapter3_2->id,
            'title' => 'Insert Multiple Records',
            'description' => 'Bulk insert operation',
            'code' => "INSERT INTO students (first_name, last_name, email, date_of_birth, gpa)\nVALUES \n    ('Jane', 'Smith', 'jane.smith@email.com', '2001-03-20', 3.90),\n    ('Mike', 'Johnson', 'mike.j@email.com', '1999-11-08', 3.50),\n    ('Sarah', 'Williams', 'sarah.w@email.com', '2000-07-12', 3.85);",
            'language' => 'mysql',
            'order' => 1,
        ]);

        CodeSnippet::create([
            'chapter_id' => $chapter3_2->id,
            'title' => 'Update Records',
            'description' => 'Modify existing data',
            'code' => "UPDATE students \nSET gpa = 3.80, is_active = TRUE \nWHERE email = 'john.doe@email.com';",
            'language' => 'mysql',
            'order' => 2,
        ]);

        CodeSnippet::create([
            'chapter_id' => $chapter3_2->id,
            'title' => 'Delete Records',
            'description' => 'Remove data from table',
            'code' => "DELETE FROM students \nWHERE is_active = FALSE AND enrollment_date < '2020-01-01';",
            'language' => 'mysql',
            'order' => 3,
        ]);

        // Chapter 3.3: Querying Data
        $chapter3_3 = Chapter::create([
            'course_id' => $course->id,
            'parent_id' => $chapter3->id,
            'title' => 'SELECT Queries',
            'description' => 'Retrieving data from databases',
            'content' => '<p>Master the SELECT statement with various clauses and conditions.</p>',
            'order' => 2,
            'duration_minutes' => 45,
            'is_published' => true,
        ]);

        CodeSnippet::create([
            'chapter_id' => $chapter3_3->id,
            'title' => 'Basic SELECT',
            'description' => 'Retrieve all columns',
            'code' => "SELECT * FROM students;",
            'language' => 'mysql',
            'order' => 0,
        ]);

        CodeSnippet::create([
            'chapter_id' => $chapter3_3->id,
            'title' => 'SELECT with WHERE',
            'description' => 'Filter results with conditions',
            'code' => "SELECT first_name, last_name, gpa \nFROM students \nWHERE gpa >= 3.5 AND is_active = TRUE;",
            'language' => 'mysql',
            'order' => 1,
        ]);

        CodeSnippet::create([
            'chapter_id' => $chapter3_3->id,
            'title' => 'SELECT with ORDER BY',
            'description' => 'Sort query results',
            'code' => "SELECT first_name, last_name, gpa \nFROM students \nORDER BY gpa DESC, last_name ASC;",
            'language' => 'mysql',
            'order' => 2,
        ]);

        // Chapter 4: Advanced SQL
        $chapter4 = Chapter::create([
            'course_id' => $course->id,
            'title' => 'Advanced SQL Techniques',
            'description' => 'Joins, subqueries, and complex operations',
            'content' => '<p>Take your SQL skills to the next level with advanced querying techniques.</p>',
            'order' => 3,
            'is_published' => true,
        ]);

        // Chapter 4.1: JOINs
        $chapter4_1 = Chapter::create([
            'course_id' => $course->id,
            'parent_id' => $chapter4->id,
            'title' => 'Table JOINs',
            'description' => 'Combining data from multiple tables',
            'content' => '<p>Learn INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL JOIN.</p>',
            'order' => 0,
            'duration_minutes' => 50,
            'is_published' => true,
        ]);

        CodeSnippet::create([
            'chapter_id' => $chapter4_1->id,
            'title' => 'INNER JOIN Example',
            'description' => 'Join students with their enrollments',
            'code' => "SELECT \n    s.first_name, \n    s.last_name, \n    c.course_name, \n    e.enrollment_date\nFROM students s\nINNER JOIN enrollments e ON s.id = e.student_id\nINNER JOIN courses c ON e.course_id = c.id\nWHERE s.is_active = TRUE;",
            'language' => 'mysql',
            'order' => 0,
        ]);

        // Chapter 4.2: Subqueries
        $chapter4_2 = Chapter::create([
            'course_id' => $course->id,
            'parent_id' => $chapter4->id,
            'title' => 'Subqueries and Nested Queries',
            'description' => 'Queries within queries',
            'content' => '<p>Use subqueries for complex data retrieval.</p>',
            'order' => 1,
            'duration_minutes' => 40,
            'is_published' => true,
        ]);

        CodeSnippet::create([
            'chapter_id' => $chapter4_2->id,
            'title' => 'Subquery in WHERE',
            'description' => 'Find students with GPA above average',
            'code' => "SELECT first_name, last_name, gpa\nFROM students\nWHERE gpa > (SELECT AVG(gpa) FROM students);",
            'language' => 'mysql',
            'order' => 0,
        ]);

        // No need to recalculate numbering - it's now dynamic!
        // Chapter numbers are computed on-the-fly from order + parent_id

        $this->command->info('MySQL Database course created successfully with hierarchical chapters!');
        $this->command->info("Course ID: {$course->id}");
        $this->command->info("Total Chapters: " . Chapter::where('course_id', $course->id)->count());
    }
}

<?php

namespace Database\Seeders;

use App\Models\Chapter;
use App\Models\CodeSnippet;
use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseOracleCourseSeeder extends Seeder
{
    public function run(): void
    {
        // Ensure instructor exists
        $instructor = User::updateOrCreate(
            ['email' => 'teacher@mail.com'],
            [
                'name' => 'Teacher User',
                'password' => bcrypt('teacher'),
                'role' => 'instructor',
                'is_email_verified' => true,
            ]
        );

        // Create or update course
        $course = Course::updateOrCreate(
            ['slug' => 'oracle-database-complete-guide'],
            [
                'instructor_id' => $instructor->id,
                'title' => 'Oracle Database Complete Guide',
                'description' => 'Learn Oracle Database fundamentals, SQL, PL/SQL, performance tuning, and backup strategies.',
                'overview' => '<p>Master Oracle Database from setup to performance tuning. Build confidence with SQL, PL/SQL, indexing, and backup/restore workflows.</p>',
                'category' => 'Database Management',
                'level' => 'intermediate',
                'price' => 59.00,
                'thumbnail_url' => null,
                'is_published' => true,
                'published_at' => now(),
            ]
        );

        // Helper to create chapter once per title
        $makeChapter = function (array $data) use ($course) {
            return Chapter::firstOrCreate(
                [
                    'course_id' => $course->id,
                    'parent_id' => $data['parent_id'] ?? null,
                    'title' => $data['title'],
                ],
                [
                    'description' => $data['description'] ?? null,
                    'content' => $data['content'] ?? null,
                    'order' => $data['order'] ?? 0,
                    'duration_minutes' => $data['duration_minutes'] ?? null,
                    'is_published' => true,
                    'is_free' => $data['is_free'] ?? false,
                ]
            );
        };

        $makeSnippet = function ($chapter, array $data) {
            return CodeSnippet::firstOrCreate(
                [
                    'chapter_id' => $chapter->id,
                    'title' => $data['title'],
                ],
                [
                    'description' => $data['description'] ?? null,
                    'code' => $data['code'],
                    'language' => $data['language'],
                    'order' => $data['order'] ?? 0,
                    'is_executable' => false,
                ]
            );
        };

        // ========== CHAPTER 1: Oracle Fundamentals ==========
        $ch1 = $makeChapter([
            'title' => 'Oracle Fundamentals and Setup',
            'description' => 'Install, connect, and understand Oracle architecture basics.',
            'order' => 0,
            'duration_minutes' => 35,
            'is_free' => true,
        ]);

        $ch1a = $makeChapter([
            'parent_id' => $ch1->id,
            'title' => 'Install Oracle XE and Client Tools',
            'description' => 'Install Oracle XE, SQLcl, and SQL Developer.',
            'order' => 0,
            'duration_minutes' => 20,
        ]);
        $makeSnippet($ch1a, [
            'title' => 'Check Oracle version',
            'language' => 'sql',
            'code' => 'SELECT * FROM v$version;',
            'order' => 0,
        ]);
        $makeSnippet($ch1a, [
            'title' => 'View database parameters',
            'language' => 'sql',
            'code' => 'SHOW PARAMETER db_name;',
            'order' => 1,
        ]);

        $ch1b = $makeChapter([
            'parent_id' => $ch1->id,
            'title' => 'Connecting with SQL*Plus and SQLcl',
            'description' => 'Connect to local PDB using common tools.',
            'order' => 1,
            'duration_minutes' => 15,
        ]);
        $makeSnippet($ch1b, [
            'title' => 'SQL*Plus connect string',
            'language' => 'bash',
            'code' => 'sqlplus system/password@//localhost:1521/XEPDB1',
            'order' => 0,
        ]);
        $makeSnippet($ch1b, [
            'title' => 'List connected users',
            'language' => 'sql',
            'code' => 'SELECT username, account_status FROM dba_users;',
            'order' => 1,
        ]);

        $ch1c = $makeChapter([
            'parent_id' => $ch1->id,
            'title' => 'Users, Roles, and Tablespaces',
            'description' => 'Create users and assign quotas.',
            'order' => 2,
            'duration_minutes' => 18,
        ]);
        $makeSnippet($ch1c, [
            'title' => 'Create user with quota',
            'language' => 'sql',
            'code' => "CREATE USER app_user IDENTIFIED BY StrongP@ss1 DEFAULT TABLESPACE users QUOTA 100M ON users;\nGRANT CONNECT, RESOURCE TO app_user;",
            'order' => 0,
        ]);
        $makeSnippet($ch1c, [
            'title' => 'List tablespaces',
            'language' => 'sql',
            'code' => 'SELECT tablespace_name, status FROM dba_tablespaces;',
            'order' => 1,
        ]);

        // ========== CHAPTER 2: SQL and PL/SQL ==========
        $ch2 = $makeChapter([
            'title' => 'SQL and PL/SQL with Oracle',
            'description' => 'Core SQL, analytic functions, and PL/SQL basics.',
            'order' => 1,
            'duration_minutes' => 45,
            'is_free' => false,
        ]);

        $ch2a = $makeChapter([
            'parent_id' => $ch2->id,
            'title' => 'Working with Sample Schemas',
            'description' => 'Explore HR sample schema quickly.',
            'order' => 0,
            'duration_minutes' => 12,
        ]);
        $makeSnippet($ch2a, [
            'title' => 'Fetch sample rows',
            'language' => 'sql',
            'code' => 'SELECT first_name, last_name, department_id FROM hr.employees FETCH FIRST 10 ROWS ONLY;',
            'order' => 0,
        ]);
        $makeSnippet($ch2a, [
            'title' => 'Count employees per department',
            'language' => 'sql',
            'code' => 'SELECT department_id, COUNT(*) FROM hr.employees GROUP BY department_id;',
            'order' => 1,
        ]);

        $ch2b = $makeChapter([
            'parent_id' => $ch2->id,
            'title' => 'Joins and Analytic Functions',
            'description' => 'Leverage window functions for insights.',
            'order' => 1,
            'duration_minutes' => 20,
        ]);
        $makeSnippet($ch2b, [
            'title' => 'Average salary by department',
            'language' => 'sql',
            'code' => "SELECT department_id, employee_id, salary,\n       AVG(salary) OVER (PARTITION BY department_id) AS avg_sal\nFROM hr.employees;",
            'order' => 0,
        ]);
        $makeSnippet($ch2b, [
            'title' => 'Inner join with department names',
            'language' => 'sql',
            'code' => "SELECT e.first_name, e.last_name, d.department_name, e.salary\nFROM hr.employees e\nINNER JOIN hr.departments d ON e.department_id = d.department_id;",
            'order' => 1,
        ]);

        $ch2c = $makeChapter([
            'parent_id' => $ch2->id,
            'title' => 'PL/SQL Blocks and Procedures',
            'description' => 'Create simple procedures and handle exceptions.',
            'order' => 2,
            'duration_minutes' => 18,
        ]);
        $makeSnippet($ch2c, [
            'title' => 'Hello PL/SQL block',
            'language' => 'sql',
            'code' => "BEGIN\n  dbms_output.put_line('Hello from PL/SQL');\nEND;\n/",
            'order' => 0,
        ]);
        $makeSnippet($ch2c, [
            'title' => 'Simple procedure',
            'language' => 'sql',
            'code' => "CREATE OR REPLACE PROCEDURE greet_user(p_name VARCHAR2) AS\nBEGIN\n  dbms_output.put_line('Hello, ' || p_name);\nEND greet_user;\n/",
            'order' => 1,
        ]);

        // ========== CHAPTER 3: Performance and Backup ==========
        $ch3 = $makeChapter([
            'title' => 'Performance and Backup Essentials',
            'description' => 'Indexing, explain plan, and backup/export basics.',
            'order' => 2,
            'duration_minutes' => 40,
            'is_free' => false,
        ]);

        $ch3a = $makeChapter([
            'parent_id' => $ch3->id,
            'title' => 'Explain Plan and Autotrace',
            'description' => 'Read execution plans and identify bottlenecks.',
            'order' => 0,
            'duration_minutes' => 15,
        ]);
        $makeSnippet($ch3a, [
            'title' => 'Explain plan for query',
            'language' => 'sql',
            'code' => "EXPLAIN PLAN FOR\nSELECT * FROM hr.employees WHERE department_id = 60;\nSELECT * FROM table(dbms_xplan.display());",
            'order' => 0,
        ]);
        $makeSnippet($ch3a, [
            'title' => 'Enable autotrace',
            'language' => 'sql',
            'code' => "SET AUTOTRACE ON EXPLAIN;\nSELECT COUNT(*) FROM hr.employees;",
            'order' => 1,
        ]);

        $ch3b = $makeChapter([
            'parent_id' => $ch3->id,
            'title' => 'Indexing Strategies',
            'description' => 'Create and validate indexes.',
            'order' => 1,
            'duration_minutes' => 12,
        ]);
        $makeSnippet($ch3b, [
            'title' => 'Create b-tree index',
            'language' => 'sql',
            'code' => 'CREATE INDEX idx_employees_dept ON hr.employees(department_id);',
            'order' => 0,
        ]);
        $makeSnippet($ch3b, [
            'title' => 'View existing indexes',
            'language' => 'sql',
            'code' => "SELECT index_name, table_name, column_name FROM dba_ind_columns WHERE table_name = 'EMPLOYEES';",
            'order' => 1,
        ]);

        $ch3c = $makeChapter([
            'parent_id' => $ch3->id,
            'title' => 'Backup and Export Basics',
            'description' => 'Use Data Pump for logical exports.',
            'order' => 2,
            'duration_minutes' => 13,
        ]);
        $makeSnippet($ch3c, [
            'title' => 'Data Pump export (expdp)',
            'language' => 'bash',
            'code' => 'expdp system/password@//localhost:1521/XEPDB1 schemas=HR dumpfile=hr.dmp directory=DATA_PUMP_DIR logfile=hr_export.log',
            'order' => 0,
        ]);
        $makeSnippet($ch3c, [
            'title' => 'Data Pump import (impdp)',
            'language' => 'bash',
            'code' => 'impdp system/password@//localhost:1521/XEPDB1 dumpfile=hr.dmp directory=DATA_PUMP_DIR logfile=hr_import.log',
            'order' => 1,
        ]);

        // ========== CHAPTER 4: Advanced Queries ==========
        $ch4 = $makeChapter([
            'title' => 'Advanced Query Techniques',
            'description' => 'CTEs, subqueries, and set operations.',
            'order' => 3,
            'duration_minutes' => 30,
            'is_free' => false,
        ]);

        $ch4a = $makeChapter([
            'parent_id' => $ch4->id,
            'title' => 'Subqueries and CTEs',
            'description' => 'Use WITH clause for cleaner queries.',
            'order' => 0,
            'duration_minutes' => 15,
        ]);
        $makeSnippet($ch4a, [
            'title' => 'CTE example',
            'language' => 'sql',
            'code' => "WITH emp_by_dept AS (\n  SELECT department_id, COUNT(*) as emp_count\n  FROM hr.employees\n  GROUP BY department_id\n)\nSELECT * FROM emp_by_dept WHERE emp_count > 5;",
            'order' => 0,
        ]);
        $makeSnippet($ch4a, [
            'title' => 'Scalar subquery',
            'language' => 'sql',
            'code' => "SELECT first_name, salary,\n       (SELECT AVG(salary) FROM hr.employees) as avg_salary\nFROM hr.employees;",
            'order' => 1,
        ]);

        $ch4b = $makeChapter([
            'parent_id' => $ch4->id,
            'title' => 'Set Operations',
            'description' => 'UNION, INTERSECT, MINUS.',
            'order' => 1,
            'duration_minutes' => 15,
        ]);
        $makeSnippet($ch4b, [
            'title' => 'UNION all employees and contractors',
            'language' => 'sql',
            'code' => "SELECT first_name, last_name, 'Employee' as type FROM hr.employees\nUNION\nSELECT ctr_first_name, ctr_last_name, 'Contractor' FROM contractors;",
            'order' => 0,
        ]);
        $makeSnippet($ch4b, [
            'title' => 'INTERSECT departments with employees',
            'language' => 'sql',
            'code' => "SELECT department_id FROM hr.employees\nINTERSECT\nSELECT department_id FROM hr.departments;",
            'order' => 1,
        ]);

        // ========== CHAPTER 5: Transactions and Locks ==========
        $ch5 = $makeChapter([
            'title' => 'Transactions and Concurrency',
            'description' => 'ACID properties, locks, and isolation levels.',
            'order' => 4,
            'duration_minutes' => 25,
            'is_free' => false,
        ]);

        $ch5a = $makeChapter([
            'parent_id' => $ch5->id,
            'title' => 'Transaction Control',
            'description' => 'COMMIT, ROLLBACK, SAVEPOINT.',
            'order' => 0,
            'duration_minutes' => 12,
        ]);
        $makeSnippet($ch5a, [
            'title' => 'Basic transaction',
            'language' => 'sql',
            'code' => "BEGIN\n  UPDATE hr.employees SET salary = salary * 1.10 WHERE department_id = 30;\n  SAVEPOINT sp1;\n  DELETE FROM hr.employees WHERE salary < 3000;\n  ROLLBACK TO sp1;\n  COMMIT;\nEND;\n/",
            'order' => 0,
        ]);

        $ch5b = $makeChapter([
            'parent_id' => $ch5->id,
            'title' => 'Locking and Deadlocks',
            'description' => 'Understand row and table locks.',
            'order' => 1,
            'duration_minutes' => 13,
        ]);
        $makeSnippet($ch5b, [
            'title' => 'View locks',
            'language' => 'sql',
            'code' => 'SELECT * FROM v$lock WHERE type = \'TM\' OR type = \'TX\';',
            'order' => 0,
        ]);
        $makeSnippet($ch5b, [
            'title' => 'Lock for update',
            'language' => 'sql',
            'code' => "SELECT * FROM hr.employees WHERE employee_id = 100 FOR UPDATE;",
            'order' => 1,
        ]);

        // ========== CHAPTER 6: Triggers and Constraints ==========
        $ch6 = $makeChapter([
            'title' => 'Triggers and Constraints',
            'description' => 'Enforce data integrity with triggers and constraints.',
            'order' => 5,
            'duration_minutes' => 28,
            'is_free' => false,
        ]);

        $ch6a = $makeChapter([
            'parent_id' => $ch6->id,
            'title' => 'Creating and Managing Triggers',
            'description' => 'BEFORE/AFTER INSERT UPDATE DELETE.',
            'order' => 0,
            'duration_minutes' => 14,
        ]);
        $makeSnippet($ch6a, [
            'title' => 'Audit trigger',
            'language' => 'sql',
            'code' => "CREATE OR REPLACE TRIGGER emp_audit_trigger\nBEFORE INSERT OR UPDATE ON hr.employees\nFOR EACH ROW\nBEGIN\n  INSERT INTO emp_audit_log (emp_id, action, change_date)\n  VALUES (:NEW.employee_id, 'MODIFIED', SYSDATE);\nEND;\n/",
            'order' => 0,
        ]);

        $ch6b = $makeChapter([
            'parent_id' => $ch6->id,
            'title' => 'Constraints and Data Validation',
            'description' => 'PRIMARY KEY, FOREIGN KEY, CHECK, UNIQUE.',
            'order' => 1,
            'duration_minutes' => 14,
        ]);
        $makeSnippet($ch6b, [
            'title' => 'Add check constraint',
            'language' => 'sql',
            'code' => "ALTER TABLE hr.employees ADD CONSTRAINT chk_salary CHECK (salary > 0);",
            'order' => 0,
        ]);
        $makeSnippet($ch6b, [
            'title' => 'View all constraints',
            'language' => 'sql',
            'code' => "SELECT constraint_name, constraint_type, table_name FROM dba_constraints WHERE table_name = 'EMPLOYEES';",
            'order' => 1,
        ]);

        // ========== CHAPTER 7: Monitoring and Tuning ==========
        $ch7 = $makeChapter([
            'title' => 'Monitoring and Performance Tuning',
            'description' => 'Use AWR, ADDM, and SQL tuning.',
            'order' => 6,
            'duration_minutes' => 35,
            'is_free' => false,
        ]);

        $ch7a = $makeChapter([
            'parent_id' => $ch7->id,
            'title' => 'AWR and ADDM Reports',
            'description' => 'Automatic Workload Repository analysis.',
            'order' => 0,
            'duration_minutes' => 17,
        ]);
        $makeSnippet($ch7a, [
            'title' => 'View AWR snapshot info',
            'language' => 'sql',
            'code' => "SELECT snap_id, snap_time FROM dba_hist_snapshot ORDER BY snap_time DESC FETCH FIRST 10 ROWS ONLY;",
            'order' => 0,
        ]);

        $ch7b = $makeChapter([
            'parent_id' => $ch7->id,
            'title' => 'SQL Tuning and Hints',
            'description' => 'Use hints to guide optimizer.',
            'order' => 1,
            'duration_minutes' => 18,
        ]);
        $makeSnippet($ch7b, [
            'title' => 'Force index usage',
            'language' => 'sql',
            'code' => "SELECT /*+ INDEX(e idx_employees_dept) */ * FROM hr.employees e WHERE department_id = 50;",
            'order' => 0,
        ]);
        $makeSnippet($ch7b, [
            'title' => 'Full table scan hint',
            'language' => 'sql',
            'code' => "SELECT /*+ FULL(e) */ * FROM hr.employees e WHERE salary > 5000;",
            'order' => 1,
        ]);
    }
}

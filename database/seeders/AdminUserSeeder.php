<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $primary = User::updateOrCreate(
            ['email' => 'mokomnelvis@yahoo.com'],
            [
                'name' => 'Mokom Nelvis',
                'password' => Hash::make('password'),
                'avatar_url' => 'https://i.pravatar.cc/300?u=mokomnelvis',
            ]
        );

        // Clean up any previous record that used the old email and keep its avatar if present
        $legacy = User::where('email', 'sangmolandry12@gmail.com')->first();
        if ($legacy && $legacy->id !== $primary->id) {
            if (!$primary->avatar_url && $legacy->avatar_url) {
                $primary->avatar_url = $legacy->avatar_url;
                $primary->save();
            }
            $legacy->delete();
        }
    }
}

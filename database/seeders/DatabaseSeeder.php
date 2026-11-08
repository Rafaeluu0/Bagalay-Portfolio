<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin login for the management pages. Change this password!
        User::firstOrCreate(
            ['email' => 'admin@example.com'],
            ['name' => 'Rafael Bagalay', 'password' => Hash::make('password')]
        );

        $this->call(ProjectSeeder::class);
    }
}

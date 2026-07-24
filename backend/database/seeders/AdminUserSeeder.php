<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'super@3gdeco.com'],
            [
                'name' => 'Super Admin',
                'phone' => null,
                'password' => 'ENV_SUPER_PASSWORD',
                'role' => 'superadmin',
                'permissions' => ['*'],
                'active' => true,
            ]
        );

        User::query()->updateOrCreate(
            ['email' => 'admin@3gdeco.com'],
            [
                'name' => 'Admin',
                'phone' => null,
                'password' => 'ENV_ADMIN_PASSWORD',
                'role' => 'admin',
                'permissions' => [
                    'dashboard',
                    'navigation',
                    'hero',
                    'about',
                    'expertise',
                    'projects',
                    'services',
                    'process',
                    'testimonials',
                    'footer',
                    'contact-offices',
                    'enquiries',
                    'profile',
                ],
                'active' => true,
            ]
        );
    }
}

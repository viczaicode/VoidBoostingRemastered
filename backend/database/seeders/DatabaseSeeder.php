<?php

namespace Database\Seeders;

use App\Models\Service;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'nickname' => 'Admin',
            'email' => 'adminfiok@gmail.com',
            'password' => Hash::make('admin123'),
            'role' => 2
        ]);

        User::factory()->create([
            'nickname' => 'Booster',
            'email' => 'boosterfiok@gmail.com',
            'password' => Hash::make('booster123'),
            'role' => 1
        ]);

        User::factory()->create([
            'nickname' => 'DefaultUser',
            'email' => 'defaultuser@gmail.com',
            'password' => Hash::make('defaultuser123'),
            'role' => 0
        ]);

        Service::create([
            'title' => "Boosting below masters",
            'description' => "rank boost desc",
            'photo' => "/kepek/rank.png"
        ]);

        Service::create([
            'title' => "Boosting above masters",
            'description' => "rank boost desc",
            'photo' => "/kepek/rank.png"
        ]);

        Service::create([
            'title' => "Coaching",
            'description' => "coaching desc",
            'photo' => "/kepek/rank.png"
        ]);  
        
    }
}

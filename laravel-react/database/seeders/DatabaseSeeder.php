<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\MoviesSeeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\GradesSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            MoviesSeeder::class,
            UserSeeder::class,
            GradesSeeder::class,
        ]);
        // \App\Models\User::factory(10)->create();
    }
}

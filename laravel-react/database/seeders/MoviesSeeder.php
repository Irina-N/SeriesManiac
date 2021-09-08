<?php

namespace Database\Seeders;

use App\Models\Movies;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;

class FilmSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = Http::get('https://api.myshows.ru/shows/top/all/');
        foreach ($data->json() as $film) {
            Movies::create([
                'title' => $film['title'],
                'ru_title' => $film['ruTitle'],
                'year' => $film['year'],
                'image' => $film['image'],
            ]);
        }
    }
}

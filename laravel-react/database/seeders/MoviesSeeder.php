<?php

namespace Database\Seeders;

use App\Models\Movies;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;

class MoviesSeeder extends Seeder
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
            $string = explode("/small", $film['image']);
            $url = implode("", $string);
            $description = Http::get('https://api.myshows.ru/shows/'.$film['id']);
            Movies::create([
                'api_id' => $film['id'],
                'title' => $film['title'],
                'ru_title' => $film['ruTitle'],
                'year' => $film['year'],
                'image' => $film['image'],
                'big_image' => $url,
                'description' => $description['description'],
            ]);
        }
    }
}

<?php

namespace Database\Seeders;

use App\Models\Grade;
use App\Models\Movies;
use Illuminate\Database\Seeder;

class GradesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = Movies::limit(200)->get();
        foreach($data as $key){
            $moviesId = rand(1, 50);
            $userId = rand(1, 10);
            $grade = rand(1, 5);
            $check = Grade::where('user_id', $userId)->where('movies_id', $moviesId)->first();
            if(!isset($check)){
                Grade::create([
                    'user_id' => $userId,
                    'movies_id' => $moviesId,
                    'grade' => $grade,
                ]);
            }
        }
    }
}

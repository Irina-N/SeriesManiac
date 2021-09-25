<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Grade;
use App\Models\Movies;
use App\Models\User;
use Illuminate\Support\Facades\Auth; 
use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Hash;

class test extends Controller
{
    public function test()
    {   
        $data['userId'] = 1;
        $userMovies = Grade::select('movies_id', 'grade')->where('user_id', $data)->get();
        
        for($a = 0; $a < count($userMovies); $a++){
            $movies[$a] = Movies::select('title', 'ru_title', 'year', 'image')->where('id', $userMovies[$a]['movies_id'])->first();
        }

        for($a = 0; $a < count($userMovies); $a++){
            $movies[$a]['grade'] = $userMovies[$a]['grade'];
        }

        return response()->json($movies, 200);
    }



    public function test2()
    {
        
    }
}

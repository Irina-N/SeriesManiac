<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Movies;

class ProfileController extends Controller
{
    public function getUserMovies(Request $request)
    {
        $data = $request->only(['userId']);
        $userMovies = Grade::select('movies_id', 'grade')->where('user_id', $data)->get();
        
        for($a = 0; $a < count($userMovies); $a++){
            $movies[$a] = Movies::select('title', 'ru_title', 'year', 'image')->where('id', $userMovies[$a]['movies_id'])->first();
        }

        for($a = 0; $a < count($userMovies); $a++){
            $movies[$a]['grade'] = $userMovies[$a]['grade'];
        }

        return response()->json($movies, 200);
    }
}

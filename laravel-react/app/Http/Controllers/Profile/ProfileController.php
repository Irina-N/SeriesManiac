<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Movies;

class ProfileController extends Controller
{
    public function getUserMovies(Request $request)
    {
        $data = $request->only(['id']);
        $userMovies = [];
        foreach($data as $key){
            array_push($userMovies, Movies::select('title', 'ru_title', 'year', 'image')->where('id', $key)->first());
        }
        return response()->json($userMovies, 200);
    }
}

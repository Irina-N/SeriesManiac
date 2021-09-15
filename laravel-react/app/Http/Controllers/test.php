<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Grade;
use App\Models\Movies;
use Illuminate\Support\Facades\Http;

class test extends Controller
{
    public function test()
    {
        $randMovies = Movies::select('title')->inRandomOrder()->limit(1)->first();
        
        return response()->json($randMovies);
    }

}

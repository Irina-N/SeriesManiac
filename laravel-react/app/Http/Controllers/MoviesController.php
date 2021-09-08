<?php

namespace App\Http\Controllers;

use App\Models\Movies;
use Illuminate\Http\Request;

class MoviesController extends Controller
{
    public function show()
    {
        return view('welcome');
    }

    public function getMovies()
    {
        return response()->json(Movies::paginate(10));
    }
}

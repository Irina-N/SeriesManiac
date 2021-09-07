<?php

namespace App\Http\Controllers;

use App\Models\Film;
use Illuminate\Http\Request;

class MoviesController extends Controller
{
    public function show()
    {
        return view('welcome');
    }

    public function getMovies()
    {
        return response()->json(Film::paginate(10));
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Film;
use Illuminate\Http\Request;

class FilmController extends Controller
{
    public function show()
    {
        return view('welcome');
    }

    public function getAllFilms()
    {
        return response()->json(Film::all());
    }
}

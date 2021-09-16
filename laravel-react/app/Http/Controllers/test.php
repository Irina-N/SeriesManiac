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
        return response()->json(Movies::select('title', 'ru_title', 'big_image', 'description')->inRandomOrder()->limit(1)->first(),200);
    }

}

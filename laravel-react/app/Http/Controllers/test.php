<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Grade;
use App\Models\Movies;
use Illuminate\Support\Facades\Http;

class test extends Controller
{
    public function test($id)
    {
        return response()->json(Movies::find($id),200);
    }

}

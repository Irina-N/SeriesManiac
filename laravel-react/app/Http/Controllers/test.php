<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Grade;
use App\Models\Movies;
use App\Models\User;
use Illuminate\Support\Facades\Auth; 

class test extends Controller
{
    public function test()
    {
        $id = 1;
        $data = 1;
        $movie = Movies::find($id);
        $grade = Grade::select('grade')->where('user_id', $data)->where('movies_id', $id)->first();
        $movie['grade'] = $grade->grade;
        
        return response()->json($movie,200);
    }



    public function test2()
    {
        
    }
}

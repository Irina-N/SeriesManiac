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
        $count = Grade::where('movies_id', 1)->get();
        return count($count);
    }



    public function test2()
    {
        
    }
}

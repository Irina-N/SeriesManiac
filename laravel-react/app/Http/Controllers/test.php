<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Grade;
use App\Models\Movies;
use App\Models\User;
use Illuminate\Support\Facades\Auth; 
use App\Http\Controllers\Auth\LoginController;

class test extends Controller
{
    public function test()
    {   
        return $data = [LoginController::class, 'getUserId'];
    }



    public function test2()
    {
        return $_POST['userId'];
    }
}

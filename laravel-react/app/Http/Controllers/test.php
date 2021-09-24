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
        $data = ['userId' => '1','login' => 'greed', 'password' => '12345678'];
        $user = User::find($data['userId']);
        $user->password = Hash::make($data['password']);
        $user->login = $data['login'];
        $user->save();
    }



    public function test2()
    {
        
    }
}

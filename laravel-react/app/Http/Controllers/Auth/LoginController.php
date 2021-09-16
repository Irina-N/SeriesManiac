<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
class LoginController extends Controller
{
    public function login(Request $requset)
    {
        $data = $requset->only(['email', 'password']);

        if(\Auth::attempt($data)){
            return response()->json(Auth::user()->only('id','login'),200);
        }
        
        if(User::where('email', $data['email'])->exists()){
            return response()->json(['password' => 'Wrong Password!'],400);
        }else{
            return response()->json(['email' => 'Wrong Email!'],400);
        }
        
    }
}

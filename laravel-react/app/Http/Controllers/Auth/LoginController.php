<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Grade;
class LoginController extends Controller
{
    public function login(Request $request)
    {
        $data = $request->only(['email', 'password']);

        if(\Auth::attempt($data)){
            $authData = Auth::user()->only('id','login');
            $movies = Grade::select('movies_id', 'grade')->where('user_id', Auth::id())->get();
            $authData['userMovies'] = $movies;
            return response()->json($authData,200);
        }
        
        if(User::where('email', $data['email'])->exists()){
            return response()->json(['message' => 'Wrong Password!'],400);
        }else{
            return response()->json(['message' => 'Wrong Email!'],400);
        }
        
    }

}

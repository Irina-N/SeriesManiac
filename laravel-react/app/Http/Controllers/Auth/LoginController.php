<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
class LoginController extends Controller
{
    public function show()
    {
        if(\Auth::check()){
            return redirect(route('home'));
        }
        return view('welcome');
    }

    public function login(Request $requset)
    {
        $formFields = $requset->only(['email', 'password']);
        $errors = [];

        if(\Auth::attempt($formFields)){
            return response()->json('success');
        }
        
        if(User::where('email', $formFields['email'])->exists()){
            array_push($errors,[
                'password' => 'Wrong Password!',
            ]);
        }else{
            array_push($errors,[
                'email' => 'Wrong Email!',
            ]);
        }

        if(!empty($errors)){
            return response()->json($errors);
        }
    }
}

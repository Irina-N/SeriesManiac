<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

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

        if(\Auth::attempt($formFields)){
            return redirect()->intended(route('home'));
        }
        
        return redirect(route('login'))->withErrors([
            'email' => 'Failed to login!'
        ]);

    }
}

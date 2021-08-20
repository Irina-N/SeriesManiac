<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facade\Auth;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function show()
    {
        if(\Auth::check()){
            return redirect(route('home'));
        }
        return view('welcome');
    }

    public function register(Request $request)
    {
        /*
        

        $validateFields = $request->validate([
            'login' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        if(User::where('email', $validateFields['email'])->exists()){
            return redirect(route('register'))->withErrors([
                'formError' => 'Failed to register user!'
            ]);
        }
        */
        
        $data = $request->all();
        $user = User::create([
            'login' => $data['login'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
        if($user){
            \Auth::login($user);
            return redirect(route('home'));
        }else{
            return redirect(route('register'))->withErrors([
                'formError' => 'Failed to register user!'
            ]);
        }
    }
}

<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facade\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

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
        $data = $request->all();
        $errors = [];
/*
        $validateFields = $request->validate([
            'login' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'password' => ['required', 'string', 'min:8'],
            'passwordConfirmation' => ['required', 'string', 'min:8'],
        ]);
*/
        if($data['password'] !== $data['passwordConfirmation']){
            array_push($errors,[
                'password' => 'Password is not correct!',
            ]);
        }
        elseif(strlen($data['password']) < 8){
            array_push($errors,[
                'password' => 'Password is too weak!',
            ]);
        }
        
        if(User::where('email', $data['email'])->exists()){
            array_push($errors,[
                'email' => 'This Email already exist!',
            ]);
        }

        if(!empty($errors)){
            return response()->json($errors);
        }

        $user = User::create([
            'login' => $data['login'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
        if($user){
            \Auth::login($user);
            return response()->json('success');
        }else{
            return response()->json([
                'formError' => 'Failed to register user!'
            ]);
        }
    }
}

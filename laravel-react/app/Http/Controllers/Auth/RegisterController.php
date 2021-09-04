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

        $validator = Validator::make($data, [
            'login' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
            'passwordConfirmation' => ['required', 'string', 'min:8'],
        ]);

        $errors = $validator->errors();

        if ($validator->fails()) {
            return response()->json($errors,400);
        }

        $user = User::create([
            'login' => $data['login'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);

        if($user){
            \Auth::login($user);
            return response()->json(\Auth::user()->only('id','login'),201);
        }else{
            return response()->json('Failed to register user!',400);
        }
    }
}

<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [LoginController::class, 'show'])->name('login');

Route::get('/singup', [RegisterController::class, 'show'])->name('register');

Route::post('/api/register', [RegisterController::class, 'register']);

Route::post('/api/login', [LoginController::class, 'login']);

Route::get('/logout', function(){
    Auth::logout();
    return redirect(route('login'));
});

Route::get('/home', function(){
    return view('welcome');
})->name('home');
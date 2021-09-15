<?php

use App\Http\Controllers\test;
use App\Http\Controllers\MoviesController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Profile\ProfileController;
use App\Http\Controllers\Profile\LogoutController;

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
/*
Route::get( '/{any}', function(){
    return view('welcome');
})->where('any', '.*');
*/
Route::get('/', [LoginController::class, 'show'])->name('login');
Route::get('/register', [RegisterController::class, 'show']);
Route::get('/test', [test::class, 'test']);
//Будут позже добавлены в /api/
Route::post('/login', [LoginController::class, 'login']);
Route::post('/register', [RegisterController::class, 'register']);

Route::group(['middleware' => 'auth'], function(){
    Route::get('/profile', [ProfileController::class, 'show'])->name('home');
    Route::get('/movies', [MoviesController::class, 'show'])->name('movies');
    Route::get('/movies/{id}', [MoviesController::class, 'show']);
    Route::get('/logout', [LogoutController::class, 'logout'])->name('logout');

    //Будут позже добавлены в /api/
    Route::put('/movies/grade', [MoviesController::class, 'grade']);
});
 
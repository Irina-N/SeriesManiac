<?php

use App\Http\Controllers\test;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Profile\ProfileController;
use App\Http\Controllers\MoviesController;
use App\Http\Controllers\Profile\LogoutController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [LoginController::class, 'login'])->name('login');
Route::post('/register', [RegisterController::class, 'register']);
Route::get('/logout', [LogoutController::class, 'logout'])->name('logout');

Route::post('/profile/movies', [ProfileController::class, 'getUserMovies']);
Route::post('/profile/edit', [ProfileController::class, 'userDataUpdate']);
Route::post('/movies', [MoviesController::class, 'getMovies']);
Route::post('/movies/search', [MoviesController::class, 'searchMovies']);
Route::get('/movies/rand', [MoviesController::class, 'getRandMovies']);
Route::put('/movies/rate', [MoviesController::class, 'grade']);
Route::post('/movies/{id}', [MoviesController::class, 'getOneMovie']);



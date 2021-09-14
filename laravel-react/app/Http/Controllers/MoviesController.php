<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Grade;
use App\Models\Movies;
use Illuminate\Support\Facades\Http;

class MoviesController extends Controller
{
    public function show()
    {
        return view('welcome');
    }

    public function getMovies()
    {
        return response()->json(Movies::paginate(10),200);
    }

    public function getOneMovie(Request $request)
    {
        $data = $request->all(); 
        $id = Movies::find($data['id'])->first('api_id');
        return Http::get('https://api.myshows.ru/shows/'.$id);
    }

    public function getRandMovies()
    {
        $id = rand(1, 500);
        $randMovies = Movies::find($id);
        return response()->json($randMovies);
    }

    public function grade(Request $request)
    {
        $data = $request->all();

        //Проверка на существования такой записи..
        $check = Grade::where(
            'user_id', $data['userId'] and 
            'movies_id', $data['movieId']
        )->exists();

        //Если такая запись уже существует мы её обновляем Если не существует то добавляем новую..
        if($check){
            $gradeId = Grade::where('user_id', $data['userId'])
                            ->where('movies_id', $data['movieId'])
                            ->first('id');
            $grade = Grade::find($gradeId['id']);
            $grade->grade = $data['userMovieGrade'];
            $grade->save();
        }else{
            //Создаём запись оценки
            $grade = Grade::create([
                'user_id' => $data['userId'],
                'movies_id' => $data['movieId'],
                'grade' => $data['userMovieGrade'],
            ]);
            //Вычисляем наш рейтинг и повышаем значение просмотра на 1 каждый раз как новый пользователь оценил фильм
            $movie = Movies::where('id', $data['movieId'])->first();
            $grades = Grade::where('movies_id', $data['movieId'])->get();
            $movie['watched'] += 1;
            $gradeSum = 0;
            foreach($grades as $grade){
                $gradeSum += $grade['grade'];
            }
            $raiting = $gradeSum / $movie['watched'];
            $movie->watched = $movie['watched'];
            $movie->raiting = $raiting;
            $movie->save();
        }

    }
}

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
        return response()->json(Movies::paginate(20),200);
    }

    public function getOneMovie(Request $request)
    {
        $id = Movies::find($request->id)->first('api_id');
        return Http::get('https://api.myshows.ru/shows/'.$id);
    }

    public function getRandMovies()
    {
        $randMovies = Movies::inRandomOrder()->limit(1)->first();
        return Http::get('https://api.myshows.ru/shows/'.$randMovies->api_id);
    }

    public function grade(Request $request)
    {
        $data = $request->all();

        //Проверка на существования такой записи..
        $grade = Grade::where('user_id', $data['userId'])->where('movies_id', $data['movieId'])->first();

        //Если такая запись уже существует мы её обновляем Если не существует то добавляем новую..
        if(isset($grade->id)){
            $grade->grade = $data['userMovieGrade'];
            $grade->save();
            $this->raiting(0);
        }else{
            //Создаём запись оценки
            $grade = Grade::create([
                'user_id' => $data['userId'],
                'movies_id' => $data['movieId'],
                'grade' => $data['userMovieGrade'],
            ]);
            //Вычисляем наш рейтинг и повышаем значение просмотра на 1 каждый раз как новый пользователь оценил фильм
            $this->raiting(1);
        }

    }

    public function raiting($add)
    {
        $movie = Movies::where('id', $data['movieId'])->first();
        $grades = Grade::where('movies_id', $data['movieId'])->get();
        $movie['watched'] += $add;
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

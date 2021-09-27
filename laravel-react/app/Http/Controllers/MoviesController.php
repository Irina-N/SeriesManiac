<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Grade;
use App\Models\Movies;
use Illuminate\Support\Facades\Http;

class MoviesController extends Controller
{
    public function getMovies(Request $request)
    {
        //return response()->json(Movies::paginate(20),200);
        $data = $request->only('counter');
        return response()->json(Movies::
        select('id', 'title', 'ru_title', 'image', 'year', 'api_rating')
        ->limit(20)
        ->offset($data['counter']*20)
        ->get(),200);
    }

    public function searchMovies(Request $request)
    {
        $query = $_GET['query'];
        $data = $request->only('counter');
        return response()->json(Movies::
        select('id', 'title', 'ru_title', 'image', 'year')
        ->where('title', 'LIKE', "%$query%")
        ->orderBy('title')
        ->limit(20)
        ->offset($data['counter']*20)
        ->get(),200);
    }

    public function getOneMovie(Request $request, $id)
    {
        $data = $request->only(['userId']);
        $movie = Movies::find($id);
        $grade = Grade::select('grade')->where('user_id', $data)->where('movies_id', $id)->first();
        if(isset($grade)){
            $movie['grade'] = $grade->grade;
        }
        if(!isset($movie)){
            return response()->json(null,404);
        }
        return response()->json($movie,200);
    }

    public function getRandMovies()
    {
        return response()->json(Movies::select('title', 'ru_title', 'big_image', 'description')->inRandomOrder()->limit(1)->first(),200);
    }

    public function grade(Request $request)
    {
        $data = $request->all();

        //Проверка на существования такой записи..
        $grade = Grade::where('user_id', $data['userId'])->where('movies_id', $data['movieId'])->first();

        //Если такая запись уже существует мы её обновляем Если не существует то добавляем новую..
        if(isset($grade->id)){
            $grade->grade = $data['userMovieRate'];
            $grade->save();
            $this->raiting(0,$data);
        }else{
            //Создаём запись оценки
            $grade = Grade::create([
                'user_id' => $data['userId'],
                'movies_id' => $data['movieId'],
                'grade' => $data['userMovieRate'],
            ]);
            //Вычисляем наш рейтинг и повышаем значение просмотра на 1 каждый раз как новый пользователь оценил фильм
            $this->raiting(1,$data);
        }
        return response()->json(null,204);
    }

    public function raiting($add, $data)
    {
        $movie = Movies::where('id', $data['movieId'])->first();
        $grades = Grade::where('movies_id', $data['movieId'])->get();
        $movie['watched'] += $add;
        if($movie['watched'] === 0){
            $movie['watched'] = 1;
        }
        $gradeSum = 0;
        foreach($grades as $grade){
            $gradeSum += $grade['grade'];
        }
        $rating = $gradeSum / $movie['watched'];
        $movie->watched = $movie['watched'];
        $movie->rating = $rating;
        $movie->save();
    }

    
}

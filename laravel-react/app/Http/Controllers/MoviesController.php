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
        select('id', 'title', 'ru_title', 'image', 'year')
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

    public function getOneMovie($id)
    {
        return response()->json(Movies::find($id),200);
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
        $gradeSum = 0;
        foreach($grades as $grade){
            $gradeSum += $grade['grade'];
        }
        $raiting = $gradeSum / $movie['watched'];
        $movie->watched = $movie['watched'];
        $movie->raiting = $raiting;
        $movie->save();
    }

    public function recomend()
    {
        $movies = Grade::where('user_id',1)->get();//<--Мои фильмы
        $usersWithIntersection = [];
        $usersWithIntersectionWeight = [];
        $filmsId = [];
        $returnData = [];
        $userFilmsSum = count($movies);

        for($i = 0; $i < count($movies); $i++){
            array_push($filmsId, $movies[$i]['movies_id']);
        }

        for($a = 0; $a < count($movies); $a++){
            $users = Grade::where('movies_id',$movies[$a]['movies_id'])->get();//<--Все пользователи которые смотрели этот один фильм
            for($b = 0; $b < count($users); $b++){
                if(!in_array($users[$b]['user_id'], $usersWithIntersection)){
                    $commonFilmsSum = 0;
                    $gradesDifSum = 0;
                    $userFilms = Grade::where('user_id', $users[$b]['user_id'])->get();//<--Все фильмы которые смотрел этот один пользователь
                    for($c = 0; $c < count($userFilms); $c++){
                        if(in_array($userFilms[$c]['movies_id'], $filmsId)){
                            $currentUserGrade = Grade::where('user_id',1)->where('movies_id',$userFilms[$c]['movies_id'])->first();//<--Моя Оценка этого фильма
                            $commonFilmsSum ++;
                            $gradesDifSum += abs(($currentUserGrade['grade'] - 3) - ($userFilms[$c]['grade'] - 3)) + 1;
                        }
                    }
                    $userMatchFactor = (($gradesDifSum / $commonFilmsSum) * (-1) + 3) / 2;
                    $commonFilmsPart =  $commonFilmsSum / $userFilmsSum;
                    $userWeight = $commonFilmsSum / $gradesDifSum * $userMatchFactor * $commonFilmsPart;
                    array_push($usersWithIntersection, $users[$b]['user_id']);
                    array_push($usersWithIntersectionWeight, $userWeight);
                }
            }
        }

        $personalRecommendations = [];
        $personalRecommendationsPoints = [];
        $recommendations = [];
        for($a = 0; $a < count($usersWithIntersection); $a++){
            $userWithIntersectionFilms = Grade::where('user_id', $usersWithIntersection[$a])->get();
            for($b = 0; $b < count($userWithIntersectionFilms); $b++){
                if(!in_array($userWithIntersectionFilms[$b]['movies_id'], $filmsId)){
                    $userGrade = Grade::where('user_id', $usersWithIntersection[$a])->where('movies_id', $userWithIntersectionFilms[$b]['movies_id'])->first();
                    if(!in_array($userWithIntersectionFilms[$b]['movies_id'], $personalRecommendations)){
                        array_push($personalRecommendations, $userWithIntersectionFilms[$b]['movies_id']);
                        array_push($personalRecommendationsPoints, ($userGrade['grade'] - 3) * $usersWithIntersectionWeight[$a]);
                    }
                    $key = array_search($userWithIntersectionFilms[$b]['movies_id'] , $personalRecommendations);
                    $personalRecommendationsPoints[$key] += (($userGrade['grade'] - 3) * $usersWithIntersectionWeight[$a]);
                }
            }
        }
        
        for($a = 0; $a < count($personalRecommendations); $a++){
            $recommendations += [$personalRecommendations[$a] => $personalRecommendationsPoints[$a]];
        }

        arsort($recommendations);

        foreach($recommendations as $key){
            array_push($returnData, Movies::select('id', 'title', 'ru_title', 'image', 'year')->where('id', key($recommendations))->first());
            next($recommendations);
        }

        return response()->json($returnData,200);
    }
}

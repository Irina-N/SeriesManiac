<?php

namespace App\Http\Controllers;

use App\Models\Movies;
use Illuminate\Http\Request;
use App\Models\Grade;

class MoviesController extends Controller
{
    public function show()
    {
        return view('welcome');
    }

    public function getMovies()
    {
        return response()->json(Movies::paginate(10));
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
            $gradeId = Grade::where('user_id', $data['userId'])->where('movies_id', $data['movieId'])->get('id');
            $grade = Grade::find($gradeId[0]['id']);
            $grade->grade = $data['userMovieGrade'];
            $grade->save();
        }else{
            $grade = Grade::create([
                'user_id' => $data['userId'],
                'movies_id' => $data['movieId'],
                'grade' => $data['userMovieGrade'],
            ]);  
        }
    }
}

import React from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import Header from '../../Header/Header';
import MovieRateForm from '../MovieRateForm/MovieRateForm';
import './MovieCard.css';

export default function MovieCard() {
    const params = useParams();
    
    const movieId = Number(params.movieId);
    const userId = useSelector(state => state.currentUserReducer.user.id);
    const currentMovie = useSelector(state => state.moviesReducer.movies).find((movie) => movie.id == movieId);
    const {ru_title, title, image, year} = currentMovie;       
       
        
    return (
        <div className='content'> 
           <Header/>              
        	<div className='movie-card'>                
                <img src={image}></img>
                <h4>{ru_title} ({title})</h4>
                <p>{year}</p> 
                <MovieRateForm 
                    movieId={movieId}
                    userId={userId}/>                
                <button id='to-bookmarks-btn' type='button' className='btn to-bookmarks-btn'>
                    В закладки
                </button>              
            </div>
                         
        </div>         
    );
}

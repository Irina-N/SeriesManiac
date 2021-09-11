import React, {useCallback, useState, useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import { useParams, useHistory, Link} from 'react-router-dom';
import Header from '../../Header/Header';
import {FETCH_URL} from '../../../common/constants/constants';
import {sendMovieGrade} from '../../../store/actions/movies'
import './MovieCard.css';

export default function MovieCard() {
    const params = useParams();
    //const history = useHistory();
    const dispatch = useDispatch();    
    const movieId = Number(params.movieId);
    const userId = useSelector(state => state.currentUserReducer.user.id);
    const [userMovieGrade, setUserMovieGrade] = useState('');
    const currentMovie = useSelector(state => state.moviesReducer.movies.data).find((movie) => movie.id == movieId);
    const {ru_title, title, image, year} = currentMovie;

    const handleInputChange = useCallback((e) => {
        const target = e.target;
        if (target.type === 'radio' && target.checked) {
            setUserMovieGrade(Number(target.value));
        }    
    });

    const isDisabled = () => {
        if (typeof userMovieGrade === 'number') {
            return false
        } 
        return true;        
    }     

    const handleSubmit = useCallback((e) => {
        e.preventDefault();   
        const formData = {userId, movieId, userMovieGrade}; 
        console.log(formData);
        dispatch(sendMovieGrade(formData, FETCH_URL.SEND_GRADE));
        
             
    }, [dispatch, userId, movieId, userMovieGrade]);
    
    return (
        <div className='content'> 
           <Header/>              
        	<div className='movie-card'>                
                <img src={image}></img>
                <h4>{ru_title} ({title})</h4>
                <p>{year}</p> 
                <form name='movieGrade' className='form__movie-grade' onSubmit={handleSubmit} >

                    <input type='radio' id='movieGrade1' name='userMovieGrade' value='1' onChange={handleInputChange}/>                    
                    <label htmlFor="movieGrade1">Не осилил(а)</label>

                    <input type='radio' id='movieGrade2' name='userMovieGrade' value='2' onChange={handleInputChange}/>
                    <label htmlFor="movieGrade2">Жаль потраченного времени</label>

                    <input type='radio' id='movieGrade3' name='userMovieGrade' value='3' onChange={handleInputChange}/>
                    <label htmlFor="movieGrade3">Что-то понравилось, что-то - нет</label>

                    <input type='radio' id='movieGrade4' name='userMovieGrade' value='4' onChange={handleInputChange}/>
                    <label htmlFor="movieGrade4">Посмотрел(а) с удовольствием</label>

                    <input type='radio' id='movieGrade5' name='userMovieGrade' value='5' onChange={handleInputChange}/>
                    <label htmlFor="movieGrade5">Вау!</label>

                    <input type='submit' value='Оценить' disabled={isDisabled()}></input> 
                </form>
                
                <button id='to-bookmarks-btn' type='button' className='btn to-bookmarks-btn'>
                    В закладки
                </button>              
            </div>
                         
        </div>         
    );
}

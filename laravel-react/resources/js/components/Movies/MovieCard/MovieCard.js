import React, {useCallback, useState, useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import { useParams, useHistory, Link} from 'react-router-dom';
import Header from '../../Header/Header';
import {FETCH_URL} from '../../../common/constants/constants';
import {sendMovieGrade} from '../../../store/actions/movies'
import './MovieCard.css';

export default function MovieCard() {
    const params = useParams();
    const history = useHistory();
    const dispatch = useDispatch();   

    const movieId = Number(params.movieId);
    const userId = useSelector(state => state.currentUserReducer.user.id);
    const currentMovie = useSelector(state => state.moviesReducer.movies.data).find((movie) => movie.id == movieId);
    const {ru_title, title, image, year} = currentMovie;
    
    const [userMovieGrade, setUserMovieGrade] = useState('');
    const [isRated, setIsRated] = useState(false);    
       
    const handleInputChange = useCallback((e) => {
        const target = e.target;
        if (target.type === 'radio' && target.checked) {
            setUserMovieGrade(Number(target.value));
        }    
    });

    const handleSubmit = useCallback((e) => {
        e.preventDefault();   
        const formData = {userId, movieId, userMovieGrade}; 
        console.log(formData);
        dispatch(sendMovieGrade(formData, FETCH_URL.SEND_GRADE));          
    }, [dispatch, userId, movieId, userMovieGrade]);

    const handleOnMouseEnter = useCallback((e) => {
        if (!isRated) {
            const currentGrade = Number(e.target.parentElement.attributes.grade.value);
            const form = e.target.parentElement.parentElement;
            [].forEach.call(form.children, function(elem) {
                if (elem.nodeName === 'LABEL' && Number(elem.attributes.grade.value) <= currentGrade) {
                    elem.style.color = '#ffe066';
                };             
            });             
        }        
    });



    const handleOnMouseLeave = useCallback((e) => {
        if (!isRated) {
            const form = e.target.parentElement.parentElement;
            [].forEach.call(form.children, function(elem) {
                if (elem.nodeName === 'LABEL' ) {
                    elem.style.color = '#ccccb3';
                };             
            });           
        }        
    });

    const handleOnClick = useCallback((e) => {
        const currentGrade = Number(e.target.
        parentElement.attributes.grade.value);        
        const form = e.target.parentElement.parentElement;
        [].forEach.call(form.children, function(elem) {
            if (elem.nodeName === 'LABEL' && Number(elem.attributes.grade.value) <= currentGrade) {
                elem.style.color = '#ffa500';
            } else if (elem.nodeName === 'LABEL') {
                elem.style.color = '#ccccb3';
            };             
        });         
        setIsRated(true);
    });

    const _changeStarsColor = (e, color) => {
        const currentGrade = e.type === 'mouseleave' ? 6 : Number(e.target.
        parentElement.attributes.grade.value);
        const form = e.target.parentElement.parentElement;
        [].forEach.call(form.children, function(elem) {
            if (elem.nodeName === 'LABEL' && Number(elem.attributes.grade.value) <= currentGrade) {
                elem.style.color = color;
            };             
        });        
    }
    
    return (
        <div className='content'> 
           <Header/>              
        	<div className='movie-card'>                
                <img src={image}></img>
                <h4>{ru_title} ({title})</h4>
                <p>{year}</p> 
                <form name='movieGrade' className='form__movie-grade' onSubmit={handleSubmit} >

                    <input type='radio' id='movieGrade1' name='userMovieGrade' value='1' onChange={handleInputChange}/>                    
                    <label 
                        id='movieGradeLable1'
                        grade='1'
                        htmlFor="movieGrade1" 
                        hint='Не осилил(а)'> 
                            <i 
                            className="fas fa-star fa-3x"
                            onMouseEnter={handleOnMouseEnter}
                            onMouseLeave={handleOnMouseLeave}
                            onClick={handleOnClick}>
                            </i>
                    </label>

                    <input type='radio' id='movieGrade2' name='userMovieGrade' value='2' onChange={handleInputChange}/>
                    <label 
                        id='movieGradeLable2'
                        grade='2'
                        htmlFor="movieGrade2" 
                        hint='Жаль потраченного времени'> 
                            <i 
                            className="fas fa-star fa-3x"
                            onMouseEnter={handleOnMouseEnter}
                            onMouseLeave={handleOnMouseLeave}
                            onClick={handleOnClick}>
                            </i>
                    </label>
                    
                    <input type='radio' id='movieGrade3' name='userMovieGrade' value='3' onChange={handleInputChange}/>
                    <label 
                        id='movieGradeLable3'
                        grade='3'
                        htmlFor="movieGrade3" 
                        hint='Что-то понравилось, что-то - нет'> 
                            <i 
                            className="fas fa-star fa-3x"
                            onMouseEnter={handleOnMouseEnter}
                            onMouseLeave={handleOnMouseLeave}
                            onClick={handleOnClick}>
                            </i>
                    </label>
                    
                    <input type='radio' id='movieGrade4' name='userMovieGrade' value='4' onChange={handleInputChange}/>
                    <label 
                        id='movieGradeLable4'
                        grade='4'
                        htmlFor="movieGrade4" 
                        hint='Посмотрел(а) с удовольствием'> 
                            <i 
                            className="fas fa-star fa-3x"
                            onMouseEnter={handleOnMouseEnter}
                            onMouseLeave={handleOnMouseLeave}
                            onClick={handleOnClick}>
                            </i>
                    </label>
                    
                    <input type='radio' id='movieGrade5' name='userMovieGrade' value='5' onChange={handleInputChange}/>
                    <label 
                        id='movieGradeLable5'
                        grade='5'
                        htmlFor="movieGrade5" 
                        hint='Вау!'> 
                            <i 
                            className="fas fa-star fa-3x"
                            onMouseEnter={handleOnMouseEnter}
                            onMouseLeave={handleOnMouseLeave}
                            onClick={handleOnClick}>
                            </i>
                    </label>
                    
                    <input type='submit' value='Оценить' disabled={!isRated}></input> 
                </form>
                
                <button id='to-bookmarks-btn' type='button' className='btn to-bookmarks-btn'>
                    В закладки
                </button>              
            </div>
                         
        </div>         
    );
}

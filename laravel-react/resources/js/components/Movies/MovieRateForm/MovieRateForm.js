import React, {useCallback, useState} from 'react';
import { useDispatch} from 'react-redux';
import {FETCH_URL} from '../../../common/constants/constants';
import {sendMovieRate} from '../../../store/actions/movies'
import './MovieRateForm.css';

//TODO: всплывающие подсказки

export default function MovieRateForm (props) {
    const dispatch = useDispatch();   

    const { movieId, userId } = props;
        
    const [userMovieRate, setUserMovieRate] = useState('');
    const [isHaveChoice, setIsHaveChoice] = useState(false);  
    const [isRated, setIsRated] = useState(false);    
       
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const formData = {userId, movieId, userMovieRate}; 
        console.log(formData);
        dispatch(sendMovieRate(formData, FETCH_URL.SEND_GRADE));
        setIsRated(true);     
    }, [dispatch, userId, movieId, userMovieRate]);

    const handleOnMouseEnter = useCallback((e) => {
        if (!isHaveChoice) {
            const currentRate = Number(e.target.attributes.rate.value);
            const stars = Array.from(e.target.parentElement.children).filter(elem => elem.nodeName === 'I' && Number(elem.attributes.rate.value) <= currentRate);
            changeStarsColor(stars, '#ffe066');            
        }        
    });

    const handleOnMouseLeave = useCallback((e) => {
        if (!isHaveChoice) {            
            const allStars = Array.from(e.target.parentElement.children).filter(elem => elem.nodeName === 'I');
            changeStarsColor(allStars, '#ccccb3');                      
        }        
    });

    const handleOnClick = useCallback((e) => {
        if (!isRated) {
            const currentRate = Number(e.target.attributes.rate.value); 
            setUserMovieRate(currentRate);      
            const stars = Array.from(e.target.parentElement.children).filter(elem => elem.nodeName === 'I' && Number(elem.attributes.rate.value) <= currentRate);
            changeStarsColor(stars, '#ffa500');
            setIsHaveChoice(true);
        }
    });

    const handleEditRate = (e) => {  
        const formElems = e.target.nodeName === 'BUTTON' ? e.target.parentElement.children : e.target.parentElement.parentElement.children;
        const allStars = Array.from(formElems).filter(elem => elem.nodeName === 'I');
        changeStarsColor(allStars, '#ccccb3');      
        setIsHaveChoice(false); 
        setIsRated(false);      
    };

    const changeStarsColor = (stars, color) => {
        for (let star of stars) {
            star.style.color = color;
        }
    }
               
    return (        
        <section className='form__movie-rate'>            
            <i 
                className='fas fa-star fa-3x userMovieRate'
                disabled={isRated}
                id='movieRate1' 
                rate='1'
                hint='Не осилил(а)'
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
                onClick={handleOnClick}>
            </i>

            <i 
                className='fas fa-star fa-3x userMovieRate'
                disabled={isRated}
                id='movieRate2' 
                rate='2'
                hint='Жаль потраченного времени'
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
                onClick={handleOnClick}>
            </i>

            <i 
                className='fas fa-star fa-3x userMovieRate'
                disabled={isRated}
                id='movieRate3'
                rate='3'
                hint='Что-то понравилось, что-то - нет'
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
                onClick={handleOnClick}>
            </i>

            <i 
                className='fas fa-star fa-3x userMovieRate'
                disabled={isRated}
                id='movieRate4'  
                rate='4'
                hint='Посмотрел(а) с удовольствием'
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
                onClick={handleOnClick}>
            </i>

            <i 
                className='fas fa-star fa-3x userMovieRate'
                disabled={isRated}
                id='movieRate5' 
                rate='5'
                hint='Вау!'                
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
                onClick={handleOnClick}>
            </i>           
                    
            <button 
                className={`btn btn_send_rate ${isRated ? 'hidden' : ''}`}
                disabled={!isHaveChoice}
                onClick={handleSubmit}>
                    <i className='fas fa-check fa-2x'></i>
            </button>

            <button className={`btn btn_edit_rate ${isRated ? '' : 'hidden'}`}>
                    <i className='fas fa-pen fa-2x' onClick={handleEditRate}></i>
            </button> 
        </section>                    
    );
}

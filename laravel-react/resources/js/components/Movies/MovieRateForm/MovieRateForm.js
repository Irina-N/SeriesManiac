import React, {useCallback, useState} from "react";
import { useDispatch} from "react-redux";
import {FETCH_URL} from '../../../common/constants/constants';
import {sendMovieRate} from '../../../store/actions/movies'
import './MovieRateForm.css';

export default function MovieRateForm (props) {
    const dispatch = useDispatch();   

    const { movieId, userId } = props;
        
    const [userMovieRate, setUserMovieRate] = useState('');
    const [isHaveRate, setIsHaveRate] = useState(false);  
    const [isRated, setIsRated] = useState(false);    
       
    const handleInputChange = useCallback((e) => {
        const target = e.target;
        if (target.type === 'radio' && target.checked) {
            setUserMovieRate(Number(target.value));
        }    
    });

    const handleSubmit = useCallback((e) => {
        e.preventDefault();   
        const formData = {userId, movieId, userMovieRate}; 
        console.log(formData);
        dispatch(sendMovieRate(formData, FETCH_URL.SEND_GRADE));
        setIsRated(true);     
    }, [dispatch, userId, movieId, userMovieRate]);

    const handleOnMouseEnter = useCallback((e) => {
        if (!isHaveRate) {
            const currentRate = Number(e.target.parentElement.attributes.rate.value);
            const form = e.target.parentElement.parentElement;
            [].forEach.call(form.children, function(elem) {
                if (elem.nodeName === 'LABEL' && Number(elem.attributes.rate.value) <= currentRate) {
                    elem.style.color = '#ffe066';
                };             
            });             
        }        
    });

    const handleOnMouseLeave = useCallback((e) => {
        if (!isHaveRate) {
            const form = e.target.parentElement.parentElement;
            [].forEach.call(form.children, function(elem) {
                if (elem.nodeName === 'LABEL' ) {
                    elem.style.color = '#ccccb3';
                };             
            });           
        }        
    });

    const handleOnClick = useCallback((e) => {
        if (!isRated) {
            const currentRate = Number(e.target.
                parentElement.attributes.rate.value);        
                const form = e.target.parentElement.parentElement;
                [].forEach.call(form.children, function(elem) {
                    if (elem.nodeName === 'LABEL' && Number(elem.attributes.rate.value) <= currentRate) {
                        elem.style.color = '#ffa500';
                    } else if (elem.nodeName === 'LABEL') {
                        elem.style.color = '#ccccb3';
                    };             
                });         
                setIsHaveRate(true);
        }
    });

    const handleEditRate = (e) => {        
        e.preventDefault();               
        const form = e.target.parentElement.parentElement;
        [].forEach.call(form.children, function(elem) {
            if (elem.nodeName === 'LABEL') {
                elem.style.color = '#ccccb3';
            };             
        }); 
        setIsRated(false); 
        setIsHaveRate(false);
    };
       
    return (        
        <form 
        name='movieRate' 
        className='form__movie-rate'>

            <input type='radio' id='movieRate1' name='userMovieRate' value='1' onChange={handleInputChange}/>                    
            <label 
                id='movieRateLable1'
                rate='1'
                htmlFor="movieRate1" 
                hint='Не осилил(а)'> 
                    <i 
                        className="fas fa-star fa-3x"
                        onMouseEnter={handleOnMouseEnter}
                        onMouseLeave={handleOnMouseLeave}
                        onClick={handleOnClick}>
                    </i>
            </label>

            <input type='radio' id='movieRate2' name='userMovieRate' value='2' onChange={handleInputChange}/>
            <label 
                id='movieRateLable2'
                rate='2'
                htmlFor="movieRate2" 
                hint='Жаль потраченного времени'> 
                    <i 
                        className="fas fa-star fa-3x"
                        onMouseEnter={handleOnMouseEnter}
                        onMouseLeave={handleOnMouseLeave}
                        onClick={handleOnClick}>
                    </i>
            </label>
                    
            <input type='radio' id='movieRate3' name='userMovieRate' value='3' onChange={handleInputChange}/>
            <label 
                id='movieRateLable3'
                rate='3'
                htmlFor="movieRate3" 
                hint='Что-то понравилось, что-то - нет'> 
                    <i 
                        className="fas fa-star fa-3x"
                        onMouseEnter={handleOnMouseEnter}
                        onMouseLeave={handleOnMouseLeave}
                        onClick={handleOnClick}>
                    </i>
            </label>
                    
            <input type='radio' id='movieRate4' name='userMovieRate' value='4' onChange={handleInputChange}/>
            <label 
                id='movieRateLable4'
                rate='4'
                htmlFor="movieRate4" 
                hint='Посмотрел(а) с удовольствием'> 
                    <i 
                        className="fas fa-star fa-3x"
                        onMouseEnter={handleOnMouseEnter}
                        onMouseLeave={handleOnMouseLeave}
                        onClick={handleOnClick}>
                    </i>
                </label>
                    
                <input type='radio' id='movieRate5' name='userMovieRate' value='5' onChange={handleInputChange}/>
                <label 
                    id='movieRateLable5'
                    rate='5'
                    htmlFor="movieRate5" 
                    hint='Вау!'> 
                        <i 
                            className="fas fa-star fa-3x"
                            onMouseEnter={handleOnMouseEnter}
                            onMouseLeave={handleOnMouseLeave}
                            onClick={handleOnClick}>
                        </i>
                </label>
                    
                <button 
                    className={`btn btn_send_rate ${isRated ? 'hidden' : ''}`}
                    type='submit' 
                    disabled={!isHaveRate}
                    onClick={handleSubmit}>
                        <i className="fas fa-check fa-2x"></i>
                </button>

                <button 
                    className={`btn btn_edit_rate ${isRated ? '' : 'hidden'}`}
                    onClick={handleEditRate}>
                        <i className="fas fa-pen fa-2x"></i>
                </button> 
            </form>                    
    );
}

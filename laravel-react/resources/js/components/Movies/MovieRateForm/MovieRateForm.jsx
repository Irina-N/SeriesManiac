import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { Container, Row, Col } from 'react-bootstrap';

import { sendMovieRate } from '../../../store/actions/movies'

import './MovieRateForm.css';


export default function MovieRateForm({ movieId, userId, rate }) {
    const dispatch = useDispatch();

    const [userMovieRate, setUserMovieRate] = useState(null);
    const [isHaveChoice, setIsHaveChoice] = useState(false);
    const [isRated, setIsRated] = useState(false);

    useEffect(() => {
        if (rate) {
            setIsHaveChoice(true);
            setIsRated(true);
            changeStarsColor(rate, '#ffa500');
        }
    }, []);

    const stars = useRef(null);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const formData = { userId, movieId, userMovieRate };
        dispatch(sendMovieRate(formData));
        setIsRated(true);
    }, [dispatch, userId, movieId, userMovieRate]);

    const handleOnMouseEnter = useCallback((e) => {
        if (!isHaveChoice) {
            const currentRate = Number(e.target.attributes.rate.value);
            changeStarsColor(currentRate, '#ffe066');
        }
    });

    const handleOnMouseLeave = useCallback((e) => {
        if (!isHaveChoice) {
            changeStarsColor(5, '#ccccb3');
        }
    });

    const handleOnClick = useCallback((e) => {
        if (!isRated) {
            const currentRate = Number(e.target.attributes.rate.value);
            setUserMovieRate(currentRate);
            changeStarsColor(5, '#ccccb3');
            changeStarsColor(currentRate, '#ffa500');
            setIsHaveChoice(true);
        }
    });

    const handleEditRate = (e) => {
        changeStarsColor(5, '#ccccb3');
        setIsHaveChoice(false);
        setIsRated(false);
    };

    const changeStarsColor = (currentRate, color) => {
        const changingStars = Array.from(stars.current.children).filter(
            (star) => Number(star.attributes.rate.value) <= currentRate,
        );
        for (let star of changingStars) {
            star.style.color = color;
        }
    }

    return (
        <Container fluid='lg' className='form__movie-rate'>
            <Row className='mt-2 mt-md-3 mb-1 mb-md-2'>
                <Col xs={12}>
                    <h3 className='form__movie-rate__title text-center mb-1'>Ваша оценка</h3>
                </Col>
            </Row>
            <Row className='form__movie-rate__content bg-dark d-flex justify-content-center align-items-center p-3 p-md-4'>
                <Col xs='auto' >
                    <div className='stars_block' ref={stars}>
                        <i
                            className='fas fa-star userMovieRate'
                            disabled={isRated}
                            id='movieRate1'
                            rate='1'
                            hint='Не осилил(а)'
                            onMouseEnter={handleOnMouseEnter}
                            onMouseLeave={handleOnMouseLeave}
                            onClick={handleOnClick}>
                        </i>

                        <i
                            className='fas fa-star userMovieRate'
                            disabled={isRated}
                            id='movieRate2'
                            rate='2'
                            hint='Жаль потраченного времени'
                            onMouseEnter={handleOnMouseEnter}
                            onMouseLeave={handleOnMouseLeave}
                            onClick={handleOnClick}>
                        </i>

                        <i
                            className='fas fa-star userMovieRate'
                            disabled={isRated}
                            id='movieRate3'
                            rate='3'
                            hint='Что-то понравилось, что-то - нет'
                            onMouseEnter={handleOnMouseEnter}
                            onMouseLeave={handleOnMouseLeave}
                            onClick={handleOnClick}>
                        </i>

                        <i
                            className='fas fa-star userMovieRate'
                            disabled={isRated}
                            id='movieRate4'
                            rate='4'
                            hint='Посмотрел(а) с удовольствием'
                            onMouseEnter={handleOnMouseEnter}
                            onMouseLeave={handleOnMouseLeave}
                            onClick={handleOnClick}>
                        </i>

                        <i
                            className='fas fa-star userMovieRate'
                            disabled={isRated}
                            id='movieRate5'
                            rate='5'
                            hint='Вау!'
                            onMouseEnter={handleOnMouseEnter}
                            onMouseLeave={handleOnMouseLeave}
                            onClick={handleOnClick}>
                        </i>
                    </div>
                </Col>
                <Col xs='auto' className='text-center ps-2 pe-2 ps-sm-3 pe-sm-3'>
                    <button
                        className={`btn btn_send_rate ${isRated ? 'hidden' : ''}`}
                        disabled={!isHaveChoice}
                        onClick={handleSubmit}>
                        <i className='fas fa-check btn-icon'></i>
                    </button>
                    <button className={`btn btn_edit_rate ${isRated ? '' : 'hidden'}`}>
                        <i className='fas fa-pen btn-icon' onClick={handleEditRate}></i>
                    </button>
                </Col>
            </Row>
        </Container>
    );
}

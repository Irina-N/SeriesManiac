import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { Container, Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';

import { sendMovieRate } from '../../../store/actions/movies'

import './MovieRateForm.css';


export default function MovieRateForm({ movieId, userId, rate }) {
    const dispatch = useDispatch();

    const [userMovieRate, setUserMovieRate] = useState(rate || null);
    const [isHaveChoice, setIsHaveChoice] = useState(rate ? true : false);
    const [isRated, setIsRated] = useState(rate ? true : false);

    useEffect(() => {
        if (userMovieRate) {
            changeStarsColor(userMovieRate, '#ffa500');
        }
    }, [userMovieRate]);

    const stars = React.createRef();
    const star = React.createRef();

    const opinions = ['Не осилил(а)', 'Жаль потраченного времени', 'Что-то понравилось, что-то - нет', 'Посмотрел(а) с удовольствием', 'Вау, круто!'];

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

    const handleOnMouseLeave = useCallback(() => {
        if (!isHaveChoice) {
            changeStarsColor(5, '#ccccb3');
        }
    });

    const handleOnClick = useCallback((e) => {

        if (!isRated) {
            changeStarsColor(5, '#ccccb3');
            const currentRate = Number(e.target.attributes.rate.value);
            setUserMovieRate(currentRate);
            setIsHaveChoice(true);
        }
    });

    const handleEditRate = () => {
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

    const Star = React.forwardRef((props, ref) => (
        <i
            ref={ref}
            {...props}
            className='fas fa-star userMovieRate'
            disabled={isRated}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
            onClick={handleOnClick}>
            {props.children}
        </i>
    ));

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
                        {opinions.map((opinion, i) => {
                            return (
                                <OverlayTrigger
                                    key={i}
                                    placement='top'
                                    delay={{ show: 250, hide: 0 }}
                                    overlay={!isRated ? (
                                        <Tooltip id={`tooltip-movieRate${i + 1}`}>
                                            {opinion}
                                        </Tooltip>) : (<></>)}
                                >
                                    <Star
                                        ref={star}
                                        id={`movieRate${i + 1}`}
                                        rate={i + 1}
                                    >
                                    </Star>
                                </OverlayTrigger>
                            )
                        })}
                    </div>
                </Col>
                <Col xs='auto' className='text-center ps-2 pe-2 ps-sm-3 pe-sm-3'>
                    <button
                        className={`btn_send_rate ${isRated ? 'hidden' : ''}`}
                        disabled={!isHaveChoice}
                        onClick={handleSubmit}>
                        <i className='fas fa-check btn-icon'></i>
                    </button>
                    <button className={`btn_edit_rate ${isRated ? '' : 'hidden'}`}>
                        <i className='fas fa-pen btn-icon' onClick={handleEditRate}></i>
                    </button>
                </Col>
            </Row>
        </Container >
    );
}

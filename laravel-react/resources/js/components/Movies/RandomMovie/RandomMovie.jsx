import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

import { Container, Row, Col } from 'react-bootstrap';

import { getRandomMovie } from '../../../store/actions/movies';
import { shortDescriptionMapper } from '../../../helpers/mappers/movie-short-description-mapper';

import './RandomMovie.css';

export const RandomMovie = () => {
  const dispatch = useDispatch();
  const { title, ru_title, description, big_image, id } = useSelector(
    (state) => state.moviesReducer.randomMovie,
  );
  const { preloader } = useSelector(
    (state) => state.moviesReducer,
  )

  useEffect(() => {
    dispatch(getRandomMovie());
  }, []);

  return (
    <Container fluid='lg' >
      <Row
        as={Link}
        to={`/movies/${id}`}
        id='random-movie'
        className='d-flex py-5 text-center align-items-center'
        style={{ backgroundImage: `url(${big_image})` }}
      >
        {!preloader && (<Col id='random-movie_text' className='col-lg-6 col-md-8 mx-auto py-2 px-3 d-flex flex-column justify-content-center'>
          <h1 id='random-movie_title' className='random-movie_title fw-light text-light'>{ru_title || title}</h1>
          <div id='random-movie_desc' className='lead text-white text-break'>
            {description ? parse(shortDescriptionMapper(description)) : ''}
          </div>
        </Col>)}
      </Row>
    </Container>

  );
};
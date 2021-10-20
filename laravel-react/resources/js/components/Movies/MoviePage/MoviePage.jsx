import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import parse from 'html-react-parser';
import { toast } from 'react-toastify';
import { Container, Row, Col, Image, Spinner } from 'react-bootstrap';

import Header from '../../Header/Header';
import MovieRateForm from '../MovieRateForm/MovieRateForm';
import { getOneMovie } from '../../../store/actions/movies';
import { clearUsersError } from '../../../store/actions/currentUser';
import { descriptionMapper } from '../../../helpers/mappers/movie-description-mapper';

import './MoviePage.css';

export default function MoviePage() {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const movieId = Number(params.movieId);
  const userId = useSelector((state) => state.currentUserReducer.user.id);

  const { preloader, error } = useSelector((state) => state.moviesReducer);

  const currentMovie = useSelector((state) => state.moviesReducer.currentMovie);
  const rate = currentMovie.grade || null;

  useEffect(() => {
    if (!userId) {
      history.push('/');
    }
  }, [userId]);

  useEffect(() => {
    if (movieId) {
      dispatch(getOneMovie({ userId, movieId }));
    }
  }, [movieId]);

  useEffect(() => {
    if (error.status) {
      toast.error(error.errorMessage);
      dispatch(clearUsersError());
      history.push('/movies');
    }
  }, [error.status]);

  return (
    <>
      <Header />
      {preloader ? (
        <Container fluid='lg'>
          <Row>
            <Col id='spinner'>
              <Spinner animation='border' variant='warning' />
            </Col>
          </Row>
        </Container>
      ) : (
        <React.Fragment>
          <Container fluid='lg'>
            <Row>
              <Col className='p-0'>
                <Image src={currentMovie.big_image} fluid className='movie-poster' />
              </Col>
            </Row>

            <Row className='movie-header bg-warning text-dark my-md-3'>
              <Col className='p-2'>
                <h2 className='movie_ru-title text-center mb-1'>
                  {currentMovie.ru_title || currentMovie.title}
                </h2>
                {currentMovie.ru_title ? (
                  <h4 className='movie_title text-center mt-0 mb-1'>{currentMovie.title}</h4>
                ) : (
                  ''
                )}
                <h5 className='movie_year text-center mb-0'>{currentMovie.year}</h5>
              </Col>
            </Row >
            <Row className='mt-2 mt-md-3 mb-1 mb-md-2'>
              <Col xs={12}>
                <h3 className='form__movie-rate__title text-center mb-1'>Описание</h3>
              </Col>
            </Row>
            <Row className='movie-desc bg-dark w-100 lead text-white text-break p-3'>
              <Col className='m-0 p-0'>
                {currentMovie.description
                  ? parse(descriptionMapper(currentMovie.description))
                  : ''}
              </Col>
            </Row>
          </Container>
          <MovieRateForm movieId={movieId} userId={userId} rate={rate} />
        </React.Fragment>
      )}
    </>
  );
}

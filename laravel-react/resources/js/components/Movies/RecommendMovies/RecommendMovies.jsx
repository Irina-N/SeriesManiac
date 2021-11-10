import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { useDebouncedCallback } from 'use-debounce';
import { toast } from 'react-toastify';
import { Spinner, Container, Row, Col, Form, FormControl } from 'react-bootstrap';

import Header from '../../Header/Header';
import { MoviesListItem } from '../MoviesListItem/MoviesListItem.jsx';
import {
  clearUsersError,
  getRecommendMovies,
} from '../../../store/actions/currentUser';

import './RecommendMovies.css';

const DEBOUNCE_WAIT_MILLISECONDS = 300;

export const RecommendMovies = () => {
  const componentName = 'recommendMovies';

  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useSelector((state) => state.currentUserReducer.user);
  const {
    recommendMovies: movies,
    error,
    preloader,
  } = useSelector((state) => state.currentUserReducer);

  const [recommendMovies, setRecommendMovies] = useState([]);
  const [searchText, setSearchText] = useState('');

  const debouncedSearch = useDebouncedCallback((query) => {
    const searchResult = movies.filter(
      (movie) =>
        movie.ru_title.toLowerCase().includes(query.toLowerCase()) ||
        movie.title.toLowerCase().includes(query.toLowerCase()),
    );
    setRecommendMovies(searchResult);
  }, DEBOUNCE_WAIT_MILLISECONDS);

  useEffect(() => {
    if (!id) {
      history.push('/');
    }
  }, [id]);

  useEffect(() => {
    dispatch(clearUsersError);
    if (id) {
      dispatch(getRecommendMovies(id))
        .unwrap()
        .then((res) => setRecommendMovies(res));
    } else {
      setRecommendMovies(movies);
    }
  }, []);

  useEffect(() => {
    if (searchText.trim().length > 0) {
      debouncedSearch(searchText.trim());
    } else {
      setRecommendMovies(movies);
      setSearchText('');
    }
  }, [searchText]);

  useEffect(() => {
    if (error.status) {
      toast.error(error.errorMessage);
      dispatch(clearUsersError());
    }
  }, [error.status]);

  return (
    <>
      <Header componentName={componentName} />
      {preloader ? (
        <Container fluid='lg'>
          <Row>
            <Col xs={12} id='spinner-recommend' className='d-flex justify-content-center mb-5'>
              <Spinner animation='border' variant='warning' />
            </Col>
          </Row>
          <Row>
            <Col xs={12} className='text-secondary'>
              <p className='loading-text w-100 mb-2'>Пожалуйста, подождите.</p>
              <p className='loading-text w-100'>Мы&nbsp;рассчитываем индивидуальные рекомендации&nbsp;для&nbsp;вас.</p>
            </Col>
          </Row>
        </Container>
      ) : (
        <>
          <Container fluid='lg'>
            <Form className='search-form p-3 d-flex justify-content-center bg-light'>
              <FormControl
                id='recommend_search'
                type='search'
                placeholder='Найти в рекомендациях'
                className='mx-auto'
                aria-label='Search'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Form>
          </Container>

          <Container fluid='lg'>
            <section className='bg-light recommended-movies p-3'>
              {recommendMovies.length &&
                recommendMovies.map((movie) => {
                  return <MoviesListItem key={movie.id} {...movie} componentName={componentName} />;
                })
              }
            </section>
          </Container>
        </>
      )}
    </>
  );
};

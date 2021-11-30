import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


import { useDebouncedCallback } from 'use-debounce';
import { toast } from 'react-toastify';
import { Container, Row, Col, Form, FormControl, Spinner } from 'react-bootstrap';


import Header from '../../Header/Header';
import { MoviesListItem } from '../MoviesListItem/MoviesListItem.jsx';
import {
  clearUsersError,
  getUserMovies,
} from '../../../store/actions/currentUser';

import './UserMovies.css';

const DEBOUNCE_WAIT_MILLISECONDS = 300;

export const UserMovies = () => {
  const componentName = 'userMovies';

  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useSelector((state) => state.currentUserReducer.user);
  const {
    userMovies: movies,
    error,
    preloader,
  } = useSelector((state) => state.currentUserReducer);

  const [userMovies, setUserMovies] = useState([]);
  const [searchText, setSearchText] = useState('');

  const debouncedSearch = useDebouncedCallback((query) => {
    const searchResult = movies.filter(
      (movie) =>
        movie.ru_title.toLowerCase().includes(query.toLowerCase()) ||
        movie.title.toLowerCase().includes(query.toLowerCase()),
    );
    setUserMovies(searchResult);
  }, DEBOUNCE_WAIT_MILLISECONDS);

  useEffect(() => {
    if (!id) {
      history.push('/');
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      dispatch(getUserMovies(id))
        .unwrap()
        .then((res) => setUserMovies(res));
    } else {
      setUserMovies(movies);
    }
  }, []);

  useEffect(() => {
    if (searchText.trim().length > 0) {
      debouncedSearch(searchText.trim());
    } else {
      setUserMovies(movies);
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
            <Col id='spinner'>
              <Spinner animation='border' variant='warning' />
            </Col>
          </Row>
        </Container>
      ) : (
        <>
          <Container fluid='lg'>
            <Form className='search-form p-3 d-flex justify-content-center bg-light'>
              <FormControl
                id='user-movies_search'
                type='search'
                placeholder='Найти в моих сериалах'
                className='mx-auto'
                aria-label='Search'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Form>
          </Container>

          <Container fluid='lg'>
            <section className='bg-light user-movies p-3'>
              {userMovies.length &&
                userMovies.map((movie) => {
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

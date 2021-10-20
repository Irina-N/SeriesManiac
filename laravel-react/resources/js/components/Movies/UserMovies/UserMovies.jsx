import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


import { useDebouncedCallback } from 'use-debounce';
import { toast } from 'react-toastify';
import { Container, Row, Col, Form, FormControl, Button, Spinner } from 'react-bootstrap';


import Header from '../../Header/Header';
import { UserMovieCard } from './UserMovieCard/UserMovieCard';
import {
  clearUsersError,
  getUserMovies,
} from '../../../store/actions/currentUser';

import './UserMovies.css';

const DEBOUNCE_WAIT_MILLISECONDS = 300;

export const UserMovies = () => {
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
            <Form className='search-form p-3 d-flex justify-content-center bg-light'>
              <FormControl
                type='search'
                placeholder='Найти в моих сериалах'
                className='me-2'
                aria-label='Search'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Form>
          </Container>

          {/* <div className="container-fluid d-flex bg-light justify-content-center py-3">
            <form className="form-inline col-6 px-2 d-flex justify-content-center">
              <input
                className="form-control w-100"
                type="search"
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </form>
          </div> */}

          <Container fluid='lg' className="bg-light user-movies">
            {userMovies.length &&
              userMovies.map((movie) => {
                return <UserMovieCard key={movie.id} {...movie} />;
              })}
          </Container>

          {/* <div className="container-fluid d-flex bg-light justify-content-center flex-column align-items-center user-movies">
            {userMovies.length &&
              userMovies.map((movie) => {
                return <UserMovieCard key={movie.id} {...movie} />;
              })}
          </div> */}
        </React.Fragment>
      )}
    </>
  );
};

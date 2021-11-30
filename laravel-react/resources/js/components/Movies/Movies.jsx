import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { toast } from 'react-toastify';
import { Container, Row, Col, Form, FormControl, Button, Spinner } from 'react-bootstrap';


import {
  clearMoviesError,
  getTopMovies,
  loadMoreMovies,
  searchMovies,
} from '../../store/actions/movies';
import { MovieCard } from './MovieCard/MovieCard';
import Header from '../Header/Header';
import { RandomMovie } from './RandomMovie/RandomMovie';

import './movies.css';

const MINIMUM_QUERY_LENGTH_FOR_SEARCH = 0;

export const Movies = () => {
  const componentName = 'movies';

  const dispatch = useDispatch();
  const history = useHistory();

  const { movies: topMovies, preloader, error } = useSelector((state) => state.moviesReducer);
  const userId = useSelector((state) => state.currentUserReducer.user.id);

  const [paginateCounter, setPaginateCounter] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [searchQuery, setSearchQuery] = useState(null);
  const [isLoadMore, setIsLoadMore] = useState(false);

  useEffect(() => {
    if (!topMovies.length) {
      dispatch(getTopMovies(paginateCounter));
      setSearchText('');
      setSearchQuery(null);
    }
  }, []);

  useEffect(() => {
    if (error.status) {
      toast.error(error.errorMessage);
      dispatch(clearMoviesError());
    }
  }, [error.status]);

  useEffect(() => {
    if (!userId) {
      history.push('/');
    }
  }, [userId]);

  const loadMore = async () => {
    setIsLoadMore(true);
    await dispatch(
      loadMoreMovies({ counter: paginateCounter + 1, query: searchQuery }),
    )
      .unwrap()
      .then(() => setIsLoadMore(false));
    setPaginateCounter(paginateCounter + 1);
  };

  const handlerSearch = (e) => {
    e.preventDefault();

    if (
      searchText.trim()?.length > MINIMUM_QUERY_LENGTH_FOR_SEARCH &&
      searchText.trim() !== searchQuery
    ) {
      dispatch(searchMovies({ query: searchText.trim(), counter: 0 }));
      setSearchQuery(searchText.trim());
      setPaginateCounter(0);
    } else if (!searchText.trim()?.length) {
      setSearchText('');
      setSearchQuery(null);
    }
  };

  return (
    <>
      <Header componentName={componentName} />
      <RandomMovie />

      <Container fluid='lg'>
        <Form
          className='search-form p-3 d-flex justify-content-center bg-light'
          onSubmit={handlerSearch}
        >
          <FormControl
            id='movies_search'
            type='search'
            placeholder='Найти сериал'
            className='me-2'
            aria-label='Search'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            variant='dark'
            className='btn search-btn'
            type='submit'
          >
            Поиск
          </Button>
        </Form>
      </Container>

      <Container fluid='lg' className='mb-lg-5'>
        <Row

          id='film-container'
          align='center'
          className='bg-light'
        >
          {(preloader && !isLoadMore) || !topMovies || !topMovies.length ? (
            <Col id='spinner'>
              <Spinner animation='border' variant='dark' />
            </Col>
          ) : (
            topMovies.map((movie) => {
              return (
                <Col key={(movie.id).toString()} xs={12} sm=
                  {6} md={4} lg={3} className='mt-3'>
                  <MovieCard {...movie} />
                </Col>
              )
            })
          )}
        </Row>
        <Row align='center' justify='center' className='bg-light p-4'>
          {preloader && isLoadMore ? (
            <Col align='center' className='w-100 h-25'>
              <Spinner animation='border' variant='dark' />
            </Col>
          ) : (
            <Col>
              <Button
                onClick={loadMore}
                id='load-more'
                type='button'
                variant='warning'
                className='btn-lg'
              >
                Ещё сериалов!
              </Button>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Movies;

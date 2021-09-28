import React, { useEffect, useState } from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  clearMoviesError,
  getTopMovies,
  loadMoreMovies,
  searchMovies,
} from '../../store/actions/movies';
import { MovieListItem } from './MovieListItem/MovieListItem';
import Header from '../Header/Header';
import Spinner from 'react-bootstrap/Spinner';
import { RandomMovie } from './RandomMovie/RandomMovie';
import { toast } from 'react-toastify';
import './movies.css';

const MINIMUM_QUERY_LENGTH_FOR_SEARCH = 0;

export const Movies = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { movies: topMovies } = useSelector((state) => state.moviesReducer);
  const { preloader, error } = useSelector((state) => state.moviesReducer);
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
    <div className="content main">
      <Header />
      <RandomMovie />
      <div className="container-fluid d-flex bg-light justify-content-center">
        <form
          className="search-form px-2 d-flex justify-content-center"
          onSubmit={handlerSearch}
        >
          <input
            className="form-control"
            type="search"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="btn btn-dark" type="submit">
            Search
          </button>
        </form>
      </div>
      <div className="album py-5 bg-light w-100">
        <div className="container">
          <div id="film-container" className="row align-items-center">
            {(preloader && !isLoadMore) || !topMovies || !topMovies.length ? (
              <div className="d-flex justify-content-center align-items-center h-100">
                <Spinner animation="border" variant="dark" />
              </div>
            ) : (
              topMovies.map((movie) => {
                return <MovieListItem key={movie.id} {...movie} />;
              })
            )}
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center pt-4">
          {preloader && isLoadMore ? (
            <div className="d-flex justify-content-center align-items-center h-100">
              <Spinner animation="border" variant="dark" />
            </div>
          ) : (
            <button
              onClick={loadMore}
              id="load-more"
              type="button"
              className="btn btn-lg btn-outline-success"
            >
              Load more
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Movies;

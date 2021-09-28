import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../../Header/Header';
import { RecommendMovieCard } from './RecommendMovieCard/RecommendMovieCard';
import { useDebouncedCallback } from 'use-debounce';
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';
import {
  clearUsersError,
  getRecommendMovies,
} from '../../../store/actions/currentUser';
import './RecommendMovie.css';

const DEBOUNCE_WAIT_MILLISECONDS = 300;

export const RecommendMovies = () => {
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
    <div className="content main">
      <Header />
      {preloader ? (
        <div
          id="spinner"
          className="d-flex justify-content-center align-items-center"
        >
          <Spinner animation="border" variant="warning" />
          <p>Пожалуйста, подождите.</p>
          <p>Мы рассчитываем индивидуальные рекомендации для вас.</p>
        </div>
      ) : (
        <React.Fragment>
          <div className="container-fluid d-flex bg-light justify-content-center py-3">
            <form className="form-inline col-6 px-2 d-flex justify-content-center">
              <input
                className="form-control m-2 w-50"
                type="search"
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </form>
          </div>

          <div className="container-fluid d-flex bg-light justify-content-center flex-column align-items-center user-movies">
            {recommendMovies.length &&
              recommendMovies.map((movie) => {
                return <RecommendMovieCard key={movie.id} {...movie} />;
              })}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

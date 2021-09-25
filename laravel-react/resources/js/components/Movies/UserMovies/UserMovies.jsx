import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../Header/Header';
import { UserMovieCard } from './UserMovieCard/UserMovieCard';
import { getTopMovies } from '../../../store/actions/movies';
import { useDebouncedCallback } from 'use-debounce';
import './UserMovies.css';
import {
  clearUsersError,
  getUserMovies,
} from '../../../store/actions/currentUser';

const DEBOUNCE_WAIT_MILLISECONDS = 300;

export const UserMovies = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.currentUserReducer.user);
  // const { movies } = useSelector((state) => state.moviesReducer);
  // раскомментировать нижнюю☟ строчку и удалить верхнюю☝ после реализации на беккенде
  const { movies: userMovies } = useSelector(
    (state) => state.currentUserReducer,
  );
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
    if (id && !movies.length) {
      // dispatch(getTopMovies());
      // раскомментировать нижнюю☟ строчку и удалить верхнюю☝ после реализации на беккенде
      dispatch(getUserMovies(id));
    } else {
      setUserMovies(movies);
    }
  }, [movies]);

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
      dispatch(clearUsersError);
    }
  }, [error.status]);

  return (
    <div className="content main">
      <Header />
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
      <div className="container-fluid d-flex bg-light justify-content-center flex-column align-items-center">
        {userMovies.length &&
          userMovies.map((movie) => {
            return <UserMovieCard key={movie.id} {...movie} />;
          })}
      </div>
    </div>
  );
};

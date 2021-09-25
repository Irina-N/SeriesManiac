import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../Header/Header';
import { UserMovieCard } from './UserMovieCard/UserMovieCard';
import Card from 'react-bootstrap/Card';
import { getTopMovies } from '../../../store/actions/movies';
import './UserMovies.css';
import { Link } from 'react-router-dom';

export const UserMovies = () => {
  const dispatch = useDispatch();
  const { movies: topMovies } = useSelector((state) => state.moviesReducer);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (!topMovies.length) {
      dispatch(getTopMovies());
    }
  }, []);

  const handlerSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="content main">
      <Header />
      <div className="container-fluid d-flex bg-light justify-content-center py-3">
        <form
          className="form-inline col-6 px-2 d-flex justify-content-center"
          onSubmit={handlerSearch}
        >
          <input
            className="form-control m-2 w-50"
            type="search"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="btn btn-dark m-2" type="submit">
            Search
          </button>
        </form>
      </div>
      <div className="container-fluid d-flex bg-light justify-content-center flex-column align-items-center">
        {topMovies.length &&
          topMovies.map((movie) => {
            return <UserMovieCard key={movie.id} {...movie} />;
          })}
      </div>
    </div>
  );
};

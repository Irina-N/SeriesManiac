import React, { useEffect } from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { getTopMovies } from '../../store/actions/movies';
import { MovieListItem } from './MovieListItem/MovieListItem';
import Header from '../Header/Header';
import './movies.css'

export const Movies = () => {
  const dispatch = useDispatch();
  const topMovies = useSelector((state) => state.moviesReducer.movies);
  const moviesList = topMovies.data.map((movie) => {
    return (<MovieListItem key={movie.id} movieId={movie.id} image={movie.image} title={movie.title} year={movie.year} ruTitle={movie.ruTitle} />)
  })

  useEffect(() => {
    dispatch(getTopMovies());
  }, []);

  const handlerSearch = () => {

  }

  return (
    <div className='content'>
      <Header />

      {/* Предлагаю пока делать основной функуионал. И.Н. */}

      {/* <section id="random-movie" className="py-5 text-center container-fluid">
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 id="random-movie-name" className="fw-light text-light">The Suicide Squad</h1>
            <p id="random-movie-description" className="lead text-white">Supervillains Harley Quinn, Bloodsport, Peacemaker and a collection of nutty cons at Belle Reve prison join the super-secret, super-shady Task Force X as they are dropped off at the remote, enemy-infused island of Corto Maltese.</p>
          </div>
        </div>
      </section> */}
      {/* <div className="container-fluid d-flex bg-light justify-content-center p-2">
        <div className="btn-group" id="button-wrapper" srole="group" aria-label="Basic radio toggle button group">
          <input type="radio" className="btn-check" name="btnradio" id="popular" autoComplete="off" />
          <label className="btn btn-outline-dark" htmlFor="popular">Popular</label>
          <input type="radio" className="btn-check" name="btnradio" id="upcoming" autoComplete="off" />
          <label className="btn btn-outline-dark" htmlFor="upcoming">Upcoming</label>
          <input type="radio" className="btn-check" name="btnradio" id="top_rated" autoComplete="off" />
          <label className="btn btn-outline-dark" htmlFor="top_rated">Top rated</label>
        </div>
      </div> */}
      <div className="container-fluid d-flex bg-light justify-content-center">
        <form className="form-inline col-6 px-2 d-flex justify-content-center" onSubmit={handlerSearch}>
          <input className="form-control m-2 w-50" type="search" placeholder="Search" />
          <button className="btn btn-dark m-2" type="button">
            Search
          </button>
        </form>
      </div>
      <div className="album py-5 bg-light">
        <div className="container">
          <div id="film-container" className="row">
            {topMovies && moviesList}
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center pt-4">
          <button id="load-more" type="button" className="btn btn-lg btn-outline-success">
            Load more
          </button>
        </div>
      </div>
    </div>
  );
}

export default Movies;
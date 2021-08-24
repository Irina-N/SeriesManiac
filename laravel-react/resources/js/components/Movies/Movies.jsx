import React from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';

export const Movies = () => {
  const topMovies = useSelector((state) => state.movies)

  const handlerSearch = () => {

  }

  return (
  <div>
    <section id="random-movie" className="py-5 text-center container-fluid">
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          <h1 id="random-movie-name" className="fw-light text-light">The Suicide Squad</h1>
          <p id="random-movie-description" className="lead text-white">Supervillains Harley Quinn, Bloodsport, Peacemaker and a collection of nutty cons at Belle Reve prison join the super-secret, super-shady Task Force X as they are dropped off at the remote, enemy-infused island of Corto Maltese.</p>
        </div>
      </div>
    </section>
    <div className="container-fluid d-flex bg-light justify-content-center p-2">
      <div className="btn-group" id="button-wrapper" srole="group" aria-label="Basic radio toggle button group">
        <input type="radio" className="btn-check" name="btnradio" id="popular" autocomplete="off"/>
        <label className="btn btn-outline-dark" for="popular">Popular</label>
        <input type="radio" className="btn-check" name="btnradio" id="upcoming" autocomplete="off"/>
        <label className="btn btn-outline-dark" for="upcoming">Upcoming</label>
        <input type="radio" className="btn-check" name="btnradio" id="top_rated" autocomplete="off"/>
        <label className="btn btn-outline-dark" for="top_rated">Top rated</label>
      </div>
    </div>
    <div className="container-fluid d-flex bg-light justify-content-center">
        <form className="form-inline col-6 px-2 d-flex justify-content-center" onSubmit={handlerSearch}>
            <input className="form-control m-2 w-50" type="search" placeholder="Search"/>
            <button className="btn btn-dark m-2" type="button">
                Search
            </button>
        </form>
    </div>
    <div class="album py-5 bg-light">
      <div class="container">
        <div id="film-container" class="row">
          {}
        </div>
      </div>
      <div class="d-flex justify-content-center align-items-center pt-4">
        <button id="load-more" type="button" class="btn btn-lg btn-outline-success">
          Load more
        </button>
      </div>
    </div>
  </div>
  );
}

export default Movies;
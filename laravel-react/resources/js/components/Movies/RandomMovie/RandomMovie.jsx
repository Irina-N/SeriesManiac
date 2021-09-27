import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

import { getRandomMovie } from '../../../store/actions/movies';
import { shortDescriptionMapper } from '../../../helpers/mappers/movie-short-description-mapper';

import './RandomMovie.css';

export const RandomMovie = () => {
  const dispatch = useDispatch();
  const { title, ru_title, description, big_image, id } = useSelector(
    (state) => state.moviesReducer.randomMovie,
  );

  useEffect(() => {
    dispatch(getRandomMovie());
  }, []);

  return (
    <Link
      id="random-movie"
      to={`/movies/${id}`}
      className="py-5 text-center container-fluid"
      style={{ backgroundImage: `url(${big_image})` }}
    >
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          <h1 className="random-movie_title fw-light text-light">{ru_title || title}</h1>
          <div className="lead text-white text-break">
            {description ? parse(shortDescriptionMapper(description)) : ''}
          </div>
        </div>
      </div>
    </Link>
  );
};

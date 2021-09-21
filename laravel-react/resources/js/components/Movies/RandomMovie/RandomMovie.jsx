import React, { useEffect } from 'react';
import parse from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import { getRandomMovie } from '../../../store/actions/movies';
import { descriptionMapper } from '../../../helpers/mappers/movie-description-mapper';
import './RandomMovie.css';

export const RandomMovie = () => {
  const dispatch = useDispatch();
  const { title, ru_title, description, big_image } = useSelector(
    (state) => state.moviesReducer.randomMovie,
  );

  useEffect(() => {
    dispatch(getRandomMovie());
  }, []);

  return (
    <section
      id="random-movie"
      className="py-5 text-center container-fluid"
      style={{ backgroundImage: `url(${big_image})` }}
    >
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          <h1 className="fw-light text-light">{ru_title}</h1>
          <h2 className="fw-light text-light">{title}</h2>
          <div className="lead text-white text-break">
            {description ? parse(descriptionMapper(description)) : ''}
          </div>
        </div>
      </div>
    </section>
  );
};

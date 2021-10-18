import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

export const MovieCard = ({ id, image, title, year, ru_title }) => {
  return (
    <Link
      className="col-lg-3 col-md-4 col-12 p-2 movie-list-item"
      to={`/movies/${id}`}
    >
      <div className="card shadow-sm">
        <img src={image} />
        <div className="card-body">
          <h5 className="card-title text-dark">{ru_title}</h5>
          <p className="card-text truncate text-muted">{title}</p>
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">{year}</small>
          </div>
        </div>
      </div>
    </Link>
  );
};

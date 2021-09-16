import React from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../MovieCard/MovieCard';
import './MovieListItem.css'

export const MovieListItem = ({ id, image, title, year, ru_title }) => {

  return (
    <Link
      className='col-lg-3 col-md-4 col-12 p-2 movie-list-item'
      to={`/movies/${id}`}>

      <div className="card shadow-sm">
        <img src={image} />
        <h5 className="card-title">{ru_title}</h5>
        <div className="card-body">
          <p className="card-text truncate">{title}</p>
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">{year}</small>
          </div>
        </div>
      </div>
    </Link>
  )
}
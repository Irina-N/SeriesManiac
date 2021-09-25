import React from 'react';
import { Link } from 'react-router-dom';
import './UserMovieCard.css';

export const UserMovieCard = ({ id, image, ru_title, title, year, grade }) => {
  const Stars = () => {
    return (
      <div className="stars">
        <i className={`fas fa-star ${grade >= 1 && 'cheked'}`} />
        <i className={`fas fa-star ${grade >= 2 && 'cheked'}`} />
        <i className={`fas fa-star ${grade >= 3 && 'cheked'}`} />
        <i className={`fas fa-star ${grade >= 4 && 'cheked'}`} />
        <i className={`fas fa-star ${grade === 5 && 'cheked'}`} />
      </div>
    );
  };

  return (
    <div className="card mb-3 w-100">
      <Link to={`/movies/${id}`}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={image} className="img-fluid rounded-start" alt="poster" />
          </div>
          <div className="col-md-8">
            <div className="card-body w-100">
              <h4 className="card-title text-dark w-25">{ru_title}</h4>
              <h5 className="card-title text-dark w-25">({title})</h5>
              <h5 className="card-text w-25 text-muted text-center">{year}</h5>
              <Stars className="w-25" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

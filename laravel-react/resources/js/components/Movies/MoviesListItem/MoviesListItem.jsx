import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Image } from 'react-bootstrap';

import { Stars as UserRating } from '../UserMovies/Stars/Stars.jsx'

import './MoviesListItem.css'

export const MoviesListItem = ({
  id,
  image,
  ru_title,
  title,
  year,
  api_rating: rate,
  grade: user_rate,
  componentName
}) => {
  return (
    <Row
      as={Link}
      to={`/movies/${id}`}
      className='movie-list-item flex-row mb-3 p-0 w-100'
    >
      <Col xs={12} sm={6} md={3} align='center' className='p-0'>
        <Image
          src={image}
          fluid
          alt='poster'
          className='movie-list-item_img'
        />
      </Col>
      <Col xs={12} sm={6} md={9} className='d-flex align-items-center justify-content-center'>
        <div className='movie-list-item_body w-100 d-flex flex-column flex-md-row justify-content-center align-items-center p-2 p-md-0'>
          <h5 className='movie-list-item_ru-title text-dark text-center mb-2 my-md-auto mx-md-3 mx-lg-4'>{ru_title || title}</h5>
          <h5 className='movie-list-item_title text-secondary text-center mb-2 my-md-auto mx-md-3 mx-lg-4'>{ru_title ? title : ''}</h5>
          <h5 className='movie-list-item_year text-secondary text-center mb-2 my-md-auto'>{year}</h5>
          {componentName === 'userMovies' ?
            <UserRating user_rate={user_rate} />
            :
            < div className='rating d-flex flex-column text-center ms-md-2'>
              <h5 className='rating-title text-dark my-0'>Рейтинг</h5>
              <p className='rating-text text-dark mb-0 mt-1 mt-lg-2'><i className='fas fa-star text-warning' />&nbsp;{rate.toFixed(2)}</p>
            </div>
          }
        </div>
      </Col>
    </Row >
  );
};

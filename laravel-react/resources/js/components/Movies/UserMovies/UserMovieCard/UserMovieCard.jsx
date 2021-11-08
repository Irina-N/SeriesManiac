import React from 'react';
import { Link } from 'react-router-dom';

import { Row, Col, Image } from 'react-bootstrap';

import { Stars as Rating } from './Stars/Stars';

import './UserMovieCard.css';

export const UserMovieCard = ({
  id,
  image,
  ru_title,
  title,
  year,
  grade: rate,
}) => {
  return (
    <Row
      as={Link}
      to={`/movies/${id}`}
      className="user-movie-card flex-row mb-3 p-0 w-100"
    >
      <Col xs={12} sm={6} md={3} align='center' className="p-0">
        <Image
          src={image}
          fluid
          alt="poster"
          className="user-movie-card_img"
        />
      </Col>
      <Col xs={12} sm={6} md={9} className='d-flex align-items-center justify-content-center'>
        <div className='user-movie-card_body w-100 d-flex flex-column flex-md-row justify-content-center align-items-center p-2 p-md-0'>
          <h5 className="user-movie-card_ru-title text-dark text-center mb-2 my-md-auto mx-md-3 mx-lg-4">{ru_title || title}</h5>
          <h5 className="user-movie-card_title text-secondary text-center mb-2 my-md-auto mx-md-3 mx-lg-4">{ru_title ? title : ''}</h5>
          <h5 className="user-movie-card_year text-secondary text-center mb-2 my-md-auto">{year}</h5>
          <Rating rate={rate} />
        </div>
      </Col>
    </Row>
  );
};

{/* <div className="card mb-3 w-100">
      <Link to={`/movies/${id}`}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={image} className="img-fluid rounded-start" alt="poster" />
          </div>
          <div className="col-md-8">
            <div className="card-body w-100">
              <h5 className="card-title text-dark w-25">{ru_title}</h5>
              <h5 className="card-title text-dark w-25">({title})</h5>
              <h5 className="card-text w-25 text-muted text-center">{year}</h5>
              <Rating rate={rate} className="w-25" />
            </div>
          </div>
        </div>
      </Link>
    </div> */}
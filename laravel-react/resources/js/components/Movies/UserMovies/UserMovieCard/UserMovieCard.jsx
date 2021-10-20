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
      className="card mb-3 w-100"
    >
      <Col xs={12} md={3}>
        <Image src={image} className="img-fluid rounded-start" alt="poster" />
      </Col>
      <Col xs={12} md={3}>
        <h4 className="card-title text-dark">{ru_title}</h4>
      </Col>
      <Col xs={12} md={2}>
        <h5 className="card-title text-dark">({title})</h5>
      </Col>
      <Col xs={12} md={1}>
        <h5 className="card-text text-muted text-center">{year}</h5>
      </Col>
      <Col xs={12} md={3}>
        <Rating rate={rate} className="stars" />
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
              <h4 className="card-title text-dark w-25">{ru_title}</h4>
              <h5 className="card-title text-dark w-25">({title})</h5>
              <h5 className="card-text w-25 text-muted text-center">{year}</h5>
              <Rating rate={rate} className="w-25" />
            </div>
          </div>
        </div>
      </Link>
    </div> */}
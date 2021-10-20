import React from 'react';
import { Link } from 'react-router-dom';

import { Card } from 'react-bootstrap';

import './MovieCard.css';

export const MovieCard = ({ id, image, title, year, ru_title }) => {
  return (
    <Card as={Link} to={`/movies/${id}`} className="movie-list-item">
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title className="text-truncate text-dark">{ru_title || title}</Card.Title>
        <Card.Subtitle className="text-truncate text-muted">{ru_title ? title : ''}</Card.Subtitle>
        <small className="text-muted text-center">{year}</small>
      </Card.Body>
    </Card>
  );
};



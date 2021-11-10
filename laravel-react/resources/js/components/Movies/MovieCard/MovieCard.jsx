import React from 'react';
import { Link } from 'react-router-dom';

import { Card } from 'react-bootstrap';

import './MovieCard.css';

export const MovieCard = ({ id, image, title, year, ru_title }) => {
  return (
    <Card as={Link} to={`/movies/${id}`} className='movie-list-item'>
      <Card.Img variant='top' src={image} />
      <Card.Body>
        <Card.Title className='movie-ru_title text-truncate text-dark'>{ru_title || title}</Card.Title>
        <Card.Subtitle className='movie-title text-truncate text-muted mt-1 mb-2'>{ru_title ? title : ''}</Card.Subtitle>
        <Card.Text className='movie-year text-muted text-center'>{year}</Card.Text>
      </Card.Body>
    </Card>
  );
};



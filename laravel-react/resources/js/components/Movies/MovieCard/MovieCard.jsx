import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import parse from 'html-react-parser';
import { toast } from 'react-toastify';
import { descriptionMapper } from '../../../helpers/mappers/movie-description-mapper';
import Spinner from 'react-bootstrap/Spinner';

import Header from '../../Header/Header';
import MovieRateForm from '../MovieRateForm/MovieRateForm';
import { getOneMovie } from '../../../store/actions/movies';
import { clearUsersError } from '../../../store/actions/currentUser';

import './MovieCard.css';

export default function MovieCard() {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const movieId = Number(params.movieId);
  const userId = useSelector((state) => state.currentUserReducer.user.id);

  const { preloader, error } = useSelector((state) => state.moviesReducer);

  const currentMovie = useSelector((state) => state.moviesReducer.currentMovie);
  const rate = currentMovie.grade || null;

  useEffect(() => {
    if (!userId) {
      history.push('/');
    }
  }, [userId]);

  useEffect(() => {
    if (movieId) {
      dispatch(getOneMovie({ userId, movieId }));
    }
  }, []);

  useEffect(() => {
    if (error.status) {
      toast.error(error.errorMessage);
      dispatch(clearUsersError);
      history.push('/movies');
    }
  }, [error.status]);

  return (
    <div className="content">
      <Header />
      <div className='movie-card'>
        { preloader ? (
              <div id='spinner' className='d-flex justify-content-center align-items-center'>
                <Spinner animation='border' variant='warning' />
              </div>
            ) : (
        <React.Fragment>
          <div className='movie-card__main-content bg-dark'>
            <img className='movie-poster' src={currentMovie.big_image}></img>        
            <h4>{currentMovie.ru_title} ({currentMovie.title})</h4>
            <p>{currentMovie.year}</p>
            <div className='lead text-white text-break'>
              {currentMovie.description ? parse(descriptionMapper(currentMovie.description)) : ''}
            </div>
          </div>        
          <MovieRateForm movieId={movieId} userId={userId} rate={rate}/>         
        </React.Fragment>
        )}
      </div>
    </div>
  );
}
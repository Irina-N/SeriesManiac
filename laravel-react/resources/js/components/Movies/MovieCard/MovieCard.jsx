import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import parse from 'html-react-parser';
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';

import Header from '../../Header/Header';
import MovieRateForm from '../MovieRateForm/MovieRateForm';
import { getOneMovie } from '../../../store/actions/movies';
import { clearUsersError } from '../../../store/actions/currentUser';
import { descriptionMapper } from '../../../helpers/mappers/movie-description-mapper';

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
          <img className='movie-poster' src={currentMovie.big_image}></img>        
          <div className='movie-header'>
          <h4 className='movie_ru-title'>{currentMovie.ru_title || currentMovie.title}</h4>
          {currentMovie.ru_title ? (<h5 className='movie_title'>{currentMovie.title}</h5>) : ''}
          <p className='movie_year'>{currentMovie.year}</p>
          </div>
          <div className='movie-desc bg-dark lead text-white text-break'>
            {currentMovie.description ? parse(descriptionMapper(currentMovie.description)) : ''}
          </div>
                
          <MovieRateForm movieId={movieId} userId={userId} rate={rate}/>         
        </React.Fragment>
        )}
      </div>
    </div>
  );
}
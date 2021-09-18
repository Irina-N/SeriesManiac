import { createAsyncThunk } from '@reduxjs/toolkit';
import { movies as movieService } from '../../services/index';
import {
  GET_TOP,
  SEND_RATE,
  GET_ONE,
  GET_RANDOM,
  GET_MORE,
  GET_SEARCH,
} from '../ActionTypes/movies';

const getTopMovies = createAsyncThunk(
  GET_TOP,
  async (counter) => await movieService.getTopMovies(counter),
);

const getOneMovie = createAsyncThunk(
  GET_ONE,
  async (id) => await movieService.getOneMovie(id),
);

const getRandomMovie = createAsyncThunk(
  GET_RANDOM,
  async () => await movieService.getRandomMovie(),
);

const loadMoreMovies = createAsyncThunk(
  GET_MORE,
  async ({ counter, query }) =>
    await movieService.loadMoreMovies({ counter, query }),
);

const searchMovies = createAsyncThunk(
  GET_SEARCH,
  async ({ query, counter }) =>
    await movieService.searchMovies({ query, counter }),
);

/* const sendMovieRate = createAsyncThunk(
  SEND_RATE,
  async (payload) => movieService.sendMovieRate(payload)
); */

const sendMovieRate = (formData, url) => {
  return async (dispatch) => {
    console.log('started');

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Rate sent successful');
      } else {
        console.log('response.status:', response.status);
      }
    } catch (err) {
      console.log('Failed', err);
    }
  };
};

export {
  getTopMovies,
  getOneMovie,
  getRandomMovie,
  loadMoreMovies,
  searchMovies,
  sendMovieRate,
};

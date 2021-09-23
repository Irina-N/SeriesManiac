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
  async (userId, movieId) => await movieService.getOneMovie(userId, movieId),
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

const sendMovieRate = createAsyncThunk(
  SEND_RATE,
  async (payload) => movieService.sendMovieRate(payload)
);

export {
  getTopMovies,
  getOneMovie,
  getRandomMovie,
  loadMoreMovies,
  searchMovies,
  sendMovieRate,
};

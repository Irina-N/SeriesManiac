import { createSlice } from '@reduxjs/toolkit';
import {
  getTopMovies,
  getOneMovie,
  getRandomMovie,
  loadMoreMovies,
  searchMovies,
  sendMovieRate
} from '../actions/movies';
import { CLEAR_ERROR } from '../ActionTypes/movies';

const initialState = {
  movies: [],
  preloader: false,
  randomMovie: {},
  currentMovie: {},
  error: {
    status: false,
    errorMessage: '',
  },
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    [CLEAR_ERROR]: (state) => {
      state.error.status = false;
      state.error.errorMessage = '';
    },
  },
  extraReducers: {
    [getTopMovies.pending]: (state, action) => {
      state.preloader = true;
      state.error.status = false;
      state.error.errorMessage = '';
    },
    [getTopMovies.fulfilled]: (state, action) => {
      state.preloader = false;
      state.error.status = false;
      state.error.errorMessage = '';
      state.movies = [...state.movies, ...action.payload];
    },
    [getTopMovies.rejected]: (state, action) => {
      state.preloader = false;
      state.error.status = true;
      state.error.errorMessage = 'FAILED_LOAD_MOVIES';
    },
    [getOneMovie.pending]: (state, action) => {
      state.preloader = true;
      state.error.status = false;
      state.error.errorMessage = '';
    },
    [getOneMovie.fulfilled]: (state, action) => {
      state.preloader = false;
      state.error.status = false;
      state.error.errorMessage = '';
      state.currentMovie = action.payload;
    },
    [getOneMovie.rejected]: (state, action) => {
      state.preloader = false;
      state.error.status = true;
      state.error.errorMessage = 'FAILED_LOAD_MOVIE';
    },
    [getRandomMovie.pending]: (state, action) => {
      state.preloader = true;
      state.error.status = false;
      state.error.errorMessage = '';
    },
    [getRandomMovie.fulfilled]: (state, action) => {
      state.preloader = false;
      state.error.status = false;
      state.error.errorMessage = '';
      state.randomMovie = action.payload;
    },
    [getRandomMovie.rejected]: (state, action) => {
      state.preloader = false;
      state.error.status = true;
      state.error.errorMessage = 'FAILED_LOAD_RANDOM_MOVIE';
    },
    [loadMoreMovies.pending]: (state, action) => {
      state.preloader = true;
      state.error.status = false;
      state.error.errorMessage = '';
    },
    [loadMoreMovies.fulfilled]: (state, action) => {
      state.preloader = false;
      state.error.status = false;
      state.error.errorMessage = '';
      state.movies = [...state.movies, ...action.payload];
    },
    [loadMoreMovies.rejected]: (state, action) => {
      state.preloader = false;
      state.error.status = true;
      state.error.errorMessage = 'FAILED_LOAD_MORE';
    },
    [searchMovies.pending]: (state, action) => {
      state.preloader = true;
      state.error.status = false;
      state.error.errorMessage = '';
    },
    [searchMovies.fulfilled]: (state, action) => {
      state.preloader = false;
      state.error.status = false;
      state.error.errorMessage = '';
      state.movies = action.payload;
    },
    [searchMovies.rejected]: (state, action) => {
      state.preloader = false;
      state.error.status = true;
      state.error.errorMessage = 'FAILED_WHILE_SEARCH';
    },
    [sendMovieRate.pending]: (state) => {
      state.preloader = true;
      state.error.status = false;
      state.error.errorMessage = '';
    },
    [sendMovieRate.fulfilled]: (state, action) => {
      state.preloader = false;
      state.error.status = false;
      state.error.errorMessage = '';
      state.currentMovie.grade = action.meta.arg.userMovieRate;
          
    },
    [sendMovieRate.rejected]: (state, action) => {
      state.error.status = true;
      state.error.errorMessage = "Не удалось отправить данные";
    },
  },
});

export default moviesSlice.reducer;

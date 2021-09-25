import { createSlice } from '@reduxjs/toolkit';
import {
  logout,
  register,
  login,
  change,
  getUserMovies,
} from '../actions/currentUser';
import { CLEAR_ERROR } from '../ActionTypes/currentUser';

const initialState = {
  preloader: false,
  user: {},
  userMovies: [],
  error: {
    status: false,
    errorMessage: '',
  },
};

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    [CLEAR_ERROR]: (state) => {
      state.error.status = false;
      state.error.errorMessage = '';
    },
  },
  extraReducers: {
    [change]: (state, action) => {
      state.user = action.payload;
    },
    [register.pending]: (state, action) => {
      state.preloader = true;
      state.error.status = false;
      state.error.errorMessage = '';
    },
    [register.fulfilled]: (state, action) => {
      state.preloader = false;
      state.error.status = false;
      state.error.errorMessage = '';
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.preloader = false;
      state.error.status = true;
      state.error.errorMessage = action.error.message;
    },
    [login.pending]: (state, action) => {
      state.preloader = true;
      state.error.status = false;
      state.error.errorMessage = '';
    },
    [login.fulfilled]: (state, action) => {
      state.preloader = false;
      state.error.status = false;
      state.error.errorMessage = '';
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.preloader = false;
      state.error.status = true;
      state.error.errorMessage = action.error.message;
    },
    [logout.pending]: (state) => {
      state.preloader = true;
      state.error.status = false;
      state.error.errorMessage = '';
    },
    [logout.fulfilled]: (state) => {
      state.preloader = false;
      state.error.status = false;
      state.user = {};
      state.error.errorMessage = '';
    },
    [logout.rejected]: (state) => {
      state.preloader = false;
      state.error.status = true;
      state.error.errorMessage =
        'У нас возникли неполадки. Пожалуйста, повторите попытку позже';
    },
    [getUserMovies.pending]: (state, action) => {
      state.preloader = true;
      state.error.status = false;
      state.error.errorMessage = '';
    },
    [getUserMovies.fulfilled]: (state, action) => {
      state.preloader = false;
      state.error.status = false;
      state.error.errorMessage = '';
      state.userMovies = action.payload;
    },
    [getUserMovies.rejected]: (state, action) => {
      state.preloader = false;
      state.error.status = true;
      state.error.errorMessage = 'FAILED_LOAD_USER_MOVIES';
    },
  },
});

export const currentUserReducer = currentUserSlice.reducer;

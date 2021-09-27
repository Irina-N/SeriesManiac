import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { currentUser as currentUserService } from '../../services/index';
import {
  LOGIN,
  REGISTER,
  LOGOUT,
  CHANGE,
  GET_USER_MOVIES,
  GET_RECOMMEND_MOVIES,
  CLEAR_USER_ERROR,
} from '../ActionTypes/currentUser';

export const login = createAsyncThunk(LOGIN, async (payload) =>
  currentUserService.login(payload),
);

export const register = createAsyncThunk(REGISTER, async (payload) =>
  currentUserService.register(payload),
);

export const logout = createAsyncThunk(
  LOGOUT,
  async () => await currentUserService.logout(),
);

export const getUserMovies = createAsyncThunk(
  GET_USER_MOVIES,
  async (payload) => await currentUserService.getUserMovies(payload),
);

export const getRecommendMovies = createAsyncThunk(
  GET_RECOMMEND_MOVIES,
  async (payload) => await currentUserService.getRecommendMovies(payload),
);

export const change = createAction(CHANGE);

export const clearUsersError = createAction(CLEAR_USER_ERROR);

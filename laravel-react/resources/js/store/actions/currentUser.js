import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { currentUser as currentUserService } from '../../services/index';
import {
  LOGIN,
  REGISTER,
  LOGOUT,
  CHANGE,
  GET_USER_MOVIES,
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

export const change = createAction(CHANGE);

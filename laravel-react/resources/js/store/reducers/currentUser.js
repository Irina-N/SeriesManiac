import { createSlice } from '@reduxjs/toolkit';
import { logout, register, login, change } from '../actions/currentUser';

const initialState = {
    preloader: false,
    user: {},
    error: {
        status: false,
        errorMessage: '',
      }
};
 
const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState,
    reducers: {},
    extraReducers: {
      [change]: (state, action) => {
            state.user = action.payload
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
          state.error.errorMessage = 'У нас возникли неполадки. Пожалуйста, повторите попытку позже';
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
        state.error.errorMessage = action.payload || 'У нас возникли неполадки. Пожалуйста, повторите попытку позже';
      },
      [logout.pending]: (state) => {
        state.preloader = true;
        state.error.status = false;
        state.error.errorMessage = '';
      },
      [logout.fulfilled]: (state) => {
        state.preloader = false;
        state.error.status = false;
        state.error.errorMessage = '';
      },
      [logout.rejected]: (state) => {
        state.preloader = false;
        state.error.status = true;
        state.error.errorMessage = 'У нас возникли неполадки. Пожалуйста, повторите попытку позже';
      },            
    },
  })
  
export default currentUserSlice.reducer;

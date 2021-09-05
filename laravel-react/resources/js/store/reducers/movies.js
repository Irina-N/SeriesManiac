import { createSlice } from "@reduxjs/toolkit";
import { getTopMovies } from "../actions/movies";

const initialState = {
  movies: null,
  preloader: false,
  error: {
    status: false,
    errorMessage: ""
  }
}

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: {
    [getTopMovies.pending]: (state, action) => {
      state.preloader = true;
      state.error.status = false;
      state.error.errorMessage = "";
    },
    [getTopMovies.fulfilled]: (state, action) => {
      state.preloader = false;
      state.error.status = false;
      state.error.errorMessage = "";
      state.movies = action.payload;
    },
    [getTopMovies.rejected]: (state, action) => {
      state.preloader = false;
      state.error.status = true;
      state.error.errorMessage = "FAILED_LOAD_MOVIES";
    },
  },
})

export default moviesSlice.reducer;
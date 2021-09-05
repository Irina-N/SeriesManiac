import { createAsyncThunk } from "@reduxjs/toolkit";
import { movies as movieService } from "../../services/index";
import { GET_TOP } from "../ActionTypes/movies";

const getTopMovies = createAsyncThunk(
  GET_TOP,
  async () => await movieService.getTopMovies()
);

export { getTopMovies };
import { GET_TOP } from "../ActionTypes/movies";

const getTopMovies = createAsyncThunk(
  GET_TOP,
  async () => await movieService.getAllMessages()
);
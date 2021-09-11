import { createAsyncThunk } from "@reduxjs/toolkit";
import { movies as movieService } from "../../services/index";
import { GET_TOP, SEND_GRADE } from "../ActionTypes/movies";

const getTopMovies = createAsyncThunk(
  GET_TOP,
  async () => await movieService.getTopMovies()
); 

const sendMovieGrade = (formData, url) => {
  return async (dispatch) => {
    console.log('started')

      try {
          const response = await fetch(url, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json;charset=utf-8'
              },
              body: JSON.stringify(formData)
          });
          if (response.ok) {
              console.log('Grade sent successful');
          } else {
            console.log('response.status:', response.status)
          }
                   
      } catch (err) {
          console.log('Failed', err);          
      }
  }
}

export { getTopMovies, sendMovieGrade };

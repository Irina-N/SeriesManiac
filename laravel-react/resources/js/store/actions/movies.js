import { createAsyncThunk } from "@reduxjs/toolkit";
import { movies as movieService } from "../../services/index";
import { GET_TOP } from "../ActionTypes/movies";

const getTopMovies = createAsyncThunk(
  GET_TOP,
  async () => await movieService.getTopMovies()
); 


export { getTopMovies };

/* export const getTopMovies = () => {
  return async (dispatch) => {
      
      //dispatch(setRequestStatusStarted());
      
      try {
          const response = await fetch('api/movies', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json;charset=utf-8'
              },
              
          });
          if (response.ok) {
            console.log('films resp ok')
              const films = await response.json();
              console.log('films:', films)
              //dispatch(changeCurrentUser(user, 'user'));
              //dispatch(setRequestStatusIdle()); 

          } else {
            console.log('response.status:', response.status)
            const errors = await response.json();
            console.log('errors:', errors)
            
             //throw {errorCode: 400, errorDescription: errorsTextArr} 
          }
          
      } catch (err) {
          console.log('Something wrong', err);
          /* dispatch(changeCurrentUser(err, 'requestError'));
          dispatch(setRequestStatusError());
          dispatch(setRequestStatusIdle());  
      }
  }
}



 */
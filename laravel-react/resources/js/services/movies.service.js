import { HttpMethod, HttpHeader } from '../common/constants/constants';

class Movies {
  constructor({ http }) {
    this._http = http;
  }

  getTopMovies() {
    return this._http.load('api/movies', {
      method: HttpMethod.GET
    });
  }

  sendMovieGrade(formData) {
    return this._http.send('/movies/grade', formData);
  }

}

export { Movies };

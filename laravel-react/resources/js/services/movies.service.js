import { HttpMethod } from '../common/constants/constants';

class Movies {
  constructor({ http }) {
    this._http = http;
  }

  getTopMovies(counter) {
    const payload = counter ? counter : null;
    return this._http.load('api/movies', {
      method: HttpMethod.GET,
      payload,
    });
  }

  getOneMovie(id) {
    return this._http.load(`api/movies/${id}`, {
      method: HttpMethod.GET,
    });
  }

  getRandomMovie() {
    return this._http.load(`api/movies/rand`, {
      method: HttpMethod.GET,
    });
  }

  sendMovieGrade(payload) {
    return this._http.load('/movies/grade', {
      method: HttpMethod.PUT,
      payload
    });
  }

}

export { Movies };
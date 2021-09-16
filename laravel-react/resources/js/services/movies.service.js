import { HttpMethod } from '../common/constants/constants';

class Movies {
  constructor({ http }) {
    this._http = http;
  }

  getTopMovies(counter) {
    const payload = counter ? counter : null;
    return this._http.load('api/movies', {
      method: HttpMethod.POST,
      payload,
    });
  }

  getOneMovie(id) {
    return this._http.load(`api/movies/${id}`, {});
  }

  getRandomMovie() {
    return this._http.load(`api/movies/rand`, {});
  }

  searchMovies({query, counter}) {
    const payload = counter ? counter : null;
    return this._http.load(`api/movies/search?query=${query}`, {
      method: HttpMethod.POST,
      payload,
    });
  }
  
  sendMovieGrade(payload) {
    return this._http.load('/movies/grade', {
      method: HttpMethod.PUT,
      payload: JSON.stringify(payload),
    });
  }
  
  loadMoreMovies({counter, query}) {
    if (query) {
      this.searchMovies(query, counter);
    } else {
      this.getTopMovies(counter)
    }
  }

}

export { Movies };
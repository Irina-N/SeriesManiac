import { HttpMethod, ContentType } from '../common/constants/constants';

class Movies {
  constructor({ http }) {
    this._http = http;
  }

  getTopMovies(counter) {
    // const payload = counter ? {counter} : {counter: null};
    return this._http.load('api/movies', {
      method: HttpMethod.POST,
      payload: JSON.stringify({counter}),
      contentType: ContentType.JSON,
    });
  }

  getOneMovie(id) {
    return this._http.load(`api/movies/${id}`, {});
  }

  getRandomMovie() {
    return this._http.load(`api/movies/rand`, {});
  }

  searchMovies({query, counter}) {
    const payload = counter ? {counter} : {counter: null};
    return this._http.load(`api/movies/search?query=${query}`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }
  
  sendMovieGrade(payload) {
    return this._http.load('/movies/grade', {
      method: HttpMethod.PUT,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
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
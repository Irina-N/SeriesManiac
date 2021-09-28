import { HttpMethod, ContentType } from '../common/constants/constants';

class Movies {
  constructor({ http }) {
    this._http = http;
  }

  getTopMovies(counter) {
    return this._http.load('api/movies', {
      method: HttpMethod.POST,
      payload: JSON.stringify({ counter: counter ? counter : null }),
      contentType: ContentType.JSON,
    });
  }

  getOneMovie({ userId, movieId }) {
    return this._http.load(`/api/movies/${movieId}`, {
      method: HttpMethod.POST,
      payload: JSON.stringify({ userId }),
      contentType: ContentType.JSON,
    });
  }

  getRandomMovie() {
    return this._http.load(`api/movies/rand`, {});
  }

  searchMovies({ query, counter }) {
    return this._http.load(`api/movies/search?query=${query}`, {
      method: HttpMethod.POST,
      payload: JSON.stringify({ counter: counter ? counter : null }),
      contentType: ContentType.JSON,
    });
  }

  sendMovieRate(payload) {
    return this._http.load('/api/movies/rate', {
      method: HttpMethod.PUT,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }

  async loadMoreMovies({ counter, query }) {
    if (query) {
      return await this.searchMovies({ query, counter });
    } else {
      return await this.getTopMovies(counter);
    }
  }
}

export { Movies };

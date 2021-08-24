import { HttpMethod } from '../common/constants/constants';

class Movies {
  constructor({ http }) {
    this._http = http;
  }

  getTopMovies() {
    return this._http.load('https://api.myshows.ru/shows/top/all/', {
      method: HttpMethod.GET
    });
  }

}

export { Movies };
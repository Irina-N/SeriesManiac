import { HttpMethod, ContentType } from '../common/constants/constants';

class CurrentUser {
  constructor({ http }) {
    this._http = http;
  }

  login(payload) {
    return this._http.load('api/login', {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }

  register(payload) {
    return this._http.load('api/register', {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }

  logout(){    
    return this._http.load('/api/logout');
  }
  
}

export { CurrentUser };

import { HttpHeader, HttpMethod, ContentType } from '../common/constants/constants';

class Http {

  async load(url, options = {}) {
    const {
      method = HttpMethod.GET,
      payload = null,
      contentType,
    } = options;

    const headers = this._getHeaders({
      contentType
    });

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: payload
      });

      const response_1 = await this._checkStatus(response);

      return this._parseJSON(response_1);

    } catch (err) {
      return this._throwError(err);
    }
  }

  _getHeaders({ contentType }) {
    const headers = new Headers();

    if (contentType) {
      headers.append(HttpHeader.CONTENT_TYPE, contentType);
    }

    return headers;
  }

  async _checkStatus(response) {
    if (!response.ok) {
      const parsedException = await response.json();

      throw new Error(parsedException?.message ?? response.statusText);
    }

    return response;
  }

  _parseJSON(response) {
    return response.json();
  }

  _throwError(err) {
    throw err;
  }
}

export { Http };
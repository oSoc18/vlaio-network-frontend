import Cookies from 'universal-cookie';

const cookies = new Cookies();

class API {
  constructor(url) {
    this.BASE_URL = url;
    this.headers = new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    });
  }

  static parseResponse(response) {
    if (response.status === 403 || response.status === 401) {
      window.location.href = 'logout';
    }
    return response.json();
  }

  getOptions(method, authRequired = false, body = null) {
    const options = {
      method: method.toUpperCase(),
      headers: this.headers
    };
    if (body) options.body = JSON.stringify(body);

    if (authRequired && !options.headers.get('Authorization')) {
      options.headers.append('Authorization', `Token ${cookies.get('auth')}`);
    }
    return options;
  }
}

export default API;

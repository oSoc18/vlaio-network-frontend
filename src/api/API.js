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

  getOptions(method, authRequired = false, body = null) {
    const options = {
      method: method.toUpperCase(),
      headers: this.headers
    };
    if (body) options.body = JSON.stringify(body);
    if (authRequired) options.headers.append('Authorization', `Token ${cookies.get('auth')}`);
    return options;
  }
}

export default API;

import Cookies from 'universal-cookie';

const cookies = new Cookies();

class APIMulti {
  constructor(url) {
    this.BASE_URL = url;
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

export default APIMulti;

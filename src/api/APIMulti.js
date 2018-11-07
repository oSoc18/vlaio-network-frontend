import Cookies from 'universal-cookie';

const cookies = new Cookies();

class APIMulti {
  constructor(url) {
    this.BASE_URL = url;
  }

  getOptions(method, authRequired = false, body = null) {
    const options = {
      method: method.toUpperCase()
    };
    if (body) options.body = JSON.stringify(body);


    return options;
  }
}

export default APIMulti;

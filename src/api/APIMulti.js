import Cookies from 'universal-cookie';

const cookies = new Cookies();

class APIMulti {
  constructor(url) {
    this.BASE_URL = url;
    this.headers = new Headers({

      Accept: 'application/json'

    });
  }

  getOptions(method, authRequired = false, body = null) {
    const options = {
      method: method.toUpperCase(),
      headers: this.headers
    };
    const formdata = new FormData();
    if (body) {
      body.forEach((element) => {
        formdata.append('file', element);
      });
      options.body = formdata;
    }
    if (authRequired && !options.headers.get('Authorization')) {
      options.headers.append('Authorization', `Token ${cookies.get('auth')}`);
    }

    return options;
  }
}

export default APIMulti;

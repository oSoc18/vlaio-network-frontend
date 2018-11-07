import Cookies from 'universal-cookie';

const cookies = new Cookies();

class APIMulti {
  constructor(url) {
    this.BASE_URL = url;
    this.headers = new Headers({
      Accept: 'application/json',
      'content-type': 'multipart/form-data'
    });
  }

  getOptions(method, authRequired = false, body = null) {
    const options = {
      method: method.toUpperCase(),
      headers: this.headers,
      accessControlAllowMethods: 'GET, PUT, POST, PATCH, DELETE'
    };
    const formdata = new FormData();
    if (body) {
      console.log(body);
      body.forEach((element) => {
        formdata.append(element.name, element);
      });
      options.content = formdata;
      for (var pair of formdata.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
    }
    }
    if (authRequired && !options.headers.get('Authorization')) {
      options.headers.append('Authorization', `Token ${cookies.get('auth')}`);
    }

    return options;
  }
}

export default APIMulti;

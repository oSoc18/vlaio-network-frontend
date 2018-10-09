class API {
  constructor(url) {
    this.BASE_URL = url;
    this.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
  }

  getOptions(method, authRequired = false, body = null) {
    const options = {
      method: method.toUpperCase(),
      headers: this.headers
    };
    if (body) options.body = JSON.stringify(body);
    // if (authRequired) options.credentials = 'include';
    return options;
  }
}

export default API;

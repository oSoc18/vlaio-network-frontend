class API {
  constructor(url) {
    this.BASE_URL = url;
    this.headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };
  }
}

export default API;

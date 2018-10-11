import API from './API';

class SunburstAPI extends API {
  constructor(url) {
    super(url);
    this.endpoint = `${this.BASE_URL}/view/`;
  }

  get() {
    return fetch(this.endpoint, { headers: this.headers }).then(r => r.json());
  }
}

export default SunburstAPI;

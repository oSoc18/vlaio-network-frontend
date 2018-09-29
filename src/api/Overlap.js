import API from './API';

class OverlapAPI extends API {
  constructor(url) {
    super(url);
    this.endpoint = `${this.BASE_URL}/overlap/`;
  }

  get() {
    return fetch(this.endpoint, { headers: this.headers }).then(r => r.json());
  }
}

export default OverlapAPI;

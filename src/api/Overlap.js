import API from './API';

class OverlapAPI extends API {
  constructor(url) {
    super(url);
    this.endpoint = `${this.BASE_URL}/overlap/`;
  }

  get() {
    return fetch(this.endpoint, this.getOptions('GET', true)).then(r => r.json());
  }
}

export default OverlapAPI;

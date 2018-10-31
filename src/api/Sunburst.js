import API from './API';

class SunburstAPI extends API {
  constructor(url) {
    super(url);
    this.endpoint = `${this.BASE_URL}/view/`;
  }

  get() {
    return fetch(this.endpoint, this.getOptions('GET', true)).then(r => r.json());
  }
}

export default SunburstAPI;

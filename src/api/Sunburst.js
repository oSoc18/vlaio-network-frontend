import API from './API';

class SunburstAPI extends API {
  constructor(url) {
    super(url);
    this.endpoint = `${this.BASE_URL}/view/`;
  }

  get(type) {
    return fetch(`${this.endpoint}?criteria=${type}&max_depth=20`, this.getOptions('GET', true)).then(r => r.json());
  }
}

export default SunburstAPI;

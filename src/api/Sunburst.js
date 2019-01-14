import API from './API';

class SunburstAPI extends API {
  constructor(url) {
    super(url);
    this.endpoint = `${this.BASE_URL}/view/`;
  }

  get(type) {
    return fetch(`${this.endpoint}?criteria=${type}`, this.getOptions('GET', true)).then(r => API.parseResponse(r));
  }
}

export default SunburstAPI;

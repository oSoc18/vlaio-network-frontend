import API from './API';

class InteractionAPI extends API {
  constructor(url) {
    super(url);
    this.endpoint = `${this.BASE_URL}/interactions`;
  }

  getTypes() {
    return fetch(`${this.endpoint}/types/`, this.getOptions('GET', true)).then(r => API.parseResponse(r));
  }
}

export default InteractionAPI;

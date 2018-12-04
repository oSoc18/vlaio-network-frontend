import API from './API';

class CompanyAPI extends API {
  constructor(url) {
    super(url);
    this.endpoint = `${this.BASE_URL}/companies`;
  }

  get() {
    return fetch(`${this.endpoint}/`, this.getOptions('GET', true)).then(r => API.parseResponse(r));
  }

  getTimeline(companyId) {
    return fetch(`${this.endpoint}/${companyId}/interactions`, this.getOptions('GET', true)).then(r => API.parseResponse(r));
  }
}

export default CompanyAPI;

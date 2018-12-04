import API from './API';

class CompanyAPI extends API {
  constructor(url) {
    super(url);
    this.endpoint = `${this.BASE_URL}/companies`;
  }

  get() {
    return fetch(`${this.endpoint}/`, this.getOptions('GET', true)).then(r => r.json());
  }

  getTimeline(companyId) {
    return fetch(`${this.endpoint}/${companyId}/interactions`, this.getOptions('GET', true)).then(r => r.json());
  }
}

export default CompanyAPI;

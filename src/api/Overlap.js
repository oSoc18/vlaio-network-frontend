import API from './API';

class OverlapAPI extends API {
  constructor(url) {
    super(url);
    this.endpoint = `${this.BASE_URL}/overlap/`;
  }

  get(filters) {
    const queryString = (filters)
      ? Object.keys(filters).reduce((string, filter) => {
        /* eslint-disable no-param-reassign */
        if (filters[filter] === null) return string;
        string ? string += '&' : string += '?';
        string += `${filter}=${filters[filter]}`;
        return string;
      }, '')
      : '';
    return fetch(`${this.endpoint}${queryString}`, this.getOptions('GET', true)).then(r => r.json());
  }
}

export default OverlapAPI;

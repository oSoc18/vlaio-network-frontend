import API from './API';

class UserAPI extends API {
  constructor(url) {
    super(url);
    this.endpoint = `${this.BASE_URL}/user`;
    this.tmpurl = 'http://localhost:8000/user';
  }

  login(username, password) {
    return fetch(`${this.tmpurl}/login/`, this.getOptions('POST', false, { username, password }))
      .then(r => r.json());
  }

  get() {
    return fetch(`${this.tmpurl}/`, this.getOptions('GET', true))
      .then(r => r.json());
  }
}

export default UserAPI;

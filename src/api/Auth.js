import API from './API';

class AuthAPI extends API {
  constructor(url) {
    super(url);
    this.endpoint = `${this.BASE_URL}/user`;
    this.tmpurl = 'http://localhost:8000/user/login/';
  }

  login(username, password) {
    return fetch(this.tmpurl, this.getOptions('POST', false, { username, password }))
      .then(r => r.json());
  }
}

export default AuthAPI;

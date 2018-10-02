import API from './API';

class AuthAPI extends API {
  constructor(url) {
    super(url);
    this.endpoint = `${this.BASE_URL}/user/`;
  }
}

export default AuthAPI;

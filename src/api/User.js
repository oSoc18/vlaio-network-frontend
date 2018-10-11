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

  create(user) {
    return fetch(`${this.tmpurl}/`, this.getOptions('POST', true, user)).then(r => r.json());
  }

  update(userId, toUpdate) {
    return fetch(`${this.tmpurl}/${userId}`, this.getOptions('PATCH', true, toUpdate)).then(r => r.json());
  }

  setRole(userId, role) {
    return this.update(userId, { role });
  }

  delete(id) {
    return fetch(`${this.tmpurl}/${id}`, this.getOptions('DELETE', true));
  }
}

export default UserAPI;

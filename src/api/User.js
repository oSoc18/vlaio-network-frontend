import API from './API';

class UserAPI extends API {
  constructor(url) {
    super(url);
    this.endpoint = `${this.BASE_URL}/user`;
  }

  login(username, password) {
    return fetch(`${this.endpoint}/login/`, this.getOptions('POST', false, { username, password }))
      .then(r => r.json());
  }

  get() {
    return fetch(`${this.endpoint}/`, this.getOptions('GET', true))
      .then(r => r.json())
      .catch(err => console.error(err));
  }

  create(user) {
    return fetch(`${this.endpoint}/`, this.getOptions('POST', true, user)).then(r => r.json());
  }

  update(user) {
    return fetch(`${this.endpoint}/${user.id}`, this.getOptions('PATCH', true, user));
  }

  setRole(userId, role) {
    return this.update(userId, { role });
  }

  delete(id) {
    return fetch(`${this.endpoint}/${id}`, this.getOptions('DELETE', true));
  }
}

export default UserAPI;

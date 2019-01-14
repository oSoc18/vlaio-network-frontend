import API from './API';

class UserAPI extends API {
  constructor(url) {
    super(url);
    this.endpoint = `${this.BASE_URL}/user`;
  }

  login(username, password) {
    return fetch(`${this.endpoint}/login/`, this.getOptions('POST', false, { username, password }))
      .then(r => API.parseResponse(r));
  }

  get() {
    return fetch(`${this.endpoint}/`, this.getOptions('GET', true))
      .then(r => API.parseResponse(r))
      .catch(err => console.error(err));
  }

  create(user) {
    return fetch(`${this.endpoint}/`, this.getOptions('POST', true, user)).then(r => API.parseResponse(r));
  }

  update(user) {
    return fetch(`${this.endpoint}/${user.id}`, this.getOptions('PATCH', true, user)).then(r => API.parseResponse(r));
  }

  setRole(userId, role) {
    return fetch(`${this.endpoint}/${userId}`, this.getOptions('PATCH', true, { role })).then(r => API.parseResponse(r));
  }

  delete(id) {
    return fetch(`${this.endpoint}/${id}`, this.getOptions('DELETE', true));
  }
}

export default UserAPI;

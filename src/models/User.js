import uuid from 'uuid/v1';

class User {
  constructor(user) {
    this.firstName = user.first_name;
    this.lastName = user.last_name;
    this.email = user.email;
    // TODO remove when role is included in response
    this.id = user.id || uuid();
    this.role = user.role || 'user';
  }

  get isAdmin() {
    // TODO remove when role is included in response
    return true;
    // return this.role === 'admin';
  }

  get isPending() {
    return this.role === 'pending';
  }
}

export default User;

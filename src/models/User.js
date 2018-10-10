class User {
  constructor({ firstName, lastName, role }) {
    this.firstName = firstName;
    this.lastName = lastName;
    // TODO remove when role is included in response
    this.role = role || 'user';
  }

  get isAdmin() {
    // TODO remove when role is included in response
    return true;
    // return this.role === 'admin';
  }
}

export default User;

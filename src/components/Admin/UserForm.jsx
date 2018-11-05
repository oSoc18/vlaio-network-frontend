import React, { Component } from 'react';
import PropTypes from 'prop-types';
import User from '../../models/User';

class UserForm extends Component {
  state = {
    email: '',
    firstName: '',
    lastName: ''
  };

  static getDerivedStateFromProps(props, state) {
    if (props.user && props.user.email !== state.email) {
      return { ...props.user };
    }
    return { ...state };
  }

  handleChange = (e) => {
    this.setState({ [e.currentTarget.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, firstName, lastName } = this.state;
    const { user } = this.props;

    const newUser = { email, firstName, lastName };
    if (!user) this.props.addUser(newUser);
    else this.props.updateUser(user.id, newUser);
  }

  render() {
    const { user } = this.props;
    const { email, firstName, lastName } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="user-management__user-form">
        <label htmlFor="email">
          Email
          <input type="email" id="email" name="email" className="input" value={email} onChange={this.handleChange} />
        </label>
        <label htmlFor="first-name">
          Voornaam
          <input type="text" id="first-name" name="firstName" className="input" value={firstName} onChange={this.handleChange} />
        </label>
        <label htmlFor="last-name">
          Naam
          <input type="text" id="last-name" name="lastName" className="input" value={lastName} onChange={this.handleChange} />
        </label>
        <input type="submit" className="button" value={user ? 'Bewerken' : 'Toevoegen'} />
      </form>
    );
  }
}

UserForm.defaultProps = {
  user: null
};

UserForm.propTypes = {
  user: PropTypes.instanceOf(User),
  addUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired
};

export default UserForm;

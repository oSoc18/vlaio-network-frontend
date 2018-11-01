import React, { Component } from 'react';
import PropTypes from 'prop-types';
import User from '../../models/User';

class UserForm extends Component {
  state = {};

  render() {
    const { user } = this.props;

    return (
      <form>
        <input type="text" />
      </form>
    );
  }
}

UserForm.defaultProps = {
  user: null
};

UserForm.propTypes = {
  user: PropTypes.instanceOf(User)
};

export default UserForm;

import React from 'react';
import PropTypes from 'prop-types';
import User from '../../models/User';

const UserEntry = ({ user }) => (
  <p>{user.firstName}</p>
);

UserEntry.propTypes = {
  user: PropTypes.instanceOf(User).isRequired
};

export default UserEntry;

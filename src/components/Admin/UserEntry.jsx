import React from 'react';
import PropTypes from 'prop-types';
import User from '../../models/User';

const UserEntry = ({ user }) => (
  <tr>
    <td>{user.firstName}</td>
    <td>{user.lastName}</td>
    <td>{user.email}</td>
    <td>{user.role}</td>
    <td>acties</td>
  </tr>
);

UserEntry.propTypes = {
  user: PropTypes.instanceOf(User).isRequired
};

export default UserEntry;

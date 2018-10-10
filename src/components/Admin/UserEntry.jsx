import React from 'react';
import PropTypes from 'prop-types';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import User from '../../models/User';
import IconButton from '../UI/IconButton';

const UserEntry = ({ user, deleteUser }) => (
  <tr>
    <td>{user.firstName}</td>
    <td>{user.lastName}</td>
    <td>{user.email}</td>
    <td>{user.role}</td>
    <td className="user-management__users__actions">
      <IconButton icon={faTrash} tabIndex={0} onClick={() => { deleteUser(user.id); }} />
    </td>
  </tr>
);

UserEntry.propTypes = {
  user: PropTypes.instanceOf(User).isRequired,
  deleteUser: PropTypes.func.isRequired
};

export default UserEntry;

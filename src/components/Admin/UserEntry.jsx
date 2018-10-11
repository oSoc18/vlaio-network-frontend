import React from 'react';
import PropTypes from 'prop-types';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import User from '../../models/User';
import IconButton from '../UI/IconButton';

const UserEntry = ({ user, changeUserRole, deleteUser }) => (
  <tr>
    <td>{user.firstName}</td>
    <td>{user.lastName}</td>
    <td>{user.email}</td>
    <td className="user-management__users__role">
      { user.isPending
        ? user.role
        : (
          <select
            defaultValue={user.role}
            onChange={e => changeUserRole(e, user)}
            className="a-select"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        )
      }
    </td>
    <td className="user-management__users__actions">
      <IconButton icon={faTrash} tabIndex={0} onClick={() => { deleteUser(user.id); }} />
    </td>
  </tr>
);

UserEntry.propTypes = {
  user: PropTypes.instanceOf(User).isRequired,
  changeUserRole: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired
};

export default UserEntry;

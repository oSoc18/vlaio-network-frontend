import React from 'react';
import PropTypes from 'prop-types';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import User from '../../models/User';
import IconButton from '../UI/IconButton';

const UserTable = ({
  users, searchQuery, changeUserRole, deleteUser, currentUser
}) => {
  const roleWeighing = {
    pending: 1,
    admin: 2,
    user: 3
  };
  return (
    <table className="user-management__users">
      <thead>
        <tr>
          <th>Voornaam</th>
          <th>Naam</th>
          <th>Email</th>
          <th className="user-management__users__role">Rol</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        { users
          .filter(user => (
            user.id !== currentUser.id
            && (user.firstName.toLowerCase().includes(searchQuery)
            || user.email.toLowerCase().includes(searchQuery)
            || user.lastName.toLowerCase().includes(searchQuery)
            || user.role.toLowerCase().includes(searchQuery))
          ))
          .sort((u1, u2) => (
            roleWeighing[u1.role] - roleWeighing[u2.role] || u1.lastName > u2.lastName
          ))
          .map(user => (
            <tr key={user.id}>
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
          ))
        }
      </tbody>
    </table>
  );
};

UserTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.instanceOf(User)).isRequired,
  currentUser: PropTypes.instanceOf(User).isRequired,
  changeUserRole: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired
};

export default UserTable;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { api } from '../../constants';
import IconButton from '../UI/IconButton';
import UserTable from './UserTable';
import UserForm from './UserForm';
import User from '../../models/User';

import '../../assets/styles/user-management.css';

Modal.setAppElement('#root');

class Manage extends Component {
  state = {
    users: [],
    searchQuery: '',
    userModalShown: false,
    userBeingModified: null
  };

  componentDidMount() {
    api.user.get().then((allUsers) => {
      const users = allUsers.map(user => new User(user)) || [];
      this.setState({ users });
    });
  }

  openUserModal = (user) => {
    this.setState({ userModalShown: true, userBeingModified: user || null });
  }

  closeUserModal = () => {
    this.setState({ userModalShown: false });
  }

  changeUserRole = (e, user) => {
    const role = e.currentTarget.value;
    api.user.setRole(user.id, role).then(() => {});
  }

  addUser = (user) => {
    api.user.create({
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email
    }).then((newUser) => {
      this.setState((prevState) => {
        prevState.users.push(new User(newUser));
        return {
          users: [...prevState.users],
          userModalShown: false,
          userBeingModified: null
        };
      });
    }).catch((err) => {
      console.error(err);
    });
  }

  updateUser = (userId, user) => {
    api.user.update({
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      id: userId
    }).then((updatedUser) => {
      this.setState((prevState) => {
        const users = [...prevState.users];
        const userIndex = users.findIndex(usr => usr.id === userId);
        users[userIndex] = new User(updatedUser);
        return {
          users,
          userModalShown: false,
          userBeingModified: null
        };
      });
    }).catch((err) => {
      console.error(err);
    });
  }

  deleteUser = (id) => {
    api.user.delete(id).then(() => {
      this.setState((prevState) => {
        const users = [...prevState.users];
        users.splice(users.findIndex(user => user.id === id), 1);
        return { users };
      });
    });
  }

  searchUser = (e) => {
    this.setState({ searchQuery: e.currentTarget.value });
  }

  render() {
    const {
      users, searchQuery, userModalShown, userBeingModified
    } = this.state;
    const { currentUser } = this.props;

    return (
      <main className="user-management">
        <h2 className="user-management__title">Gebruikersbeheer</h2>
        <div className="user-management__actions">
          { users.length > 0
            && (
            <input
              type="search"
              className="input user-management__actions__search"
              placeholder="zoek naar gebruikers..."
              onChange={this.searchUser}
            />
            )
          }
          <button type="button" onClick={() => this.openUserModal()} className="button user-management__actions__add-user">
            <i><FontAwesomeIcon icon={faPlus} /></i>
            Gebruiker toevoegen
          </button>
        </div>
        <Modal
          isOpen={userModalShown}
          onRequestClose={this.closeUserModal}
          className="modal user-management__modal"
          overlayClassName="modal-overlay"
        >
          <IconButton
            className="modal__close"
            icon={faTimes}
            onClick={this.closeUserModal}
            tabIndex={0}
          />
          <h2>{userBeingModified ? 'Gebruiker bewerken' : 'Gebruiker toevoegen' }</h2>
          <UserForm
            addUser={this.addUser}
            updateUser={this.updateUser}
            user={userBeingModified}
          />
        </Modal>
        { users.length > 0 && !(users.length === 1 && users[0].id === currentUser.id)
          ? (
            <UserTable
              users={users}
              currentUser={currentUser}
              searchQuery={searchQuery}
              selectUser={this.openUserModal}
              changeUserRole={this.changeUserRole}
              deleteUser={this.deleteUser}
            />
          ) : (
            <p>Er zijn nog geen gebruikers om weer te geven</p>
          )
        }
      </main>
    );
  }
}

Manage.propTypes = {
  currentUser: PropTypes.instanceOf(User).isRequired
};

export default Manage;

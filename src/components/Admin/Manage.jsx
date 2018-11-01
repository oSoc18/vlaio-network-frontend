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
import Header from '../Header';
import Footer from '../Footer';

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

  addUser = () => {
    this.setState({ userModalShown: true });
    api.user.create({
      first_name: 'John',
      last_name: 'Smith',
      email: 'john@smith.com',
      role: 'user'
    }).then((user) => {
      this.setState((prevState) => {
        prevState.users.push(user);
        return { users: [...prevState.users, user] };
      });
    }).catch((err) => {
      console.error(err);
    });
  }

  deleteUser = (id) => {
    api.user.delete(id).then(() => {
      this.setState((prevState) => {
        const { users } = prevState;
        return { users: users.splice(users.findIndex(i => i.id === id), 1) };
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
      <div className="main-layout">
        <Header user={currentUser} />
        <div className="page-alternative">
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
              className="modal"
              overlayClassName="modal-overlay"
            >
              <IconButton
                className="modal__close"
                icon={faTimes}
                onClick={this.closeUserModal}
                tabIndex={0}
              />
              <UserForm user={userBeingModified} />
            </Modal>
            { users.length > 0 && !users.find(user => user.id === currentUser.id)
              ? (
                <UserTable
                  users={users}
                  currentUser={currentUser}
                  searchQuery={searchQuery}
                  changeUserRole={this.changeUserRole}
                  deleteUser={this.deleteUser}
                />
              ) : (
                <p>Er zijn nog geen gebruikers om weer te geven</p>
              )
            }
          </main>
        </div>
        <Footer />
      </div>
    );
  }
}

Manage.propTypes = {
  currentUser: PropTypes.instanceOf(User).isRequired
};

export default Manage;

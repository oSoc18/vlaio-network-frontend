import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { api } from '../../constants';
import UserTable from './UserTable';
import User from '../../models/User';
import Header from '../Header';
import Footer from '../Footer';

import '../../assets/styles/user-management.css';


class Manage extends Component {
  state = {
    users: [],
    searchQuery: ''
  };

  componentDidMount() {
    api.user.get().then((allUsers) => {
      const users = allUsers.map(user => new User(user)) || [];
      this.setState({ users });
    });
  }

  changeUserRole = (e, user) => {
    const role = e.currentTarget.value;
    api.user.setRole(user.id, role).then(() => {});
  }

  addUser = () => {
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
    const { users, searchQuery } = this.state;
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
              <button type="button" onClick={this.addUser} className="button user-management__actions__add-user">
                <i><FontAwesomeIcon icon={faPlus} /></i>
                Gebruiker toevoegen
              </button>
            </div>
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

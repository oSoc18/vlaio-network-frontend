import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { api } from '../../constants';
import UserEntry from './UserEntry';
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
    const roleWeighing = {
      pending: 1,
      admin: 2,
      user: 3
    };
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
              <button type="button" className="button">Gebruiker toevoegen</button>
            </div>
            { users.length > 0
              ? (
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
                        <UserEntry
                          key={user.id}
                          changeUserRole={this.changeUserRole}
                          deleteUser={this.deleteUser}
                          user={user}
                        />
                      ))
                    }
                  </tbody>
                </table>
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

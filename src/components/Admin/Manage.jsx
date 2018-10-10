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

  searchUser = (e) => {
    this.setState({ searchQuery: e.currentTarget.value });
  }

  render() {
    // TODO remove user fixtures
    // const { users } = this.state;
    const { searchQuery } = this.state;
    const users = [
      new User({
        id: 1, first_name: 'John', last_name: 'Doe', role: 'user', email: 'john@doe.com'
      }),
      new User({
        id: 2, first_name: 'John', last_name: 'Smith', role: 'admin', email: 'john@smith.com'
      }),
      new User({
        id: 3, first_name: 'Jane', last_name: 'Doe', role: 'pending', email: 'jane@doe.com'
      }),
      new User({
        id: 4, first_name: 'Jane', last_name: 'Smith', role: 'user', email: 'john@smith.com'
      })
    ];
    const roleWeighing = {
      pending: 1,
      admin: 2,
      user: 3
    };
    const { currentUser } = this.props;
    return (
      <div className="main-layout">
        <Header user={currentUser} />
        <div className="page-alternative">
          <main className="user-management">
            <h2 className="user-management__title">Gebruikersbeheer</h2>
            <input
              type="search"
              className="input user-management__user-search"
              placeholder="zoek naar gebruikers..."
              onChange={this.searchUser}
            />
            <table className="user-management__users">
              <tr>
                <th>Voornaam</th>
                <th>Naam</th>
                <th>Email</th>
                <th>Rol</th>
                <th>&nbsp;</th>
              </tr>
              { users
                .filter(user => user.id !== currentUser.id)
                .filter(user => (
                  user.firstName.toLowerCase().includes(searchQuery)
                  || user.email.toLowerCase().includes(searchQuery)
                  || user.lastName.toLowerCase().includes(searchQuery)
                  || user.role.toLowerCase().includes(searchQuery)
                ))
                .sort((u1, u2) => (
                  roleWeighing[u1.role] - roleWeighing[u2.role] || u1.lastName > u2.lastName
                ))
                .map(user => <UserEntry key={user.id} user={user} />)
              }
            </table>
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

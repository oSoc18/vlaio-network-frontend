import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { api } from '../../constants';
import UserEntry from './UserEntry';
import User from '../../models/User';
import Header from '../Header';
import Footer from '../Footer';

import '../../assets/styles/user-management.css';


class Manage extends Component {
  state = { users: [] };

  componentDidMount() {
    api.user.get().then((allUsers) => {
      const users = allUsers.map(user => new User(user)) || [];
      this.setState({ users });
    });
  }

  render() {
    const { users } = this.state;
    const { currentUser } = this.props;
    return (
      <div className="main-layout">
        <Header />
        <div className="page-alternative">
          <main className="user-management">
            <h2 className="user-management__title">Gebruikersbeheer</h2>
            <div className="user-management__users">
              { users
                .filter(user => user.id !== currentUser.id)
                .map(user => <UserEntry key={user.id} user={user} />)
              }
            </div>
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

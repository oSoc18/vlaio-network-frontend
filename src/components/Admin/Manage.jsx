import React, { Component } from 'react';
import { api } from '../../constants';
import Header from '../Header';
import Footer from '../Footer';

import '../../assets/styles/user-management.css';

class Manage extends Component {
  state = { users: [] };

  componentDidMount() {
    api.user.get().then((users) => {
      this.setState({ users: users.length ? users : [] });
    });
  }

  render() {
    return (
      <div className="main-layout">
        <Header />
        <div className="page-alternative">
          <main className="user-management">
            <p>Beheer gebruikers</p>
          </main>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Manage;

import React from 'react';
import Nav from './Nav';
import firebase from 'firebase';
import { app, auth, isAuthenticated } from '../base';
import { Redirect } from 'react-router-dom';

class Dashboard extends React.Component {
  state = {
    email: ''
  }
  componentDidMount() {
    this.getUser();
  }
  getUser() {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged(user => {
        if(user) {
          console.log(user);
          this.setState({ email: user.email })
        } else {
          console.error('No user logged in.');
        }
      })
    })
  }
  signOut() {
    auth.signOut()
      .then(() => {
        console.log('signed out!');
      })
  }
  render() {
    return (
      <div className="landing__dashboard">
        <Nav signOut={this.signOut} email={this.state.email} />
        {/* Recipes */}
      </div>
    )
  }
}

export default Dashboard;

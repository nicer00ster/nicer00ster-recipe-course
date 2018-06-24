import React from 'react';
import firebase from 'firebase';
import { app, auth } from '../base';

class Dashboard extends React.Component {
  signOut() {
    auth.signOut()
      .then(() => {
        console.log('signed out!');
      })
  }
  render() {
    return (
      <div>
        DASHBOARD
        <button onClick={() => this.signOut()}>logout</button>
      </div>
    )
  }
}

export default Dashboard;

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter, Link } from 'react-router-dom';
import firebase from 'firebase';
import { app, isAuthenticated } from '../base';
import App from './App';
import Dashboard from './Dashboard';
import Account from './Account';
import Login from './Login';


// App hub, must be authenticated with Firebase to view
const Protected = ({ component: Component, ...rest }) => (
  <Route { ...rest } render={(props) => (
    isAuthenticated()
     ? <Component { ...props } />
     : <Redirect to={{
       pathname: '/',
       state: { from: props.location }
     }}/>
  )} />
)

export default function Routes() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Login} />
        <Route path="/account" component={Account} />
        <Protected path="/dashboard" component={Dashboard} />
      </div>
    </Router>
  )
}

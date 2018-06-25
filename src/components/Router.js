import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { isAuthenticated } from '../base';
import Dashboard from './Dashboard';
import Account from './Account';
import Login from './Login';


// Dashboard, must be authenticated with Firebase to view
const Protected = ({ component: Component, ...rest }) => (
  <Route { ...rest } render={(props) => (
    isAuthenticated()
     ? <Component { ...props } { ...rest }/>
     : <Redirect to={{
       pathname: '/',
       state: { from: props.location }
     }}/>
  )} />
)


// Router with protected route (dashboard)
const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route
          render={({ location }) => (
            <TransitionGroup>
              <CSSTransition key={location.key} classNames="fade" timeout={300}>
                <Switch location={location}>
                  <Route exact path="/" component={Login} />
                  <Route path="/account" component={Account} />
                  <Protected path="/dashboard" component={Dashboard} />
                  <Redirect to="/" />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
      </Switch>
    </Router>
  )
}


export default Routes;

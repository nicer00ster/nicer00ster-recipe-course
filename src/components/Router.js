import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import { isAuthenticated } from '../base';
import Dashboard from './Dashboard';
import Account from './Account';
import Login from './Login';
import Settings from './Settings';


// Dashboard, must be authenticated with Firebase to view
const Protected = ({ component: Component, ...rest  }) => (
  <Switch>
    <Route { ...rest } render={props => (
        isAuthenticated()
        ? (<Component { ...props } { ...rest }/>)
        : (<Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }}/>)
      )}/>
  </Switch>
)


// Router with protected route (dashboard)
const Routes = () => {
  return (
    <Router>
      <Route
        render={({ location }) => (
          <AnimatedSwitch
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 1 }}
            atActive={{ opacity: 1 }}
            className="switch-wrapper">
            <Route exact path="/" component={Login} />
            <Route exact path="/account" component={Account} />
            <Route exact path="/settings" component={Settings} />
            <Protected exact path="/dashboard" component={Dashboard} />
            <Route render={() => <div>Not Found</div>} />
          </AnimatedSwitch>
        )}/>
    </Router>
  )
}


export default Routes;

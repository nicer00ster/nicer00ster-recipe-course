import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import Dashboard from './Dashboard';
import Account from './Account';
import Loading from './Loading';
import Login from './Login';
import Settings from './Settings';


// Dashboard, must be authenticated with Firebase to view
function Protected({ component: Component, authed, ...rest  }) {
  return (
    <Route { ...rest } render={props => authed === true
      ? <Component { ...props } { ...rest }/>
      : <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    }/>
  )
}

// Login/Register, if authenticatd redirect to dashboard
function Landing({ component: Component, authed, ...rest }) {
  return (
    <Route { ...rest } render={props => authed === false
        ? <Component { ...props } { ...rest } />
        : <Redirect to='/dashboard' />
    }/>
  )
}


// Router with protected route (dashboard)
const Routes = ({ authed, loading }) => {
  return (
    <Router>
        <Route
          render={({ location }) => (
            <AnimatedSwitch
              atEnter={{ opacity: 0 }}
              atLeave={{ opacity: 1 }}
              atActive={{ opacity: 1 }}
              className="switch-wrapper">
              <Landing authed={authed} loading={loading} exact path="/" component={Login} />
              <Landing authed={authed} loading={loading} exact path="/account" component={Account} />
              <Protected authed={authed} loading={loading} exact path="/settings" component={Settings} />
              <Protected authed={authed} loading={loading} exact path="/dashboard" component={Dashboard} />
              <Route render={() => <div>Not Found</div>} />
            </AnimatedSwitch>
          )}/>
    </Router>
  )
}


export default Routes;

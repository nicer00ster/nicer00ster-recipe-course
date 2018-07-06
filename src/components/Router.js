import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import Dashboard from './Dashboard';
import Register from './Register';
import Login from './Login';
import Settings from './Settings';


// Dashboard, must be authenticated with Firebase to view.
// Otherwise, trying to direct to any other route will redirect you back at '/'
const Protected = ({
    component: Component,
    authed,
    ...rest
  }) => {
  return (
    <Switch>
      <Route { ...rest } render={props =>
        authed === true
        ? <Component { ...props } { ...rest } />
        : <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }}/>
      }/>
    </Switch>
  )
}

// Login/Register, if authenticated redirect to dashboard
const Landing = ({
    component: Component,
    authed,
    ...rest
  }) => {
  return (
    <Switch>
      <Route { ...rest } render={props =>
        authed === false
        ? <Component { ...props } { ...rest } />
        : <Redirect to='/dashboard' />
      }/>
    </Switch>
  )
}

// Router with protected route (dashboard)
const Routes = ({
  uid,
  authed,
  loading,
  error,
  errorMsg
}) => {
  return (
    <Router>
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 1 }}
        atActive={{ opacity: 1 }}>
        <Landing uid={uid} authed={authed} error={error} errorMsg={errorMsg} loading={loading} exact path="/" component={Login} />
        <Landing uid={uid} authed={authed} error={error} errorMsg={errorMsg} loading={loading} exact path="/register" component={Register} />
        <Protected uid={uid} authed={authed} error={error} errorMsg={errorMsg} loading={loading} exact path="/settings" component={Settings} />
        <Protected uid={uid} authed={authed} error={error} errorMsg={errorMsg} loading={loading} exact path="/dashboard" component={Dashboard} />
        <Route render={() => <div>Not Found</div>} />
      </AnimatedSwitch>
    </Router>
  )
}


export default Routes;

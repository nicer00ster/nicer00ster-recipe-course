import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Transition, TransitionGroup, CSSTransition } from "react-transition-group";
import { isAuthenticated } from '../base';
import Dashboard from './Dashboard';
import Account from './Account';
import Login from './Login';
import Settings from './Settings';


// Dashboard, must be authenticated with Firebase to view
const Protected = ({ component: Component, ...rest  }) => (
    <Route { ...rest } render={props => (
      isAuthenticated()
      ? (<Component { ...props } { ...rest }/>)
      : (<Redirect to={{
        pathname: '/dashboard',
        state: { from: props.location }
      }}/>
    )
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
                <CSSTransition key={location.key} unmountOnExit classNames="fade" timeout={300}>
                  <Switch location={location}>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/account" component={Account} />
                    <Route exact path="/settings" component={Settings} />
                    <Protected exact path="/dashboard" component={Dashboard} extra={location} />
                    <Route render={() => <div>Not Found</div>} />
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

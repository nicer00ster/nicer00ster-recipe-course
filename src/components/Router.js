import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
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
     ? <Component { ...props } { ...rest }/>
     : <Redirect to={{
       pathname: '/',
       state: { from: props.location }
     }}/>
  )} />
)

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

// const AnimationExample = () => (
//   <Router>
//     <Route
//       render={({ location }) => (
//         <div style={styles.fill}>
//           <Route
//             exact
//             path="/"
//             render={() => <Redirect to="/hsl/10/90/50" />}
//           />
//
//           <ul style={styles.nav}>
//             <NavLink to="/hsl/10/90/50">Red</NavLink>
//             <NavLink to="/hsl/120/100/40">Green</NavLink>
//             <NavLink to="/rgb/33/150/243">Blue</NavLink>
//             <NavLink to="/rgb/240/98/146">Pink</NavLink>
//           </ul>
//
//           <div style={styles.content}>
//             <TransitionGroup>
//               {/* no different than other usage of
//                 CSSTransition, just make sure to pass
//                 `location` to `Switch` so it can match
//                 the old location as it animates out
//             */}
//               <CSSTransition key={location.key} classNames="fade" timeout={300}>
//                 <Switch location={location}>
//                   <Route exact path="/hsl/:h/:s/:l" component={HSL} />
//                   <Route exact path="/rgb/:r/:g/:b" component={RGB} />
//                   {/* Without this `Route`, we would get errors during
//                     the initial transition from `/` to `/hsl/10/90/50`
//                 */}
//                   <Route render={() => <div>Not Found</div>} />
//                 </Switch>
//               </CSSTransition>
//             </TransitionGroup>
//           </div>
//         </div>
//       )}
//     />
//   </Router>
// );

export default Routes;

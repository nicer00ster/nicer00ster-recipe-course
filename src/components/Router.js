import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import App from './App';

const Routing = () => (
  <Router>
    <div>
      <ul className="navbar">
        <li className="navbar__item">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar__item">
          <Link to="/recipes">Recipes</Link>
        </li>
        <li className="navbar__item">
          <Link to="/logout">Sign Out</Link>
        </li>
      </ul>
      <hr/>
      <Route exact path="/" component={App} />
    </div>
  </Router>
)

export default Routing;

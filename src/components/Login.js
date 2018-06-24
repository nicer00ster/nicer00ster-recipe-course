import React from 'react';
import logo from '../logo.svg';

const Login = () =>
  <form className="landing__login">
    <div className="landing__login--title">
      REACT RECIPES!
    </div>
    <h4>Log in to get started</h4>
    <div className="landing__login--name">
      <input placeholder="Username" type="text" name="name" />
    </div>
    <div className="landing__login--password">
      <input placeholder="Password" type="password" name="password"/>
    </div>
    <input className="landing__login--submit" type="submit" value="Log In" />
    <div>
      <span className="landing__login--account">No account? Create one <a href="/create">here!</a></span>
    </div>
  </form>

  export default Login;

import React from 'react';
import { Link } from 'react-router-dom';

const Nav = props =>
  <div className="landing__dashboard--nav">
    <div className="landing__dashboard--nav_welcome">
      Welcome, {props.email}
    </div>
    <div className="landing__dashboard--nav_item">
      <Link to="/search">Find Recipe</Link>
    </div>
    <div className="landing__dashboard--nav_item">
      <Link to="/settings">Account</Link>
    </div>
    <div className="landing__dashboard--nav_item">
      <Link onClick={props.signOut} to="/">Log Out</Link>
    </div>
  </div>

export default Nav;

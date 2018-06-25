import React from 'react';
import { Link } from 'react-router-dom';
import search from '../icons/search.svg';
import settings from '../icons/settings.svg';
import signout from '../icons/signout.svg';

const Nav = props =>
  <div className="landing__dashboard--nav">
    <div className="landing__dashboard--nav_welcome">
      Welcome, {props.email}
    </div>
    <div className="landing__dashboard--nav_item">
      <Link to="/search"><img src={search} alt=""/><div>Search</div></Link>
    </div>
    <div className="landing__dashboard--nav_item">
      <Link to="/settings"><img src={settings} alt=""/><div>Settings</div></Link>
    </div>
    <div className="landing__dashboard--nav_item">
      <Link onClick={props.signOut} to="/"><img src={signout} alt=""/><div>Log Out</div></Link>
    </div>
  </div>

export default Nav;

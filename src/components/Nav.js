import React from 'react';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import search from '../icons/search.svg';
import settings from '../icons/settings.svg';
import signout from '../icons/signout.svg';

// Example of a presentational component. Notice how we aren't running any javascript prior
// to rendering the component.
const Nav = ({ displayName, onOpenModal, signOut }) => (
    <div>
      <div className="landing__dashboard--nav">
        <div className="landing__dashboard--nav_welcome">
          Welcome back, {displayName}
        </div>
        <div className="landing__dashboard--nav_item">
          <Link onClick={onOpenModal} to="/search"><img src={search} alt=""/><div>Search</div></Link>
        </div>
        <div className="landing__dashboard--nav_item">
          <Link to="/settings"><img src={settings} alt=""/><div>Settings</div></Link>
        </div>
        <div className="landing__dashboard--nav_item">
          <Link onClick={signOut} to="/"><img src={signout} alt=""/><div>Log Out</div></Link>
        </div>
      </div>
    </div>
);

export default Nav;

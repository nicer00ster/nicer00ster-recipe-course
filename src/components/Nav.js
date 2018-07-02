import React from 'react';
import { Link } from 'react-router-dom';
import { changeProfilePicture } from '../auth';
import search from '../svg/search.svg';
import settings from '../svg/settings.svg';
import signout from '../svg/signout.svg';

// Example of a presentational component. Notice how we aren't running any javascript prior
// to rendering the component.
const Nav = ({ displayName, onOpenModal, signOut, uid }) => (
    <div>
      <div className="navbar">
        <div className="navbar__profile">
          <div>
            {}
            <input className="user__image" onChange={(e) => changeProfilePicture(uid, e.target.files[0])} type="file"/>
            <div>
              {displayName}
            </div>
          </div>
        </div>
        <div className="navbar__item">
          <Link onClick={onOpenModal} to="/search"><img src={search} alt=""/>
            <div>Search</div>
          </Link>
        </div>
        <div className="navbar__item">
          <Link to="/settings"><img src={settings} alt=""/>
            <div>Settings</div>
          </Link>
        </div>
        <div className="navbar__item">
          <Link onClick={signOut} to="/"><img src={signout} alt=""/>
            <div>Log Out</div>
          </Link>
        </div>
      </div>
    </div>
);

export default Nav;

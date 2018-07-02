import React from 'react';
import { auth } from '../base';
import { Link } from 'react-router-dom';
import { changeProfilePicture } from '../auth';
import search from '../svg/search.svg';
import settings from '../svg/settings.svg';
import signout from '../svg/signout.svg';
import user from '../svg/user.svg';

// Example of a presentational component. Notice how we aren't running any javascript prior
// to rendering the component.
const Nav = ({ displayName, onOpenModal, signOut, uid }) => (
    <div>
      <div className="navbar">
        <div className="navbar__profile">
          <div>
            <label for="avatar">
              { auth.currentUser.photoURL === null
                ? <img className="user__image" src={user} alt="Placeholder avatar" />
                : <img className="user__image" src={auth.currentUser.photoURL} alt={`Picture of ${auth.currentUser.displayName}`}/>
              }
              <input
                onChange={(e) => changeProfilePicture(uid, e.target.files[0])}
                id="avatar"
                style={{visibility: 'hidden'}}
                type="file"
              />
              {displayName}
            </label>
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

import React from 'react';
import { Link } from 'react-router-dom';
import search from '../../svg/search.svg';
import settings from '../../svg/settings.svg';
import signout from '../../svg/signout.svg';
import PropTypes from 'prop-types';

const Nav = props =>  (
  <div className="navbar">
    <div className="navbar__avatar">
      <div>
        <label htmlFor="avatar">
          <h6 className="avatar__change">Change Avatar</h6>
          <img
            className="user__image"
            src={props.avatarURL}
            alt={`Avatar of ${props.displayName}`}/>
          <input
            onChange={props.handleAvatar}
            id="avatar"
            style={{ visibility: 'hidden' }}
            type="file"
          />
          <h6>{props.displayName}</h6>
        </label>
      </div>
    </div>
    <div onClick={props.onOpenModal} className="navbar__item">
      <img  src={search} alt=""/>
      <div>Search</div>
    </div>
    <div className="navbar__item">
      <Link to="/settings"><img src={settings} alt=""/>
        <div>Settings</div>
      </Link>
    </div>
    <div className="navbar__item">
      <Link onClick={props.signOut} to="/"><img src={signout} alt=""/>
        <div>Log Out</div>
      </Link>
    </div>
  </div>
);

Nav.propTypes = {
  avatarURL: PropTypes.string,
  displayName: PropTypes.string,
  handleAvatar: PropTypes.func,
  onOpenModal: PropTypes.func,
  signOut: PropTypes.func,
}

export default Nav;

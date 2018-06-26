import React from 'react';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import search from '../icons/search.svg';
import settings from '../icons/settings.svg';
import signout from '../icons/signout.svg';

class Nav extends React.Component {
  render() {
    const { email, onOpenModal, signOut } = this.props;
    return (
      <div>
        {this.props.loading && (
          <Loading />
        )}
        <div className="landing__dashboard--nav">
          <div className="landing__dashboard--nav_welcome">
            Welcome, {email}
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
    )
  }
}

export default Nav;

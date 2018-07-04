import React from 'react';
import { auth } from '../base';
import { Link } from 'react-router-dom';
import { changeProfilePicture } from '../auth';
import search from '../svg/search.svg';
import settings from '../svg/settings.svg';
import signout from '../svg/signout.svg';
import user from '../svg/user.svg';

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {
      file: '',
      avatar: null
    }
  }
  componentDidMount() {
    auth.currentUser.photoURL
    ? this.setState({ avatar: auth.currentUser.photoURL })
    : this.setState({ avatar: user })
  }
  handleChange = e => {
    let reader = new FileReader();
    let file = e.target.files[0];
    if(file) {
      reader.onloadend = () => {
        this.setState({
          file,
          avatar: reader.result
        })
      }
      reader.readAsDataURL(file);
      changeProfilePicture(auth.currentUser.uid, file);
    }
  }
  render() {
    const { avatar } = this.state;
    return (
      <div className="navbar">
        <div className="navbar__avatar">
          <div>
            <label htmlFor="avatar">
              <h6 className="avatar__change">Change Avatar</h6>
              <img
                className="user__image"
                src={avatar}
                alt={`Avatar of ${auth.currentUser.displayName}`}/>
              <input
                onChange={(e) => this.handleChange(e)}
                id="avatar"
                style={{ visibility: 'hidden' }}
                type="file"
              />
              <h6>{this.props.displayName}</h6>
            </label>
          </div>
        </div>
        <div className="navbar__item">
          <Link onClick={this.props.onOpenModal} to="/search"><img src={search} alt=""/>
            <div>Search</div>
          </Link>
        </div>
        <div className="navbar__item">
          <Link to="/settings"><img src={settings} alt=""/>
            <div>Settings</div>
          </Link>
        </div>
        <div className="navbar__item">
          <Link onClick={this.props.signOut} to="/"><img src={signout} alt=""/>
            <div>Log Out</div>
          </Link>
        </div>
      </div>
    )
  }
}

export default Nav;

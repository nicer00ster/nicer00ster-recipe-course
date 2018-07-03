import React from 'react';
import { auth } from '../base';
import { Link } from 'react-router-dom';
import { changeProfilePicture } from '../auth';
import search from '../svg/search.svg';
import settings from '../svg/settings.svg';
import signout from '../svg/signout.svg';
import user from '../svg/user.svg';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      render: null
    }
  }
  componentDidMount() {
    auth.currentUser.photoURL
    ? this.setState({ render: auth.currentUser.photoURL })
    : this.setState({ render: user })
  }
  handleChange(e) {
    const { uid } = this.props.uid;
    let reader = new FileReader();
    let file = e.target.files[0];
    if(file) {
      reader.onloadend = () => {
        this.setState({
          file,
          render: reader.result
        })
      }
      reader.readAsDataURL(file);
      changeProfilePicture(uid, file);
    }
  }
  render() {
    const { render } = this.state;
    return (
      <div>
        <div className="navbar">
          <div className="navbar__avatar">
            <div>
              <label htmlFor="avatar">
                <img
                  className="user__image"
                  src={render}
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
      </div>
    )
  }
}

export default Nav;

import React from 'react';
import { authenticate, saveUser } from '../auth';
import Form from './Form';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
    }
  }
  handleAccount(e) {
    e.preventDefault();
    const { username, email, password } = this.state;
    authenticate(email, password)
    .catch(err => {
      this.props.error(err.message);
    })
    .then(res => {
      if(res) {
        this.props.loading();
        saveUser(res.user, username)
      }
    })
  }
  handleUsername(e) {
    this.setState({
      username: e.target.value
    })
  }
  handleEmail(e) {
    this.setState({
      email: e.target.value
    })
  }
  handlePassword(e) {
    this.setState({
      password: e.target.value
    })
  }
  render() {
    return (
      <div>
        <Form
          title={'REACT RECIPES!'}
          subTitle={'Create an account'}
          className={'account'}
          onSubmit={(e) => this.handleAccount(e)}
          handleUsername={(e) => this.handleUsername(e)}
          handleEmail={(e) => this.handleEmail(e)}
          handlePassword={(e) => this.handlePassword(e)}
          message={`Already signed up?`}
          redirect={'/'}
          link={'Log in!'}
          button={'Create Account'}
          location={this.props.location}
        />
      </div>
    )
  }
}

export default Account;

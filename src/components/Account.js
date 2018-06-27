import React from 'react';
import { auth } from '../base';
import { authenticate, saveUser } from '../auth';
import { Link } from 'react-router-dom';
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
    this.props.loading();
    authenticate(email, password)
    .catch(err => {
      console.error(err);
    })
    .then(res => {
       saveUser(res.user, username);
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
    const { email, password } = this.state;
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

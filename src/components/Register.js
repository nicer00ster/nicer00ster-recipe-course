import React from 'react';
import PropTypes from 'prop-types';
import Form from './sfc/Form';
import { createAccount } from '../helpers';

class Register extends React.Component {
  static propTypes = {
    loading: PropTypes.func,
    location: PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
    }
  }
  handleUsername = e => this.setState({ username: e.target.value });
  handleEmail = e => this.setState({ email: e.target.value });
  handlePassword = e => this.setState({ password: e.target.value });

  render() {
    const { username, email ,password } = this.state;
    const { loading, location } = this.props;
    return (
      <div>
        <Form
          subTitle="Create an account"
          message="Already signed up?"
          redirect="/"
          link="Log in!"
          button="Create Account"
          onSubmit={(e) => createAccount(e, username, email, password, loading)}
          handleUsername={(e) => this.handleUsername(e)}
          handleEmail={(e) => this.handleEmail(e)}
          handlePassword={(e) => this.handlePassword(e)}
          location={location}
        />
      </div>
    )
  }
}

export default Register;

import React from 'react';
import { createAccount } from '../helpers';
import Form from './sfc/Form';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: ''
    }
  }
  handleUsername = e => {
    this.setState({
      username: e.target.value
    })
  }
  handleEmail = e => {
    this.setState({
      email: e.target.value
    })
  }
  handlePassword = e => {
    this.setState({
      password: e.target.value
    })
  }
  render() {
    const { username, email ,password } = this.state;
    const { loading } = this.props;
    return (
      <div>
        <Form
          title={'REACT RECIPES!'}
          subTitle={'Create an account'}
          className={'account'}
          onSubmit={(e) => createAccount(e, username, email, password, loading)}
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

export default Register;

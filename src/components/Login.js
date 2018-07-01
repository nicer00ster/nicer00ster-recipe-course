import React from 'react';
import Form from './Form';
import { notify } from 'react-notify-toast';
import { auth } from '../base';
import { login } from '../auth';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
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
  handleLogin(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const { loading } = this.props;
    loading();
    login(email, password)
    .catch(err => {
      this.props.error(err.message);
      return;
    })
    .then(() => {
      notify.show('Woo! 🍔😍', 'success', 3000);
      return loading();
    })
  }

  render() {
    return (
      <div>
        <Form
          title={'REACT RECIPES!'}
          subTitle={'Log in to get started'}
          className={'login'}
          onSubmit={(e) => this.handleLogin(e)}
          handleEmail={(e) => this.handleEmail(e)}
          handlePassword={(e) => this.handlePassword(e)}
          message={`No account? Create one`}
          redirect={'/account'}
          link={'here!'}
          button={'Log In'}
          location={this.props.location}
        />
      </div>
    )
  }
}

export default Login;

import React from 'react';
import { auth } from '../base';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import Form from './Form';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirected: false
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
    const { email, password } = this.state;
    this.props.loading();
    auth.signInWithEmailAndPassword(email, password)
    .catch(error => {
      if(error) {
        console.error(error);
      }
      return;
    })
    .then(res => {
      console.log(res);
      this.setState({
        redirected: true
      }, () => {
        this.props.loading() && this.props.history.push('/dashboard');
      });
    })
    e.preventDefault();
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

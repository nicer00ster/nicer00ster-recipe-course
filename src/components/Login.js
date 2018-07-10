import React from 'react';
import Form from './sfc/Form';
import { loggingIn } from '../helpers';
import PropTypes from 'prop-types';

class Login extends React.Component {
  static propTypes = {
    loading: PropTypes.func,
    error: PropTypes.func,
    location: PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }
  handleEmail = e => this.setState({ email: e.target.value });
  handlePassword = e =>this.setState({ password: e.target.value });

  render() {
    const { email, password } = this.state;
    const { loading, error, location } = this.props;
    return (
        <Form
          subTitle="Log in to get started"
          message="No account? Create one"
          redirect="/register"
          link="here!"
          button="Log In"
          onSubmit={(e) => loggingIn(e, email, password, loading, error)}
          handleEmail={(e) => this.handleEmail(e)}
          handlePassword={(e) => this.handlePassword(e)}
          location={location}
        />
    )
  }
}

export default Login;

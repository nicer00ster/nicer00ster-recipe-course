import React from 'react';
import firebase from 'firebase';
import { app, auth, isAuthenticated } from '../base';
import { Link, Redirect } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirected: false
    }
  }
  componentDidMount() {
    isAuthenticated()
    ? this.props.history.push('/dashboard')
    : console.log('not logged in');
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
    auth.signInWithEmailAndPassword(email, password)
      .catch((error) => {
      console.log(error);
      if(error) {
        return <Redirect push to="/login" />
      }
    }).then((res) => {
      console.log(res);
      this.setState({ redirected: true });
      if(res.user) {
         this.props.history.push('/dashboard');
      }
    })
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirected }  = this.state;
    if(redirected === true) {
      return <Redirect to='/dashboard' />
    }
    return (
      <div>
        <form onSubmit={(e) => this.handleLogin(e)} className="landing__login">
          <div className="landing__login--title">
            REACT RECIPES!
          </div>
          <h4>Log in to get started</h4>
          <div className="landing__login--name">
            <input onChange={(e) => this.handleEmail(e)} placeholder="Username" type="text" name="name" />
          </div>
          <div className="landing__login--password">
            <input onChange={(e) => this.handlePassword(e)} placeholder="Password" type="password" name="password"/>
          </div>
          <input className="landing__login--submit" type="submit" value="Log In" />
          <div>
            <span className="landing__login--account">No account? Create one <Link to="/account">here!</Link></span>
          </div>
        </form>
      </div>
    )
  }
}

export default Login;

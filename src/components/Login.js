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
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.history.push("/dashboard")
      }
    });
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
      .catch(error => {
      console.log(error);
      if(error) {
        console.error(error);
      }
    }).then(res => {
      console.log(res);
      this.setState({ redirected: true });
    })
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirected }  = this.state;
    return (
      <div>
        {redirected && (
          <Redirect to={from || '/dashboard'} />
        )}
        {/* {from && (
          <p>You must be logged in to view the page at {from.pathname}</p>
        )} */}
        <form onSubmit={(e) => this.handleLogin(e)} className="landing__login">
          <div className="landing__login--title">
            REACT RECIPES!
          </div>
          <h4>Log in to get started</h4>
          <div className="landing__login--name">
            <input onChange={(e) => this.handleEmail(e)} placeholder="Email" type="text" name="name" />
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

import React from 'react';
import firebase from 'firebase';
import { app, auth } from '../base';
import { Link, Redirect } from 'react-router-dom';

// Create account component
class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }
  handleAccount(e) {
    const { email, password } = this.state;
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .catch(error => {
        console.error(error);
    }).then(res => {
      console.log(res);
      this.props.history.push('/');
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
      <form onSubmit={(e) => this.handleAccount(e)} className="landing__account">
        <div className="landing__account--title">
          REACT RECIPES!
        </div>
        <h4>Create an account</h4>
        <div className="landing__account--name">
          <input onChange={(e) => this.handleEmail(e)} placeholder="Email" type="text" name="name" />
        </div>
        <div className="landing__account--password">
          <input onChange={(e) => this.handlePassword(e)} placeholder="Password" type="password" name="password"/>
        </div>
        <input className="landing__account--submit" type="submit" value="Create Account" />
        <div>
          <span className="landing__account--account">Already have an account? <Link to="/">Sign in!</Link></span>
        </div>
      </form>
    )
  }
}

export default Account;

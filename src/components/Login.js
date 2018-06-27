import React from 'react';
import { auth } from '../base';
import { Link, Redirect } from 'react-router-dom';
import Loading from './Loading';

class Login extends React.Component {
  constructor(props) {
    super(props);
    // this.renderCurrentState = this.renderCurrentState.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      email: '',
      password: '',
      loading: false,
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
  componentWillUnmount() {
    auth.onAuthStateChanged(user => {
      if(user) {
        console.log(`Redirecting ${user.email}`);
      }
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
  handleLogin(e) {
    const { email, password, loading } = this.state;
    this.setState({ loading: true })
    auth.signInWithEmailAndPassword(email, password)
    .catch(error => {
      console.log(error);
      if(error) {
        console.error(error);
      }
    })
    .then(res => {
      console.log(res);
      this.setState({
        redirected: true,
        loading: false
      }, () => {
        this.props.history.push('/dashboard');
      });
    })
    e.preventDefault();
  }

  render() {
    // const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirected, loading }  = this.state;
    // if(redirected) {
    //   return <Redirect to={from} />
    // }
    return (
      <div>
        {/* {redirected && (
          <Redirect to={from || '/dashboard'} />
        )} */}
        {loading && (
          <Loading />
        )}
        <div>
          <form onSubmit={this.handleLogin} className="landing__login">
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
      </div>
    )
    // return (
    //   <div>
    //     {redirected && (
    //       <Redirect to={from || '/dashboard'} />
    //     )}
    //     <form onSubmit={(e) => this.handleLogin(e)} className="landing__login">
    //       <div className="landing__login--title">
    //         REACT RECIPES!
    //       </div>
    //       <h4>Log in to get started</h4>
    //       <div className="landing__login--name">
    //         <input onChange={(e) => this.handleEmail(e)} placeholder="Email" type="text" name="name" />
    //       </div>
    //       <div className="landing__login--password">
    //         <input onChange={(e) => this.handlePassword(e)} placeholder="Password" type="password" name="password"/>
    //       </div>
    //       <input className="landing__login--submit" type="submit" value="Log In" />
    //       <div>
    //         <span className="landing__login--account">No account? Create one <Link to="/account">here!</Link></span>
    //       </div>
    //     </form>
    //   </div>
    // )
  }
}

export default Login;

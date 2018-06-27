import React from 'react';
import { auth } from '../base';
import { Link } from 'react-router-dom';
import Form from './Form';

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
      <div>
        <Form
          title={'REACT RECIPES!'}
          subTitle={'Create an account'}
          className={'account'}
          onSubmit={(e) => this.handleAccount(e)}
          handleEmail={(e) => this.handleEmail(e)}
          handlePassword={(e) => this.handlePassword(e)}
          message={`Already signed up?`}
          redirect={'/'}
          link={'Log in!'}
          button={'Create Account'}
        />
      </div>
    )
  }
}

export default Account;

import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Notifications, { notify } from 'react-notify-toast';
import Routes from './Router';
import Loading from './sfc/Loading';
import { auth } from '../base';
import { particleParams } from '../particles';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      authed: false,
      loading: true,
      hasError: false,
      errorMsg: null
    }
  }
  componentDidMount() {
    this.removeListener = auth.onAuthStateChanged(user => {
      if(user) {
        this.setState({
          authed: true,
          loading: false,
          uid: user.uid
        })
      } else {
        this.setState({
          authed: false,
          loading: false,
          uid: null
        })
      }
      return;
    })
  }
  componentWillUnmount() {
    this.removeListener();
  }
  handleLoad = () => {
    this.setState({
      loading: !this.state.loading
    });
  }
  handleError = (errorMsg) => {
    this.setState({
      hasError: !this.state.hasError,
      errorMsg: errorMsg
    })
    setTimeout(() => {
      this.setState({
        hasError: false,
        errorMsg: null
      })
    }, 2500)
  }
  render() {
    const {
      uid,
      authed,
      loading,
      hasError,
      errorMsg
    } = this.state;
    return (
        <div id="particles">
          <Particles
            params={particleParams} />
          <div className="landing">
            { loading
              ? <Loading />
              : null }
            { hasError
              ? notify.show(`Oh no! 😱 ${errorMsg}`, 'error', 3500)
              : null }
              <Notifications options={{ zIndex: 9999, fontSize: '32px' }}/>
              <Routes
                uid={uid}
                authed={authed}
                loading={this.handleLoad}
                error={this.handleError}
                errorMsg={errorMsg} />
          </div>
        </div>
    );
  }
}

export default App;

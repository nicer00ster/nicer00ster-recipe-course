import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Routes from './Router';
import Loading from './Loading';
import Error from './Error';
import { auth, localKey } from '../base';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLoad = this.handleLoad.bind(this);
    this.handleError = this.handleError.bind(this);
    this.state = {
      uid: null,
      authed: false,
      loading: false,
      hasError: false,
      errorMsg: null
    }
  }
  componentDidMount() {
    this.removeListener = auth.onAuthStateChanged(user => {
      if(user) {
        window.localStorage.setItem(localKey, user.uid);
        this.setState({
          authed: true,
          loading: false,
          uid: user.uid
        })
      } else {
        window.localStorage.removeItem(localKey);
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
  handleLoad() {
    this.setState({
      loading: !this.state.loading
    });
  }
  handleError(errorMsg) {
    this.setState({
      hasError: !this.state.hasError,
      errorMsg: errorMsg
    })
    setTimeout(() => {
      this.setState({
        hasError: !this.state.hasError,
        errorMsg: null
      })
    }, 5000)
  }
  render() {
    const { authed, loading, hasError, errorMsg } = this.state
    return (
        <div id="particles">
          <Particles
            params={{
                "particles": {
                  "number": {
                    "value": 100,
                    "density": {
                      "enable": true,
                      "value_area": 800
                    }
                  },
                  "color": {
                    "value": "#fff"
                  },
                  "shape": {
                    "type": "triangle",
                    "stroke": {
                      "width": 0,
                      "color": "#000000"
                    },
                    "polygon": {
                      "nb_sides": 3
                    },
                  },
                  "opacity": {
                    "value": 0.5,
                    "random": true,
                  },
                  "size": {
                    "value": 10,
                    "random": true,
                    "anim": {
                      "enable": true,
                      "speed": 4,
                      "size_min": 0.1,
                      "sync": false
                    }
                  },
                  "line_linked": {
                    "enable": false,
                    "distance": 500,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 2
                  },
                  "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                  }
                },
            }}
          />
          <div className="landing">
            { loading
              ? <Loading />
              : null }
            { hasError
              ? <Error
                errorMsg={errorMsg}
                handleError={this.handleError}
                hasError={hasError}/>
              : null }
              <Routes
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

import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Routes from './Router';
import { app, auth, localKey } from '../base';

class App extends Component {
  state = {
    uid: null,
  }
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if(user) {
        window.localStorage.setItem(localKey, user.uid);
        this.setState({ uid: user.uid });
      } else {
        window.localStorage.removeItem(localKey);
        this.setState({ uid: null });
      }
    })
  }
  render() {
    return (
      <div>
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
            <Routes />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

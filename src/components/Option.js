import React from 'react';
import { auth, database } from '../base';
import PropTypes from 'prop-types';

class Option extends React.Component {
  static PropTypes = {
    label: PropTypes.string,
    toggleCheckbox: PropTypes.func
  }
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    }
  }
  componentDidMount() {
    const { label, toggleCheckbox } = this.props;
    const ref = database.ref(`users/${auth.currentUser.uid}/account/settings`);
    ref.on('value', snap => {
      if(snap.val() !== null) {
        snap.val().forEach(val => {
          console.log(val);
          if(val === label) {
            toggleCheckbox(label);
            this.setState({ checked: true })
          }
        })
      }
    })
  }
  toggleChange = () => {
    const { checked } = this.state;
    const { label, toggleCheckbox } = this.props;
    this.setState({ checked: !checked });
    toggleCheckbox(label);
  }
  render() {
    const { label } = this.props;
    const { checked } = this.state;
    return (
      <div className="checkbox">
        <label>
          <input
            type="checkbox"
            value={label}
            checked={checked}
            onChange={this.toggleChange}
          />
          {this.props.label}
        </label>
      </div>
    )
  }
}

export default Option;

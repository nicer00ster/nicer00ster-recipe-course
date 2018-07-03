import React from 'react';
import { auth, database } from '../base';


class Option extends React.Component {
  state = {
    checked: false
  }
  componentDidMount() {
    const { label, toggleCheckbox } = this.props;
    const ref = database.ref(`users/${auth.currentUser.uid}/account/settings`);
    ref.on('value', snap => {
      if(snap.val() !== null) {
        snap.val().map(val => {
          if(val === label) {
            this.setState({ checked: true });
            toggleCheckbox(label);
          }
        })
      }
    })
  }
  toggleChange = () => {
    this.setState({
      checked: !this.state.checked
    })
    this.props.toggleCheckbox(this.props.label)
  }
  render() {
    const { label } = this.props;
    const { checked } = this.state;
    return (
      <div className="checkbox">
        <label>
          <input type="checkbox"
            type="checkbox"
            value={label}
            checked={checked}
            onChange={this.toggleChange}
          />
          <span>{label}</span>
        </label>
      </div>
    )
  }
}

export default Option;

import React from 'react';
import Option from './Option';
import { Link } from 'react-router-dom';
import { updateSettings } from '../auth';
import { auth, database } from '../base';

const filters = [
  'Vegetarian',
  'Vegan',
  'Alcohol-Free',
  'Peanut-Free',
  'Sugar-Conscious'
];

class Settings extends React.Component {
  componentDidMount() {
    const ref = database.ref().child(`users/${auth.currentUser.uid}/account/settings`);
    ref.on('value', snap => {
      snap.val().map(val => {
        console.log(val);
        console.log(filters.indexOf(val) > -1);
        if(filters.indexOf(val) > -1) {
          this.toggleCheckbox;
        }
      })
    })
  }
  componentWillMount() {
    this.selected = new Set();
  }

  toggleCheckbox = label => {
    if(this.selected.has(label)) {
      this.selected.delete(label);
    } else {
      this.selected.add(label);
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    let settings = [];
    for(const option of this.selected) {
      settings.push(option);
    }
    return updateSettings(auth.currentUser.uid, settings);
  }

// Functions createOption and createOptions are presentational functions so we use parenthesis instead of brackets.
  createOption = (label, checked) => (
    <Option
      filters={filters}
      label={label}
      toggleCheckbox={this.toggleCheckbox}
      key={label}
    />
  )

  createOptions = () => (
    filters.map(this.createOption)
  )

  render() {
    return (
      <div className="settings">
        <form onSubmit={this.handleSubmit}>
          {this.createOptions()}
          <button type="submit">Save</button>
          <Link to="/dashboard"><button>Dashboard ➠</button></Link>
        </form>
      </div>
    )
  }
}

export default Settings;

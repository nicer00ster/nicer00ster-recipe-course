import React from 'react';
import Option from './Option';
import { Link, Redirect } from 'react-router-dom';
import { updateSettings } from '../auth';
import { auth, database } from '../base';


class Settings extends React.Component {
  state = {
    filters: [
      'Vegetarian',
      'Vegan',
      'Alcohol-Free',
      'Peanut-Free',
      'Sugar-Conscious'
    ]
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
    updateSettings(auth.currentUser.uid, settings);
    return <Redirect to="/dashboard" />
  }

// Functions createOption and createOptions are presentational functions so we use parenthesis instead of brackets.
  createOption = label => (
    <Option
      label={label}
      toggleCheckbox={this.toggleCheckbox}
      key={label}
      filters={this.state.filters}
    />
  )

  createOptions = () => (
    this.state.filters.map(this.createOption)
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

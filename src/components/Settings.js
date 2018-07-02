import React from 'react';
import Option from './Option';
import { Link } from 'react-router-dom';
import { updateSettings } from '../auth';
import { auth } from '../base';

const filters = [
  'Balanced',
  'High-Protein',
  'Alcohol-Free',
  'Low-Fat',
  'Low-Carb',
  'Vegetarian',
  'Vegan',
  'Peanut-Free',
  'Tree-Nut-Free',
  'Sugar-Conscious'
];

class Settings extends React.Component {
  // componentDidMount() {
  //
  // }
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
  createOption = label => (
    <Option
      label={label}
      handleChange={this.toggleCheckbox}
      key={label} />
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

import React from 'react';
import Option from './Option';
import { Link } from 'react-router-dom';
import { updateSettings } from '../auth';
import { auth } from '../base';

const filters = [
  'Vegan',
  'Vegetarian',
  'Alcohol-Free',
  'Gluten-Free',
  'Wheat-Free',
  'Dairy Free',
  'Egg-Free',
  'Tree-Nut-Free',
  'Fish-Free',
  'Kosher',
  'Low-Sugar',
  'Paleo'
];

class Settings extends React.Component {
  componentDidMount() {

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

  handleSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    const settings = [];
    for(const option of this.selected) {
      return settings.push(option);
    }

    updateSettings(auth.currentUser.uid, settings);
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

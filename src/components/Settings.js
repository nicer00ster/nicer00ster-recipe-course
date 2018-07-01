import React from 'react';
import Option from './Option';
import { Link } from 'react-router-dom';

const filters = [
  'Vegan Only',
  'Vegetarian',
  'Alcohol Free',
  'Gluten Free',
  'Wheat Free',
  'Dairy Free',
  'Egg Free',
  'Nut Free',
  'Fish Free',
  'Kosher',
  'No Sugar',
  'Paleo'
];

class Settings extends React.Component {
  componentWillMount = () => {
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

    for(const checkbox of this.selected) {
      console.log(checkbox, 'is selected.');
    }
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

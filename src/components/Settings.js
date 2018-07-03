import React from 'react';
import Option from './Option';
import { Link } from 'react-router-dom';
import { auth } from '../base';
import { updateSettings } from '../auth';

class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      filters: [
        'Vegetarian',
        'Vegan',
        'Alcohol-Free',
        'Peanut-Free',
        'Sugar-Conscious'
      ]
    }
  }
  componentWillMount = () => {
    this.selected = new Set();
  }
  handleSubmit = e => {
     e.preventDefault();
     let settings = [];
     for(const option of this.selected) {
       console.log(option);
       settings.push(option);
     }
     updateSettings(auth.currentUser.uid, settings);
   }
   toggleCheckbox = label => {
     if(this.selected.has(label)) {
       this.selected.delete(label);
     } else {
       this.selected.add(label);
     }
   }
   createOption = label => (
     <Option
       label={label}
       key={label}
       toggleCheckbox={this.toggleCheckbox}
     />
   )
   createOptions = () => (
     this.state.filters.map(this.createOption)
   )
  render() {
    return (
      <div className="settings">
        <h2>Filters</h2>
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

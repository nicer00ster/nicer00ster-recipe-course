import React from 'react';
import Option from './Option';
<<<<<<< HEAD
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
     updateSettings(auth.currentUser.uid, settings)
     .then(() => {
       return this.props.history.goBack();
     })
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
=======
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

>>>>>>> 21daff4120204dd82698ebae6520dabf50c85daf
  render() {
    return (
      <div className="settings">
        <h2>Filters</h2>
        <form onSubmit={this.handleSubmit}>
          {this.createOptions()}
          <button type="submit">Save ➠</button>
        </form>
      </div>
    )
  }
}

export default Settings;

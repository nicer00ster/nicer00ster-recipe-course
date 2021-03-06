import React from 'react';
import PropTypes from 'prop-types';
import Option from './Option';
import { auth } from '../base';
import { updateSettings } from '../auth';

class Settings extends React.Component {
  static propTypes = {
    goBack: PropTypes.func
  }
  constructor(props) {
    super(props);
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
  componentWillMount() {
    this.selected = new Set();
  }
  handleSubmit = e => {
     e.preventDefault();
     let settings = [];
     for(const option of this.selected) {
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

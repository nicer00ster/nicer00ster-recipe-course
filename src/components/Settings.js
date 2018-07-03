import React from 'react';
import Option from './Option';
import { Link } from 'react-router-dom';
import { updateSettings } from '../auth';
import { auth } from '../base';

// Filter options for searching
const filters = [
  'Vegetarian',
  'Vegan',
  'Alcohol-Free',
  'Peanut-Free',
  'Sugar-Conscious'
];

const Settings = () => {
  this.selected = new Set();

  const toggleCheckbox = label => {
    if(this.selected.has(label)) {
      this.selected.delete(label);
    } else {
      this.selected.add(label);
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    let settings = [];
    for(const option of this.selected) {
      settings.push(option);
    }
    updateSettings(auth.currentUser.uid, settings);
  }

// Functions createOption and createOptions are presentational functions so we use parenthesis instead of brackets.
  const createOption = label => (
    <Option
      label={label}
      toggleCheckbox={toggleCheckbox}
      key={label}
      filters={filters}
    />
  )

  const createOptions = () => (
    filters.map(createOption)
  )

  return (
    <div className="settings">
      <h2>Filters</h2>
      <form onSubmit={handleSubmit}>
        {createOptions()}
        <button type="submit">Save</button>
        <Link to="/dashboard"><button>Dashboard ➠</button></Link>
      </form>
    </div>
  )
}

// class Settings extends React.Component {
//   state = {
//     filters: [
//       'Vegetarian',
//       'Vegan',
//       'Alcohol-Free',
//       'Peanut-Free',
//       'Sugar-Conscious'
//     ]
//   }
//   componentWillMount() {
//     this.selected = new Set();
//   }
//
//   toggleCheckbox = label => {
//     if(this.selected.has(label)) {
//       this.selected.delete(label);
//     } else {
//       this.selected.add(label);
//     }
//   }
//
//   handleSubmit = e => {
//     e.preventDefault();
//     let settings = [];
//     for(const option of this.selected) {
//       settings.push(option);
//     }
//     updateSettings(auth.currentUser.uid, settings);
//   }
//
// // Functions createOption and createOptions are presentational functions so we use parenthesis instead of brackets.
//   createOption = label => (
//     <Option
//       label={label}
//       toggleCheckbox={this.toggleCheckbox}
//       key={label}
//       filters={this.state.filters}
//     />
//   )
//
//   createOptions = () => (
//     this.state.filters.map(this.createOption)
//   )
//
//   render() {
//     return (
//       <div className="settings">
//         <h2>Filters</h2>
//         <form onSubmit={this.handleSubmit}>
//           {this.createOptions()}
//           <button type="submit">Save</button>
//           <Link to="/dashboard"><button>Dashboard ➠</button></Link>
//         </form>
//       </div>
//     )
//   }
// }

export default Settings;

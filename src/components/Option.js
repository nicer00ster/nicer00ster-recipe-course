import React from 'react';
import { auth, database } from '../base';


class Option extends React.Component {
<<<<<<< HEAD
  constructor() {
    super();
    this.state = {
      checked: false
    }
  }
  componentDidMount() {
    const { label, selected, toggleCheckbox } = this.props;
=======
  state = {
    checked: false
  }
  componentDidMount() {
>>>>>>> 21daff4120204dd82698ebae6520dabf50c85daf
    const ref = database.ref(`users/${auth.currentUser.uid}/account/settings`);
    ref.on('value', snap => {
      if(snap.val() !== null) {
        snap.val().map(val => {
<<<<<<< HEAD
          if(val === label) {
            toggleCheckbox(label);
            this.setState({ checked: true })
=======
          if(val === this.props.label) {
            this.setState({ checked: true })
            this.props.toggleCheckbox(this.props.label)
>>>>>>> 21daff4120204dd82698ebae6520dabf50c85daf
          }
        })
      }
    })
  }
  toggleChange = () => {
<<<<<<< HEAD
    const { checked } = this.state;
    const { label, toggleCheckbox } = this.props;
    this.setState({
      checked: !checked
    })
    toggleCheckbox(label);
  }
  render() {
    const { label } = this.props;
    const { checked } = this.state;
=======
    this.setState({
      checked: !this.state.checked
    })
    this.props.toggleCheckbox(this.props.label)
  }
  render() {
>>>>>>> 21daff4120204dd82698ebae6520dabf50c85daf
    return (
      <div className="checkbox">
        <label>
          <input type="checkbox"
            type="checkbox"
<<<<<<< HEAD
            value={label}
            checked={checked}
            onChange={this.toggleChange}
          />
          <span>{label}</span>
=======
            value={this.props.label}
            checked={this.state.checked}
            onChange={this.toggleChange}
          />
          {this.props.label}
>>>>>>> 21daff4120204dd82698ebae6520dabf50c85daf
        </label>
      </div>
    )
  }
}

// class Option extends React.Component {
//   state = {
//     isChecked: this.props.checked
//   }
//   componentDidMount() {
//     const ref = database.ref().child(`users/${auth.currentUser.uid}/account/settings`);
//     ref.on('value', snap => {
//       snap.val().map(val => {
//         if(this.props.filters.indexOf(val) > -1) {
//           this.toggleChange;
//         }
//       })
//     })
//   }
//   toggleChange = () => {
//      const { toggleCheckbox, label } = this.props;
//
//      this.setState(({ isChecked }) => (
//        {
//          isChecked: !isChecked,
//        }
//      ));
//
//      toggleCheckbox(label);
//    }
//
//   render() {
//     const { label } = this.props;
//     const { isChecked } = this.state;
//
//     return (
//       <div className="checkbox">
//         <label>
//           <input type="checkbox"
//             type="checkbox"
//             value={label}
//             checked={isChecked}
//             onChange={this.toggleChange}
//           />
//           {label}
//         </label>
//       </div>
//     )
//   }
// }
//
export default Option;

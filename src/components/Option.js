import React from 'react';
import { auth, database } from '../base';


class Option extends React.Component {
  state = {
    checked: false
  }
  componentDidMount() {
    const ref = database.ref(`users/${auth.currentUser.uid}/account/settings`);
    ref.on('value', snap => {
      if(snap.val() !== null) {
        snap.val().map(val => {
          if(val === this.props.label) {
            this.setState({ checked: true })
            this.props.toggleCheckbox(this.props.label)
          }
        })
      }
    })
  }
  toggleChange = () => {
    this.setState({
      checked: !this.state.checked
    })
    this.props.toggleCheckbox(this.props.label)
  }
  render() {
    return (
      <div className="checkbox">
        <label>
          <input type="checkbox"
            type="checkbox"
            value={this.props.label}
            checked={this.state.checked}
            onChange={this.toggleChange}
          />
          {this.props.label}
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

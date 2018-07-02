import React from 'react';

class Option extends React.Component {
  state = {
    isChecked: false
  }

  toggleChange = () => {
     const { handleChange, label } = this.props;

     this.setState(({ isChecked }) => (
       {
         isChecked: !isChecked,
       }
     ));

     handleChange(label);
   }

  render() {
    const { label } = this.props;
    const { isChecked } = this.state;

    return (
      <div className="checkbox">
        <label>
          <input type="checkbox"
            type="checkbox"
            value={label}
            checked={isChecked}
            onChange={this.toggleChange}
          />
          {label}
        </label>
      </div>
    )
  }
}

export default Option;
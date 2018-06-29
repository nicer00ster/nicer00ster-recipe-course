import React from 'react';
import Single from './Single';

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      single: false
    }
  }
  handleView() {
    this.setState({ single: !this.state.single });
  }
  render() {
    return (
      <div>
        { this.state.single === true
         ? <Single
             label={this.props.label}
             image={this.props.image}
             url={this.props.url}
             source={this.props.source}
           />
         : null
        }
        <li className="recipe" onClick={() => this.handleView()}>
          <h4 className="recipe__label">{this.props.label}</h4>
          <img className="recipe__image" src={this.props.image} alt={this.props.label}/>
          <h6 className="recipe__source">{this.props.source}</h6>
        </li>
      </div>
    )
  }
}

export default Recipe;

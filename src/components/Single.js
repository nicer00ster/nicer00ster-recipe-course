import React from 'react';
import Modal from 'react-responsive-modal';

class Single extends React.Component {
  constructor(props) {
    super(props);
    this.handleModal = this.handleModal.bind(this);
    this.state = {
      openModal: false
    }
  }
  componentDidMount() {
    this.setState({ openModal: true })
  }
  handleModal() {
    this.setState({
      openModal: !this.state.openModal
    })
  }
  render() {
    return (
      <div>
         <Modal
          open={this.state.openModal}
          onClose={this.handleModal}
          closeIconSvgPath={''}
          closeIconSize={48}
          classNames={{
            overlay: 'recipe__single-overlay',
            modal: 'recipe__single-modal',
            closeButton: 'recipe__single-close',
            closeIcon: 'recipe__single-icon',
          }}>
          {/* // closeOnOverlayClick={false}> */}
          <div className="recipe__single">
            <img className="recipe__single-image" src={this.props.image} alt={this.props.label} />
            <h4 className="recipe__single-label">{this.props.label}</h4>
            <h6 className="recipe__single-source">{this.props.source}</h6>
          </div>
        </Modal>
      </div>
    )
  }
}

export default Single;

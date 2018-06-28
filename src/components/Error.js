import React from 'react';
import Modal from 'react-responsive-modal';

class Error extends React.Component {
  constructor(props) {
    super(props);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.state = {
      isOpen: false
    }
  }
  componentDidMount() {
    this.setState({ isOpen: true })
  }
  onCloseModal() {
    this.setState({ isOpen: false })
  }
  render() {
    return (
      <div>
         <Modal
          open={this.state.isOpen}
          onClose={this.props.handleError}
          closeIconSvgPath={''}
          closeIconSize={48}
          classNames={{
            overlay: 'error__overlay',
            modal: 'error__modal',
            closeButton: 'error__close',
            closeIcon: 'error__icon'
          }}>
          <div>
            <h2>Oh no! <span role="img" aria-label="Oh no!">😱</span></h2>
            <div>
              {this.props.errorMsg}
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default Error;

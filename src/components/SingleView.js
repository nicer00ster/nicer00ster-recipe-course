import React from 'react';
import Modal from 'react-responsive-modal';

class SingleView extends React.Component {
  constructor() {
    super();
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
          closeIconSvgPath={''}>
          {/* // closeOnOverlayClick={false}> */}
          <div className="recipe__single">
            <h2>Oh no! <span role="img" aria-label="Oh no!">😱</span></h2>
            <div className="recipe__data">
              {/* {data} */}
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default SingleView;

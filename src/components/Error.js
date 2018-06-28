import React from 'react';
import Modal from 'react-responsive-modal';

const Error = ({ hasError, handleError, errorMsg }) => {
  return (
    <div>
       <Modal
        open={hasError}
        onClose={handleError}
        closeIconSvgPath={''}
        closeOnOverlayClick={false}
        classNames={{
          overlay: 'error__overlay',
          modal: 'error__modal',
          closeButton: 'error__close',
          closeIcon: 'error__icon',
        }}>
        <div className="error__container">
          <h2>Oh no! <span role="img" aria-label="Oh no!">😱</span></h2>
          <div className="error__message">
            {errorMsg}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Error;

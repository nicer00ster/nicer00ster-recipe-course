import React from 'react';
import Modal from 'react-responsive-modal';
import Nav from './Nav';
import { auth } from '../base';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.state = {
      email: '',
      search: '',
      modalOpen: false,
    }
  }
  componentDidMount() {
    this.handleUser();
  }
  handleUser() {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged(user => {
        if(user) {
          console.log(user);
          this.setState({ email: user.email })
        } else {
          console.error('No user logged in.');
        }
      })
    })
  }
  signOut() {
    auth.signOut()
    .then(() => {
      console.log('signed out!');
    })
  }
  onOpenModal(e) {
    e.preventDefault();
    this.setState({ openModal: true })
  }
  onCloseModal() {
    this.setState({ openModal: false })
  }
  render() {
    const { openModal } = this.state;
    return (
      <div className="landing__dashboard">
        <Nav
          signOut={this.signOut}
          onOpenModal={this.onOpenModal}
          email={this.state.email}
        />
        {/* Recipes */}
        <Modal
          open={openModal}
          onClose={this.onCloseModal}
          center
          classNames={{
            overlay: 'dash__overlay',
            modal: 'dash__modal',
            closeButton: 'dash__close',
            closeIcon: ''
          }}>
          <h2>Search for a recipe!</h2>
          <hr/>
        </Modal>
      </div>
    )
  }
}

export default Dashboard;

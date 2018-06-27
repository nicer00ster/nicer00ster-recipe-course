import React from 'react';
import Modal from 'react-responsive-modal';
import Loading from './Loading';
import Nav from './Nav';
import Container from './Container';
import { APP_ID, APP_KEY } from '../private.js';
import { auth } from '../base';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.searchRef = React.createRef();
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleUser = this.handleUser.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.signOut = this.signOut.bind(this);
    this.state = {
      email: '',
      search: '',
      loading: false,
      searchResults: null,
      modalOpen: false,
    }
  }
  componentDidMount() {
    this.handleUser();
  }
  componentWillUnmount() {
    this.handleUser = undefined;
  }
  handleUser() {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged(user => {
        if(user) {
          console.log(user);
          this.setState({ email: user.email, loading: false })
        } else {
          this.setState({ loading: false })
          console.error('No user logged in.');
        }
      })
    })
  }
  handleSearch(e) {
    // Prevent whitespace in search bar
    let search = e.target.value.trim();
    this.setState({ search })
  }
  onSearchSubmit(e) {
    // 1. Prevent page from reloading
    e.preventDefault();
    // 2. Render loading indicator
    this.setState({ loading: true });
    // 3. Fetch the results of the search
    fetch(`https://api.edamam.com/search?q=${this.state.search}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=10`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      if(data['count'] === 0 ) {
        this.setState({
          noResults: true,
          loading: false
        });
      } else {
        this.setState({
          searchResults: data['hits'],
          loading: false
        });
      }
    }, err => {
      console.error(err);
    })
    .then(() => {
      this.searchRef.reset();
      this.setState({ search: '' })
    })
  }
  onOpenModal(e) {
    e.preventDefault();
    this.setState({ modalOpen: true })
  }
  onCloseModal() {
    this.setState({
      modalOpen: false,
      loading: false,
      searchResults: ''
    })
  }
  signOut() {
    auth.signOut();
  }
  render() {
    const { email, loading, modalOpen, noResults, searchResults } = this.state;
    // Render the container of modal depending on what happens after submitting a search
    let searchContainer;
    if(loading) {
      searchContainer = (<Loading />);
    } else if(noResults) {
      searchContainer = (<div className="landing__dashboard--error">No results found for your search.</div>)
    } else if(searchResults) {
      searchContainer = (<Container recipes={searchResults} />)
    }
    return (
      <div className="landing__dashboard">
        <Nav
          signOut={this.signOut}
          onOpenModal={this.onOpenModal}
          email={email}
          loading={loading}
        />
        {/* Recipes */}
        <Modal
          open={modalOpen}
          onClose={this.onCloseModal}
          closeIconSvgPath={''}
          closeIconSize={48}
          center
          classNames={{
            overlay: 'dash__overlay',
            modal: 'dash__modal',
            closeButton: 'dash__close',
            closeIcon: 'dash__icon'
          }}>
          <h1>Search for a recipe!</h1>
          <form ref={el => this.searchRef = el} onSubmit={(e) => this.onSearchSubmit(e)}>
            <input onChange={(e) => this.handleSearch(e)} type="search" placeholder="Search"/>
          </form>
          {searchContainer}
        </Modal>
      </div>
    )
  }
}

export default Dashboard;

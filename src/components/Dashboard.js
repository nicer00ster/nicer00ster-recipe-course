import React from 'react';
import Modal from 'react-responsive-modal';
import Nav from './Nav';
import Container from './sfc/Container';
import search from '../svg/search.svg';
import { APP_ID, APP_KEY } from '../private.js';
import { auth, database, storage } from '../base';
import { logout } from '../auth';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.searchRef = React.createRef();
    this.state = {
      email: '',
      search: '',
      settings: '',
      displayName: '',
      uid: null,
      searchResults: null,
      noResults: false,
      modalOpen: false,
      bookmarks: null
    }
  }

  componentDidMount() {
    // Fetching our users data & saved bookmarks
    const user = auth.currentUser;
    const ref = database.ref(`/users/${user.uid}/account/`);
    ref.once('value')
    .then(snap => {
      console.log(snap.val());
      this.setState({
        uid: user.uid,
        displayName: snap.val().displayName,
        settings: snap.val().settings
      })
    })
    // Fetching the keys for each bookmark to display on dashboard
    const keyRef = database.ref(`/users/${user.uid}/account/recipes`)
    keyRef.on('value', (snap) => {
      let bookmarkArray = [];
      snap.forEach(child => {
        const item = child.val();
        item.key = child.key;
        bookmarkArray.push(item);
      })
      console.log(bookmarkArray);
      this.setState({
        bookmarks: bookmarkArray
      })
    })
    console.log(user);
  }
  handleSearch = e => {
    // Prevent whitespace in search bar
    let search = e.target.value.trim();
    this.setState({ search })
  }
  onSearchSubmit = e => {
    const { search, settings } = this.state;
    const { loading } = this.props;
    // 1. Prevent page from reloading
    e.preventDefault();
    // 2. Render loading indicator
    loading()
    // 3. Fetch the results of the search

    // Convert our array of settings to an object so we can use them
    // in our parameters in our query.
    const obj = Object.assign({}, settings);

    // If settings exists, loop over them, join each index of the array together
    // as a string with &health= and return the string in lowercase.
    const params = obj !== null ? Object.keys(obj).map(key => 'health=' + obj[key]).join('&').toLowerCase() : null;

    fetch(`https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=25&${params}`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      if(data['count'] === 0 ) {
        this.setState({
          noResults: true,
        });
        loading();
      } else {
        this.setState({
          noResults: false,
          searchResults: data['hits']
        });
        loading();
      }
    })
    .then(() => {
      this.searchRef.reset();
      this.setState({ search: '' })
    })
  }

  onOpenModal = e => {
    e.preventDefault();
    this.setState({ modalOpen: true })
  }
  onCloseModal = () => {
    this.setState({
      modalOpen: false,
      noResults: false,
      searchResults: ''
    })
  }
  onSignOut = () => {
    this.props.loading()
    setTimeout(() => {
      this.props.loading()
      logout();
    }, 1500);
  }
  render() {
    const {
      modalOpen,
      noResults,
      searchResults,
      displayName,
      uid,
      bookmarks
    } = this.state;
    // Render the container of modal depending on what happens after submitting a search
    let searchContainer;
    if(noResults) {
      searchContainer = (<div className="dashboard--error">No results found for your search.</div>)
    } else if(searchResults) {
      searchContainer = (<Container uid={uid} recipes={searchResults} />)
    }

    return (
      <div className="dashboard">
        <Nav
          signOut={this.onSignOut}
          onOpenModal={this.onOpenModal}
          displayName={displayName}
          uid={uid}
        />
        <div className="bookmarks">
          {bookmarks ? <Container uid={uid} recipes={bookmarks} /> : null }
        </div>
        <Modal
          open={modalOpen}
          onClose={this.onCloseModal}
          closeIconSvgPath={''}
          closeIconSize={48}
          center
          classNames={{
            overlay: 'search__overlay',
            modal: 'search__modal',
            closeButton: 'search__close',
            closeIcon: 'search__icon'
          }}>
          <h2>Search for a recipe!</h2>
          <form ref={el => this.searchRef = el} onSubmit={(e) => this.onSearchSubmit(e)}>
            <img src={search} alt="Search"/>
            <span>
              <input onChange={(e) => this.handleSearch(e)} type="search" placeholder="Search"/>
            </span>
          </form>
          {searchContainer}
        </Modal>
      </div>
    )
  }
}

export default Dashboard;

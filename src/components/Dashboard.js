import React from 'react';
import Modal from 'react-responsive-modal';
import Nav from './sfc/Nav';
import Container from './sfc/Container';
import { APP_ID, APP_KEY } from '../private.js';
import { auth, database } from '../base';
import { logout, changeProfilePicture } from '../auth';
import search from '../svg/search.svg';
import user from '../svg/user.svg';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.searchRef = React.createRef();
    this.state = {
      avatar: user,
      file: '',
      search: '',
      settings: '',
      displayName: '',
      searchResults: null,
      noResults: false,
      modalOpen: false,
      bookmarks: null
    }
  }
  componentDidMount() {
    const user = auth.currentUser;
    // Check if user has an avatar set, if not render the user.svg
    if(auth.currentUser.photoURL !== null) {
      this.setState({ avatar: auth.currentUser.photoURL })
    }
    // Fetching our users data & saved bookmarks
    const ref = database.ref(`/users/${user.uid}/account/`);
    ref.once('value')
    .then(snap => {
      console.log(snap.val());
      this.setState({
        displayName: snap.val().displayName,
        settings: snap.val().settings
      })
    })
    // Fetching the keys for each bookmark to display on dashboard
    const keyRef = database.ref(`/users/${user.uid}/account/recipes`)
    keyRef.on('value', (snap) => {
      let bookmarks = [];
      snap.forEach(child => {
        const item = child.val();
        item.key = child.key;
        bookmarks.push(item);
      })
      console.log(bookmarks);
      this.setState({
        bookmarks
      })
    })
    console.log(user);
  }
  handleAvatar = e => {
    let reader = new FileReader();
    let file = e.target.files[0];
    if(file) {
      reader.onloadend = () => {
        this.setState({
          file,
          avatar: reader.result
        })
      }
      reader.readAsDataURL(file);
      changeProfilePicture(this.props.uid, file);
    }
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
        this.setState({ noResults: true });
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
  onSignOut = () => {
    this.props.loading()
    setTimeout(() => {
      this.props.loading()
      logout();
    }, 1500);
  }
  onCloseModal = () => {
   this.setState({
     modalOpen: false,
     noResults: false,
     searchResults: ''
   });
 }
 onOpenModal = () => {
   this.setState({ modalOpen: true });
 }
  render() {
    const { uid } = this.props;
    const {
      avatar,
      modalOpen,
      noResults,
      searchResults,
      displayName,
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
          avatarURL={avatar}
          handleAvatar={this.handleAvatar}
          displayName={displayName}
          uid={uid}
        />
        <div className="bookmarks">
          { bookmarks
            ? <Container uid={uid} recipes={bookmarks} />
            : null
          }
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
              <input onChange={(e) => this.handleSearch(e)} type="search" placeholder="Search" />
            </span>
          </form>
          { searchContainer }
        </Modal>
      </div>
    )
  }
}

export default Dashboard;

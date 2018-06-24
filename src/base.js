import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDo7NGjK0-UBpGnyTJW-NDbZdMMJDdQbQ0",
  authDomain: "react-recipes-2a68e.firebaseapp.com",
  databaseURL: "https://react-recipes-2a68e.firebaseio.com"
}

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const database = app.database();

const localKey = 's-usc1c-nss-239.firebaseio.com';

const isAuthenticated = () => {
  return !!auth.currentUser || !!localStorage.getItem(localKey);
}

export { app, auth, database, isAuthenticated, localKey };

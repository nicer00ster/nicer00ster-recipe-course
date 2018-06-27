import { database, auth } from './base';

export function authenticate(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

export function login(email, password) {
  return auth.signInwithEmailAndPassword(email, password);
}

export function logout() {
  return auth.signOut();
}

export function resetPassword(email) {
  return auth.sendPasswordResetEmail(email);
}

export function saveUser(user, displayName) {
  return database.ref().child(`users/${user.uid}/account`)
  .set({
    email: user.email,
    uid: user.uid,
    displayName
  })
  .then(() => user)
}

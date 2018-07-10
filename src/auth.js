import { database, auth, storage } from './base';
import { notify } from 'react-notify-toast';

export const register = (email, password) => auth.createUserWithEmailAndPassword(email, password);

export const login = (email, password) => auth.signInWithEmailAndPassword(email, password);

export const logout = () => {
  notify.show('Come back soon! 🖐️', 500);
  return auth.signOut();
};

export const saveRecipe = (uid, recipe) => {
  const key = database.ref(`users/${uid}/account/recipes`).push().key;
  const data = {
    recipe: {
      label: recipe.label,
      image: recipe.image,
      calories: recipe.calories,
      digest: recipe.digest,
      yield: recipe.yield,
      url: recipe.url,
      ingredients: recipe.ingredients,
      source: recipe.source,
      key: key
    }
  }
  notify.show('Nice choice! 🤤', 'success', 3000);
  return database.ref(`users/${uid}/account/recipes/` + key).update(data);
};

export const deleteRecipe = (uid, key) => {
  const ref = database.ref(`users/${uid}/account/recipes/${key}`);
  notify.show('Sayonara! ✌️', 'success', 3000);
  return ref.remove();
};

export const saveUser = (user, displayName) => {
  notify.show('Hey there newbie! 😄 Start searchin\' to get started!', 'success', 4500);
  return database.ref(`users/${user.uid}/account`)
  .set({
    email: user.email,
    uid: user.uid,
    displayName
  })
};

export const changeProfilePicture = (uid, file) => {
  const user = auth.currentUser;
  storage.ref(`images/${uid}/`).put(file)
  .then(snap => {
    snap.ref.getDownloadURL()
    .then(url => {
      user.updateProfile({ photoURL: url });
      notify.show('Lookin\' sexy! 😘', 'success', 3000);
    })
  })
};

export const updateSettings = (uid, settings) => {
  notify.show('👍', 'success', 2500);
  return database.ref(`users/${uid}/account/settings/`).set(settings);
};

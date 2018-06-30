import { database, auth } from './base';
import { notify } from 'react-notify-toast';

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

export function saveRecipe(uid, recipe) {
  const key = database.ref().child(`users/${uid}/account/recipes`).push().key;
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
  return database.ref().child(`users/${uid}/account/recipes/` + key).update(data);
}

export function deleteRecipe(uid, key) {
  const ref = database.ref().child(`users/${uid}/account/recipes/${key}`);
  notify.show('Sayonara! ✌️', 'success', 3000);
  return ref.remove();
}


export function saveUser(user, displayName) {
  notify.show('Hey there newbie! 😄 Start searchin\' to get started!', 'success', 4500);
  return database.ref().child(`users/${user.uid}/account`)
  .set({
    email: user.email,
    uid: user.uid,
    displayName
  })
}

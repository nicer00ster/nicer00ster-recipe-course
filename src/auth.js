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
      ingredients: recipe.ingredients
    }
  }
  return database.ref().child(`users/${uid}/account/recipes/` + key).update(data);
}

export function deleteRecipe(uid, key, recipe) {

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

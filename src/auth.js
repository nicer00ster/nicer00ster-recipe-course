import firebase from 'firebase';
import { database, auth, storage } from './base';
import { notify } from 'react-notify-toast';

export function register(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

export function login(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

export function logout() {
  notify.show('Come back soon! 🖐️', 500);
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

export function changeProfilePicture(uid, file) {
  const image = new File([file], "file", { type: 'image/png', lastModified: Date.now() });

  const task = storage.child(`images/${uid}/`).put(image);

  task.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done.');

    switch(snapshot.state) {
      case firebase.storage.TaskState.PAUSED:
        console.log('Upload paused.');
        break;
      case firebase.storage.TaskState.RUNNING:
        console.log('Upload is running.');
        break;
    }
  }, error => {
    switch(error.code) {
      case 'storage/unauthorized':
        break;
      case 'storage/canceled':
        break;
      case 'storage/unknown':
        break;
    }
  }, () => {
    task.snapshot.ref.getDownloadURL()
    .then((url) => {
      console.log('File is available at', url);
    })
  })

  // .then(snapshot => {
  //   notify.show('Lookin\' sexy! 😘', 'success', 3000);
  //   console.log('Uploaded file successfully!');
  // })
}

import firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/auth";

const config = {
    apiKey: "AIzaSyCsOYVUk87KmYDik4um59GiAGhFniGoSNM",
    authDomain: "crwn-db-e09ed.firebaseapp.com",
    databaseURL: "https://crwn-db-e09ed.firebaseio.com",
    projectId: "crwn-db-e09ed",
    storageBucket: "crwn-db-e09ed.appspot.com",
    messagingSenderId: "491096768318",
    appId: "1:491096768318:web:4dac37c55928cae26eb66f",
    measurementId: "G-6HCXNQP3WQ"
  };

  export const createUserProfileDocument = async (userAuth, additionalData ) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message)
      }
    }
    
    return userRef;

  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
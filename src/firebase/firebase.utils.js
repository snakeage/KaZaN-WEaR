import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDAuwLXdu6pYwQhLBUoEagOToy1PPRt0no",
  authDomain: "kazan-wear.firebaseapp.com",
  databaseURL: "https://kazan-wear.firebaseio.com",
  projectId: "kazan-wear",
  storageBucket: "kazan-wear.appspot.com",
  messagingSenderId: "1016604607395",
  appId: "1:1016604607395:web:ae397ed1aae88f7df6d016",
  measurementId: "G-B7CDJLDJLG"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

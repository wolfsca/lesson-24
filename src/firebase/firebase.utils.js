import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBNvO-5P2uw9Q68vJgYuumPs_YPnaBiZxw",
  authDomain: "crown-db-fc7c0.firebaseapp.com",
  projectId: "crown-db-fc7c0",
  storageBucket: "crown-db-fc7c0.appspot.com",
  messagingSenderId: "2205180085",
  appId: "1:2205180085:web:a72e9bbd54b351549f9efc",
  measurementId: "G-R496CJBPZ5"
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

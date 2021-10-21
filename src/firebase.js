import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "key"
};

// Initialize Firebase
//const app = firebase.initializeApp(firebaseConfig);
//const db = app.firebase;
//export default db;
const fb = firebase.initializeApp(firebaseConfig);

const db = fb.firestore();
export default db;
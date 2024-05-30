import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXdKgWGEJ9jj4d0DNZI0m9oF2uDpCseUo",
  authDomain: "internetofthings312.firebaseapp.com",
  databaseURL: "https://internetofthings312-default-rtdb.firebaseio.com",
  projectId: "internetofthings312",
  storageBucket: "internetofthings312.appspot.com",
  messagingSenderId: "258082650732",
  appId: "1:258082650732:web:ba187acb204d91e8877649"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
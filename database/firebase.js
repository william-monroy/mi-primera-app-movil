import firebase from 'firebase';

import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyDlD580LWsgYosb9OFXSTAgq8yNxbsAhAY",
    authDomain: "monroy-app.firebaseapp.com",
    databaseURL: "https://monroy-app.firebaseio.com",
    projectId: "monroy-app",
    storageBucket: "monroy-app.appspot.com",
    messagingSenderId: "878198700376",
    appId: "1:878198700376:web:514fc738acde5157274d2d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
    firebase,
    db,
}
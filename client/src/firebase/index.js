import firebase from 'firebase';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyDKSLN_QMQrDuAJ0N5BjjBvI74tuEApyAw",
    authDomain: "make-your-brunch-c3580.firebaseapp.com",
    databaseURL: "https://make-your-brunch-c3580.firebaseio.com",
    projectId: "make-your-brunch-c3580",
    storageBucket: "make-your-brunch-c3580.appspot.com",
    messagingSenderId: "449702613306",
    appId: "1:449702613306:web:ad33dd02212c17564fc003",
    measurementId: "G-B88GTJH2FJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const storage = firebase.storage();

  export {
      storage, firebase as default
  }
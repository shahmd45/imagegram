import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC3ThNSGWK9esEC2KN4AQwJ0L_qs4guBf4",
    authDomain: "image-gram.firebaseapp.com",
    databaseURL: "https://image-gram.firebaseio.com",
    projectId: "image-gram",
    storageBucket: "image-gram.appspot.com",
    messagingSenderId: "635367808879",
    appId: "1:635367808879:web:0dbde6c76529d058d7d29a"
};

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFireStore = firebase.firestore();
const timeStamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFireStore, timeStamp };
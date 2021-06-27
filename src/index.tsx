import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import firebaseConfig from '../firebaseConfig.json'

console.log('collectio photo')

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
// if (location.hostname === 'localhost' || location.hostname.match(/192\.168\.0\.\w+$/)) {
//     db.useEmulator('localhost', 8080);
// }
export const storage = firebase.storage();
export const analytics = firebase.analytics();

export default firebase


import React from "react";
import ReactDOM from "react-dom";
import App from './App';

console.log('collectio photo init')


ReactDOM.render(<App />, document.getElementById("app"));

console.log('collectio photo done')

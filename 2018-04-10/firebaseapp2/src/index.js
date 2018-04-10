import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import * as firebase from "firebase"

var config = {
    apiKey: "AIzaSyC6JMw4N6CM9cOoEvVnMkzo7-qRFsCEey4",
    authDomain: "ttsdemo-37b84.firebaseapp.com",
    databaseURL: "https://ttsdemo-37b84.firebaseio.com",
    projectId: "ttsdemo-37b84",
    storageBucket: "ttsdemo-37b84.appspot.com",
    messagingSenderId: "11268229908"
};
firebase.initializeApp(config);

const dbRef = firebase.database().ref()

ReactDOM.render(<App dbRef={dbRef }/>, document.getElementById('root'));
registerServiceWorker();

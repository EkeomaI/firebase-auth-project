//jshint esversion:6
var firebase = require("firebase");
require('dotenv').config();

// Initialize Firebase
var config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_ID
};
//var firebaseApp = firebase.initializeApp(config);
firebase.initializeApp(config);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
//console.log(firebase.auth.Auth.Persistence.LOCAL);
exports.firebase = firebase;
//exports.firebaseApp = firebaseApp;




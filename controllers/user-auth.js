//jshint esversion:6
// profile page dynamically pulls content of signed in users
// On the profile initially, the logoutLink is false
// after the user is created, we pass the email to initialise a new profile

const firebaseApp = require("../services/firebase-services").firebase;
exports.postRegister = function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    //var firebaseApp = require("../services/firebase-services").firebaseApp; 
    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            //first time registration
            return res.redirect('/create-profile');
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                //console.log('The password is too weak.');
                res.render('register', {
                    pageTitle: 'Registration',
                    currentState: false,
                    errorMsg: 'The password is too weak.',
                    userInfo: {}
                });
            } else {
                //console.log(errorMessage);
                res.render('register', {
                    pageTitle: 'Registration',
                    currentState: false,
                    errorMsg: errorMessage,
                    userInfo: {}
                });
            }
        });
};

// implementation with no persistence!!
// Indicates that the state will only be stored in memory and will be cleared 
// when the window or activity is refreshed.
exports.postLoginNoSession = function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    firebaseApp.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            return res.redirect('/');
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                //console.log('The password is too weak.');
                res.render('login', {
                    pageTitle: 'Log In',
                    currentState: false,
                    errorMsg: 'The password is too weak.',
                    userInfo: {}
                });
            } else {
                console.log(errorMessage);
                res.render('login', {
                    pageTitle: 'Log In',
                    currentState: false,
                    errorMsg: errorMessage,
                    userInfo: {}
                });
            }
        });
};

// When a user logs in, a session is initiated by calling the setPersistence method
// which returns the signInWithEmailAndPassword method as a promise.
// this promise is then resolved(rejected) after once the state finishes
// copying from one type of storage to the other.

// Supported types of Auth state persistence:
// 1. firebaseApp.auth.Auth.Persistence.SESSION
// 2. firebaseApp.auth.Auth.Persistence.LOCAL
// 3. firebaseApp.auth.Auth.Persistence.NONE
// In node.js server environment, only in memory persistence is supported.


exports.postLogin = function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    firebaseApp.auth().setPersistence(firebaseApp.auth.Auth.Persistence.NONE)
        .then(function () {
            // Existing and future Auth states are now persisted in the current
            // session only. Closing the window would clear any existing state even
            // if a user forgets to sign out.
            // ...
            // New sign-in will be persisted with session persistence.
            //console.log('Persistence successfully initiated!');
            return firebaseApp.auth().signInWithEmailAndPassword(email, password)
                .then(() => {
                    return res.redirect('/');
                })
                .catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode == 'auth/weak-password') {
                        //console.log('The password is too weak.');
                        res.render('login', {
                            pageTitle: 'Log In',
                            currentState: false,
                            errorMsg: 'The password is too weak.',
                            userInfo: {}
                        });
                    } else {
                        console.log(errorMessage);
                        res.render('login', {
                            pageTitle: 'Log In',
                            currentState: false,
                            errorMsg: errorMessage,
                            userInfo: {}
                        });
                    }
                });
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error);
        });
};

exports.postUpdateProfile = function (req, res, next) {
    var user = firebaseApp.auth().currentUser;
    if (user) {
        var displayName = req.body.fullName;
        var phoneNumber = req.body.phoneNumber;
        var photoURL = req.body.photoURL;
        user.updateProfile({
            displayName: displayName,
            photoURL: photoURL,
            phoneNumber: req.body.phoneNumber
        }).then(function () {
            // Update successful.
            return res.redirect('/profile');
        }).catch(function (error) {
            // An error happened.
            console.log(error);
            return res.send(error);
        });
    } else {
        return res.redirect('/');
    }
};
exports.postDeleteProfile = function (req, res, next) {
    var user = firebaseApp.auth().currentUser;
    user.delete().then(function () {
        // User deleted.
        return res.redirect('/');
    }).catch(function (error) {
        // An error happened.
        console.log(error);
        return res.redirect('/');
    });
};

exports.postCreateProfile = function (req, res, next) {

    var user = firebaseApp.auth().currentUser;
    if (user) {
        var displayName = req.body.fullName;
        var phoneNumber = req.body.phoneNumber;
        var photoURL = req.body.photoURL;

        //console.log(req.body.phoneNumber);

        user.updateProfile({
            displayName: displayName,
            photoURL: photoURL,
            phoneNumber: req.body.phoneNumber
        }).then(function () {
            // Update successful.
            return res.redirect('/profile');
        }).catch(function (error) {
            // An error happened.
            console.log(error);
        });
    } else {
        return res.redirect('/');
    }
};
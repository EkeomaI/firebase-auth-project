//jshint esversion:6
const firebaseApp = require("../services/firebase-services").firebase;

exports.getIndex = (req, res, next) => {
    //console.log(req.route.path);
    var user = firebaseApp.auth().currentUser;
    //firebaseApp.auth().onAuthStateChanged(function (user) {
    var name, email, photoURL, phoneNumber, uid, emailVerified, userProfile;
    if (user) {
        user.getIdToken().then(function (data) {

            if (user.displayName !== null) {
                displayName = user.displayName.split(" ");
                userProfile = {
                    name: displayName[0],
                    fname: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    phoneNumber: user.phoneNumber,
                    emailVerified: user.emailVerified,
                    uid: data
                };
            } else {
                userProfile = {
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    phoneNumber: user.phoneNumber,
                    emailVerified: user.emailVerified,
                    uid: data
                };
            }
            //console.log('Index with auth');
            res.render('index', {
                pageTitle: 'Home',
                currentState: true,
                userInfo: userProfile
            });
        }).catch(error => console.log(error));
    } else {
        //console.log('index without auth');
        res.render('index', {
            pageTitle: 'Home',
            currentState: false,
            userInfo: {}
        });
    }
    //});
};
//console.log(req.route.path);
exports.getProfile = (req, res, next) => {
    var user = firebaseApp.auth().currentUser;
    //firebaseApp.auth().onAuthStateChanged(function (user) {
    var name, fname, email, photoURL, phoneNumber, uid, emailVerified;
    var userProfile;
    if (user) {
        //console.log(user);
        user.getIdToken().then(function (data) {
            //console.log(data);
            if (user.displayName !== null) {
                displayName = user.displayName.split(" ");
                userProfile = {
                    name: displayName[0],
                    fname: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    phoneNumber: user.phoneNumber,
                    emailVerified: user.emailVerified,
                    uid: data
                };
            } else {
                userProfile = {
                    name: user.displayName,
                    fname: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    phoneNumber: user.phoneNumber,
                    emailVerified: user.emailVerified,
                    uid: data
                };
            }
            //console.log('profile with auth');
            return res.render('profile', {
                pageTitle: 'Profile',
                currentState: true,
                userInfo: userProfile
            });
        }).catch(error => console.log(error));
    } else {
        //console.log('profile without auth');
        res.redirect('/');
    }
    //});
};
exports.getLogin = (req, res, next) => {
    //firebaseApp.auth().onAuthStateChanged(function (user) {
    var user = firebaseApp.auth().currentUser;
    if (user) {
        // User is signed in.
        res.redirect('/'); // if user is logged redirect to home page
    } else {
        //console.log(user);
        //console.log('User is signed out!');
        return res.render('login', {
            pageTitle: 'Log In',
            currentState: false,
            errorMsg: "",
            userInfo: {}
        });
    }
    //});
};
exports.getCreateProfile = (req, res, next) => {
    var user = firebaseApp.auth().currentUser;
    // firebaseApp.auth().onAuthStateChanged(function (user) {
    var name, email, photoURL, phoneNumber, uid, emailVerified;
    if (user) {
        // User is signed in.
        user.getIdToken().then(function (data) {
            var userProfile = {
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                phoneNumber: user.phoneNumber,
                emailVerified: user.emailVerified,
                uid: data
            };
            //console.log('profile with auth');
            return res.render('create-profile', {
                pageTitle: 'Add details',
                currentState: true,
                errorMsg:"",
                userInfo: userProfile
            });
        }).catch(error => console.log(error));
    } else {

        // redirect back to registration page if no user is registered
        return res.redirect('/register');

    }
    //});
};

exports.getUpdateProfile = (req, res, next) => {
    var user = firebaseApp.auth().currentUser;
    //firebaseApp.auth().onAuthStateChanged(function (user) {
    var name, fname, email, photoURL, phoneNumber, uid, emailVerified, userProfile;
    if (user) {
        // User is signed in.
        user.getIdToken().then(function (data) {
            if (user.displayName !== null) {
                displayName = user.displayName.split(" ");
                userProfile = {
                    name: displayName[0],
                    fname: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    phoneNumber: user.phoneNumber,
                    emailVerified: user.emailVerified,
                    uid: data
                };
            } else {
                userProfile = {
                    name: user.displayName,
                    fname: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    phoneNumber: user.phoneNumber,
                    emailVerified: user.emailVerified,
                    uid: data
                };
            }
            //console.log('profile with auth');
            return res.render('update-profile', {
                pageTitle: 'Update Profile',
                currentState: true,
                userInfo: userProfile,
                errorMsg: ""
            });
        }).catch(error => console.log(error));
    } else {
        //console.log(user);
        //console.log('User is signed out!');
        return res.redirect('/login');
    }
    // });
};

exports.getLogOut = (req, res, next) => {
    firebaseApp.auth().signOut().then(function () {
        //console.log('success!');
        // Sign-out successful.
        return res.redirect('/');
    }).catch(function (error) {
        // An error happened.
        console.log(error);
    });
};

exports.getRegister = (req, res, next) => {

    var user = firebaseApp.auth().currentUser;
    //firebaseApp.auth().onAuthStateChanged(function (user) {

    if (user) {
        res.redirect('/');
    } else {
        res.render('register', {
            pageTitle: 'Registration',
            currentState: false,
            errorMsg: "",
            userInfo: {}
        });
    }
    //});
};

exports.getReset = (req, res) => {
    res.render('reset', {
        pageTitle: 'Reset Password'
    });
};
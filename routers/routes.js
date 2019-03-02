//jshint esversion:6

const express = require('express');
const router = express.Router();

const getIndexPage = require('../controllers/services').getIndex;
const getProfilePage = require('../controllers/services').getProfile;
const getRegisterPage = require('../controllers/services').getRegister;
const getLoginPage = require('../controllers/services').getLogin;
const getLogOutPage = require('../controllers/services').getLogOut;
const getResetPage = require('../controllers/services').getReset;
const postRegisterPage = require('../controllers/user-auth').postRegister;
const postLoginPage = require('../controllers/user-auth').postLogin;
const getUpdateProfilePage = require('../controllers/services').getUpdateProfile;
const getCreateProfilePage = require('../controllers/services').getCreateProfile;
const postUpdateProfilePage = require('../controllers/user-auth').postUpdateProfile;
const postCreateProfilePage = require('../controllers/user-auth').postCreateProfile;
const postDeleteProfilePage = require('../controllers/user-auth').postDeleteProfile;
router.get('/', getIndexPage);
router.get('/profile', getProfilePage);
router.get('/login', getLoginPage);
router.get('/register', getRegisterPage);
router.get('/logout', getLogOutPage);
router.get('/reset', getResetPage);
router.get('/update-profile', getUpdateProfilePage);
router.get('/create-profile', getCreateProfilePage);
router.get('/reset', getResetPage);

router.post('/register', postRegisterPage);
router.post('/login', postLoginPage);
router.post('/update-profile', postUpdateProfilePage);
router.post('/create-profile', postCreateProfilePage);
router.post('/delete-profile', postDeleteProfilePage);


module.exports = router;
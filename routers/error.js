//jshint esversion:6

const express = require('express');
const router = express.Router();

const getErrorPage = require('../controllers/error').get404;

router.use('/', getErrorPage);

module.exports = router;
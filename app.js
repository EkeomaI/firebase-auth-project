//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
//app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', [path.join(__dirname, 'views'),
    path.join(__dirname, 'views/profiles/')
]);
app.use(express.static('public'));


appRoutes = require('./routers/routes');
appError = require('./routers/error');

app.use(appRoutes);
app.use(appError);

exports.app = app;

app.listen(3000, () => {
    console.log(`Server started on ${process.env.PORT}`);
});
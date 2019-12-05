
const express = require('express')
const app = express();

const express = require('express');
const app = express();
const userRoutes = require('./app/routes/user');
const oauthRoutes = require('./app/routes/oauth');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
//require('./app/db/mongoose');

"use-strict";


import express from 'express';
import expressSession from 'express-session';
import bodyParser from 'body-parser';
import globalConfig from '../config.json';
import routes from './src/routes';
import db from './app/db/mongoose';
const app = express();


// Required for twitter OAuth
app.use(expressSession({
    secret: 'secretKeyFromEnv'
}));



app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, x-auth,Authorization, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH , DELETE, OPTIONS"
  );
  next();
});



app.listen(4012, () => {
  console.log('running on port 4012')
});


// Body parser config
app.use(bodyParser.json({
    limit: "50mb"
}));
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true
}));

app.use('/user', userRoutes);
app.use('/auth', oauthRoutes);

const port =
    process.env.PORT ||
    globalConfig[process.env.ENV][process.env.ENGINE_NAME]["PORT"];

app.get('/', (req, res) => res.send('Welcome to the Pocket Tanks'));

const server = app.listen(port, () => {
    console.log(`Microservice running on PORT : ${port}`);
    console.log("Current Environment : ", process.env.ENV);
    console.log("Base for API", routes.version.apiBaseUri);
});
app.use(routes.version.apiBaseUri, routes.version.api(app));
process.on("uncaughtException", function(err) {
    console.error(new Date().toUTCString() + " uncaughtException:", err.message);
    console.error(err.stack);
    return false;
    process.exit(1);
});


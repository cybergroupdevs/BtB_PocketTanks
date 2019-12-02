"use-strict";

// ENV CONFIG
process.env.ENGINE_NAME = "ANALYTICS";
process.env.ENV = "DEV";

// CUSTOM ENV CONFIG
if (process.argv.indexOf("--dev") !== -1) {
  process.env.ENV = "DEV";
} else if (process.argv.indexOf("--prod") !== -1) {
  process.env.ENV = "PROD";
}

const express = require('express');
const expressSession = require('express-session');
const bodyParser = require('body-parser');

const globalConfig = require('../config.json');
const routes = require("./app/routes");

const app = express();

// Required for twitter OAuth
app.use(expressSession({
  secret: 'secretKeyFromEnv'
}));

// Enabling CORS
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

// Body parser config
app.use(bodyParser.json({
  limit: "50mb"
}));
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: true
}));

const port =
  process.env.PORT ||
  globalConfig[process.env.ENV][process.env.ENGINE_NAME]["PORT"];

const server = app.listen(port, () => {
  console.log(`Microservice running on PORT : ${port}`);
  console.log("Current Environment : ", process.env.ENV);
  console.log("Base for API", routes.apiBaseUri);
});

app.use(routes.apiBaseUri, routes.api(app));
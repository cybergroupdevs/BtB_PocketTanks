"use-strict";


import express from 'express';
import expressSession from 'express-session';
import bodyParser from 'body-parser';
import globalConfig from '../config.json';
import routes from './src/routes';
import db from './app/db/mongoose';
const app = express();
import Response from './wrappers/response';
import Authentication from './src/middlewares/authentication'
import Authorization from './src/middlewares/authorization'
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

// use JWT auth to secure the api
app.use(new Authentication().authenticateRequest());
app.use(function(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        console.log(err.message);
        res.status(401).json(new Response(false, 401, "Invalid Signature"));
    }
    
});
app.use(new Authorization().isAuthorized); //Middleware to check Request authorization
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
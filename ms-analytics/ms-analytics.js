const express = require('express');
const app = express();
const userRoutes = require('./app/routes/user');
const oauthRoutes = require('./app/routes/oauth');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
//require('./app/db/mongoose');


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


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(expressSession({
  secret: 'secretKeyFromEnv'
}));
app.use('/user', userRoutes);
app.use('/auth', oauthRoutes);
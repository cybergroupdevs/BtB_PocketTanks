<<<<<<< HEAD
const express = require('express')
const app = express();
const userRoutes = require('./app/routes/user')
=======
const express = require('express');
const app = express();
const userRoutes = require('./app/routes/user');
const oauthRoutes = require('./app/routes/oauth');
>>>>>>> 8812a17db4b6505adbc8dd45a998c5b8b63d95d0
const bodyParser = require('body-parser');
const expressSession = require('express-session');
//require('./app/db/mongoose');


<<<<<<< HEAD
app.use(function (req, res, next) {
=======
app.use(function(req, res, next) {
>>>>>>> 8812a17db4b6505adbc8dd45a998c5b8b63d95d0
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
<<<<<<< HEAD
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/user', userRoutes)





app.listen(4012, () => { console.log('running on port 4012') });

=======
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
>>>>>>> 8812a17db4b6505adbc8dd45a998c5b8b63d95d0

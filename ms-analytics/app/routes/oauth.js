// const express = require('express');
// const router = express.Router();
// const request = require('request');
// const querystring = require('querystring');
// const passport = require('../middlewares/passport-twitter');
//
// router.get('/twitter', passport.authenticate('twitter'));
// //
// // router.get('/twitter/verify',
// //   passport.authenticate('twitter', {
// //     successRedirect: '/',
// //     failureRedirect: '/login'
// //   }));
//
// router.post('/twitter/extracttokens', (req, res) => {
//   let formData = {
//     "oauth_token": String(req.body.oauth_token),
//     "oauth_verifier": String(req.body.oauth_verifier),
//     "oauth_consumer_key": String(req.body.oauth_consumer_key)
//   };
//
//   formData = querystring.stringify(formData);
//   let contentLength = formData.length;
//
//   let options = {
//     headers: {
//       'Content-Length': contentLength,
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     uri: 'https://api.twitter.com/oauth/access_token',
//     body: formData,
//     method: 'POST'
//   }
//   request(options, (error, response, body) => {
//     if (error) {
//       console.log(error);
//     };
//     console.log(body);
//   });
// });
//
// module.exports = router;
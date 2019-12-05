const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new TwitterStrategy({
    consumerKey: 'CONSUMER_KEY',
    consumerSecret: 'CONSUMER_SECRET_KEY',
    callbackURL: "http://0.0.0.0:3000/callback"
  },
  function(token, tokenSecret, profile, done) {
    done(null);
  }
));

module.exports = passport;
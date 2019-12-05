import passport from 'passport';
import passportTwitter from 'passport-twitter';

const TwitterStrategy = passportTwitter.Strategy;

passport.use(new TwitterStrategy({
        consumerKey: 'CONSUMERKEY',
        consumerSecret: 'CONSUMERSECRET',
        callbackURL: "http://0.0.0.0:4200/twittercallback"
    },
    function(token, tokenSecret, profile, done) {
        done(null);
    }
));
export default passport;
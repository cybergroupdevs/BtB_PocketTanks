import passport from 'passport';
import passportTwitter from 'passport-twitter';
import envs from '../utils/config';

const TwitterStrategy = passportTwitter.Strategy;

passport.use(new TwitterStrategy({
        consumerKey: String(process.env.OAUTH_CONSUMER_KEY),
        consumerSecret: String(process.env.OAUTH_CONSUMER_SECRET),
        callbackURL: "http://127.0.0.1:4200/twittercallback"
    },
    function(token, tokenSecret, profile, done) {
        done(null);
    }
));
export default passport;
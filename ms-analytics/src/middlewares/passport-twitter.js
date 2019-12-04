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


/**
 * Exploring OO based approach to using passport js
 */

// class PassportTwt {
//     constructor(){
//         try{
//             passport.use(new passportTwitter.Strategy({
//                 consumerKey: 'GWmiD285IA55bQsYqsFj9Yj2Q',
//                 consumerSecret: 'GrFOAK3ggwahzjEw5bzTEwfVVMkWmQreo782MBtGC8GYPfUVrp',
//                 callbackURL: "http://0.0.0.0:4200/twittercallback"
//             },
//             function(token, tokenSecret, profile, done) {
//                 console.log("====== passport middleware =======");
//                 console.log('token', token);
//                 console.log('tokenSecret', tokenSecret);
//                 console.log('profile', profile);
//                 done(null);
//             }))
//             this.passport = passport;
//         }
//         catch(error){
//             console.log(error);
//             throw new Error(error.message);
//         }
//         }
//     authenticateTwitter(){
//         this.passport.authenticate('twitter');
//     }
// }
// export default new PassportTwt()
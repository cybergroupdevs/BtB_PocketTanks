
import express from 'express';
import api from '../../controllers';
import PassportTwt from '../../middlewares/passport-twitter';



let apiRoutes = (router) => {
    router = express.Router();

    router.post('/registration', api.users.registration);
    router.post('/login', api.users.login);
    router.post('/forgotpassword', api.users.forgotPassword);
    router.post('/forgotPasswordChanged', api.users.forgotPasswordChanged);
    router.post('/changePassword', api.users.changePassword);
    router.post('/emailVerification', api.users.emailVerification);

    // Routes for OAuth
    router.get('/auth/twitter', PassportTwt.authenticate('twitter'));
    router.post('/auth/twitter/extracttokens', api.auth.twitter);

    // twitter analytics routes
    router.get('/twitter/posts', api.twitter.posts);
    router.get('/twitter/kpis', api.twitter.kpis);
    router.get('/twitter/sentiment', api.twitter.sentiment);


    router.get('/profile/:username', api.auth.twitterProfile);
    

    return router;
}
export default apiRoutes;
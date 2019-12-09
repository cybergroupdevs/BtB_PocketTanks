
import express from 'express';
import api from '../../controllers';
import PassportTwt from '../../middlewares/passport-twitter';
import Validation from '../../middlewares/validation';



const validation = new Validation()

let apiRoutes = (router) => {
    router = express.Router();

    router.post('/registration', validation.registration, api.users.registration);
    router.post('/login', validation.login, api.users.login);
    router.post('/forgotpassword', validation.forgotPassword, api.users.forgotPassword);
    router.post('/forgotPasswordChanged', validation.forgotPasswordChanged, api.users.forgotPasswordChanged);
    router.post('/changePassword', validation.changePassword, api.users.changePassword);
    router.post('/emailVerification',validation.emailVerification, api.users.emailVerification);
    
    // Routes for OAuth
    router.get('/auth/twitter', PassportTwt.authenticate('twitter'));
    router.post('/auth/twitter/extracttokens', api.auth.twitter);

    // twitter analytics routes
    router.get('/twitter/posts', api.twitter.posts);
    router.get('/twitter/kpis', api.twitter.kpis);
    router.get('/twitter/sentiment', api.twitter.sentiment);
    router.get('/twitter/fetchPosts', api.twitter.fetchPostsFromTwitter);

    router.get('/tweets/:username', api.auth.fetchComment);
    router.get('/profile/:username', api.twitter.twitterProfile);
    

    return router;
}
export default apiRoutes;
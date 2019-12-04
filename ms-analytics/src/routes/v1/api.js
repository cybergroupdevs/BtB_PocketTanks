import express from 'express';
import api from '../../controllers';
import PassportTwt from '../../middlewares/passport-twitter';

let apiRoutes = (router) => {
    router = express.Router();
    router.post('/registration', api.users.registration);
    router.post('/login', api.users.login);

    // Routes for OAuth
    router.get('/auth/twitter', PassportTwt.authenticate('twitter'));
    router.post('/auth/twitter/extracttokens', api.auth.twitter);
    return router;
}
export default apiRoutes;

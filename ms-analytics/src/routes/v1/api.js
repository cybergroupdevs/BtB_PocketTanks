import  express  from 'express';
import api  from '../../controllers';

let apiRoutes = (router) => {
    router = express.Router();
    router.post('/registration', api.users.registration)
    router.post('/login', api.users.login)
    return router;
}
export default apiRoutes;
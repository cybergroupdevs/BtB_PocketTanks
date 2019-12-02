import  express  from 'express';
import api  from '../../controllers';

let apiRoutes = (router) => {
    router = express.Router();
    router.post('/registration', api.users.registration)
    return router;
}
export default apiRoutes;
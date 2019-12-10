import expressJwt from 'express-jwt';
import globalConfig from '../../../config.json'


class Authentication {
    constructor(){
        this.secret = globalConfig[process.env.ENV]['JWTSECRETKEY']
    }
    authenticateRequest(){
        return expressJwt({
            secret: this.secret}).unless({
        path: [
            // public routes that don't require authentication
            '/api/soci/v0.1/registration',
            '/api/soci/v0.1/login',
            '/api/soci/v0.1/auth/twitter',//TODO: Need to explore whether token is required or not
            
        ]
        });
    }
}
export default  Authentication;
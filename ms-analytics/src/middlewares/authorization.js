import globalConfig from '../../../config.json'
import Response from '../../wrappers/response'
class Authorization {
    constructor(){
    }
    isAuthorized(req, res, next){
        try{
            if (!req.headers.x_api_key){
                res.send(new Response(false, 400, "Required X-API-KEY is missing"))
            }
            else if (!req.headers.x_api_secret_key){
                res.send(new Response(false, 400, "Required X-API-SECRET-KEY is missing"))
            }
            else{
                if( req.headers.x_api_key != globalConfig[process.env.ENV]['X-API-KEY'] || req.headers.x_api_secret_key != globalConfig[process.env.ENV]['X-API-SECRET_KEY']){
                    res.send(new Response(false, 400, "Invalid API-KEY or SECRET-KEY"))
                }
                else{
                    next()
                }
            }

        }
        catch(error){
            res.send(new Response(false, 400, error.message))
            throw new Error(error.message);
        }
    }
    
}
export default Authorization
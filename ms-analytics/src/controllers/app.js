import  Response  from '../../wrappers/response'

class AppController {
    // constructor(){
    //     console.log("*********************************")
    //     console.log("Default Controller")
    //     console.log("*********************************")
    // }
    /**
    * @param {Object} req The request object
    * @param {Object} res The response object
    * @return {Object} result The response data object
    */
    success(req, res, result){
        res.send(new Response(true, result.statusCode, result.message, result.data))
    }
    failure(req, res, result){
        res.send(new Response(false, result['statusCode'], result['message']))
    }
}

export default AppController;
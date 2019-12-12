import Response from '../../wrappers/response'

class AppController {
    /**
     * @param {Object} req The request object
     * @param {Object} res The response object
     * @return {Object} result The response data object
     */
    success(req, res, result) {
        res.send(new Response(true, result.statusCode, result.message, result.data))
    }
    /**
     * @param {Object} req The request object
     * @param {Object} res The response object
     * @return {Object} error The response error object
     */
    failure(req, res, error) {
        console.log("**************Error******************")
        console.log("StatusCode - "+ error['statusCode'])
        console.log(error['message'])
        console.log("*************************************")
        res.send(new Response(false, error['statusCode'], error['message']))
    }
}

export default AppController;
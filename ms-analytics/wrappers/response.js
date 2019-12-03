class Response{
    /**
    * @param {Object} success Boolean
    * @param {Object} statusCode This variable defined response status code.
    * @param {Object} message This variable defined response message.
    * @param {Object} data The variable defined response data.
    */
    constructor(success = true, stausCode = 200, message = "", data = null){
        this.success =  success;
        this.status = stausCode;
        this.message = message;
        this.data = data;
    }

}
export default Response;
let userwrapper= {
    response: (type = "json", status, statusCode = 200, message = " ", data = null) => {

        let userresponse = {
            type : type,
        	status : status,
        	statusCode : statusCode,
        	message : message,
        	data : data

        }

        console.log(userresponse)
        return userresponse;
        
    }

}

module.exports = userwrapper;
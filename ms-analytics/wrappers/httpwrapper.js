import rp from 'request-promise';

class HttpWrapper  {
    constructor(){

    }
    async postRequest (url, headers, data) {
        try{
            let options = {
			    uri : url,
			    method : 'POST',
			    body: data,
			    json: true,
			    headers: headers,
			    resolveWithFullResponse: true
			};
			let response = await rp(options);
			if(response && response['statusCode'] == 200){
				return response;
			}
			else{
				throw error;
			}
        }
        catch(error){
            throw new Error(error.message);
        }
    }
    async getRequest (url, headers, data) {
        try{
            let options = {
			    uri : url,
			    method : 'GET',
                headers: headers,
                timeout: 90000,
			    resolveWithFullResponse: true
			};
			let response = await rp(options);
			if(response && response['statusCode'] == 200){
				return response;
			}
			else{
				throw error;
			}
        }
        catch(error){
            throw new Error(error.message);
        }
    }
    
}
export default HttpWrapper
import querystring from 'querystring';
import request from 'request';
import AppController from './app';
import PassportTwt from '../middlewares/passport-twitter';


class Auth extends AppController {

    constructor() {
        super();
    }

    // Method to extract and save tokens
    async twitter(req, res) {
        try {
            console.log("[Auth.js Controller] Here");
            let formData = {
                "oauth_token": String(req.body.oauth_token),
                "oauth_verifier": String(req.body.oauth_verifier),
                "oauth_consumer_key": String(req.body.oauth_consumer_key)
            };
            formData = querystring.stringify(formData);
            let contentLength = formData.length;
            const options = {
                headers: {
                    'Content-Length': contentLength,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                uri: 'https://api.twitter.com/oauth/access_token',
                body: formData,
                method: 'POST'
            };
            request(options, (error, response, body) => {
                if (error) {
                    console.log(error);
                };
                // Extracting tokens
                console.log(body);
                body.split('&').forEach(pair => {
                    pair = pair.split('=');
                    if (pair.length > 1) {
                        let key = pair[0];
                        let value = pair[1];
                        console.log(key, value);
                    } else {
                        // Throw error that we couldn't fetch tokens from twitter
                        throw new Error("Cannot Fetch tokens");
                    }
                });
            });
        } catch (error) {
            console.log(error.message);
            throw new Error(error.message);
        }
    }
}

export default new Auth();
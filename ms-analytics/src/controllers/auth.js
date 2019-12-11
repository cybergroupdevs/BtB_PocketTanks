import querystring from 'querystring';
import AppController from './app';
import HttpWrapper from '../../wrappers/httpwrapper';
import User from '../models/user';
import TwitterWrapper from '../../wrappers/twitter/twitter'
class Auth extends AppController {

    constructor() {
        super();
    }
    async fetchComment() {
        try {
            const tw = new TwitterWrapper();
            tw.fetchComments('tp_taran');
        } catch (error) {
            console.log(error.message)
            super.failure(req, res, {
                statusCode: 400,
                message: error.message
            })
        }
    }
    // Method to extract and save tokens
    async twitter(req, res) {
        try {
            let formData = querystring.stringify({
                "oauth_token": String(req.body.oauth_token),
                "oauth_verifier": String(req.body.oauth_verifier),
                "oauth_consumer_key": String(process.env.OAUTH_CONSUMER_KEY)
            });
            const options = {
                headers: {
                    'Content-Length': formData.length,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                uri: 'https://api.twitter.com/oauth/access_token'
            };
            const httpReq = new HttpWrapper();
            let response = await httpReq.postRequest(options['uri'], options['headers'], formData)
            if (response['body']) {
                let updateData = {
                    oAuthToken: null,
                    oAuthTokenSecret: null
                }
                response['body'].split('&').forEach(pair => {
                    pair = pair.split('=');
                    if (pair.length > 1) {
                        switch (pair[0]) {
                            case "oauth_token":
                                updateData['oAuthToken'] = pair[1]
                                break;
                            case "oauth_token_secret":
                                updateData['oAuthTokenSecret'] = pair[1]
                                break;
                            case "screen_name":
                                updateData['screenName'] = pair[1]
                                break;
                        }
                    }
                });
                const user = new User();
                let updatedUser = await user.update({
                    _id: req.user._id
                }, {
                    "$set": {
                        "twitter": {
                            "oAuthToken": updateData['oAuthToken'],
                            "oAuthTokenSecret": updateData['oAuthTokenSecret'],
                            "screenName": updateData['screenName']
                        }
                    }
                })
                super.success(req, res, {
                    statusCode: 200,
                    message: "OK",
                    data: null
                })
            } else {
                throw new Error("Cannot Fetch tokens")
            }
        } catch (error) {
            console.log(error.message)
            super.failure(req, res, {
                statusCode: 400,
                message: error.message
            })
        }
    }
}

export default new Auth();
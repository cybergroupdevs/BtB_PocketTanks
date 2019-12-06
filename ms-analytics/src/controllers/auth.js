import querystring from 'querystring';
import AppController from './app';
import HttpWrapper from '../../wrappers/httpwrapper';
import User from '../models/user';
<<<<<<< Updated upstream
<<<<<<< HEAD
import authTwitter from '../middlewares/auth-twitter'
=======

>>>>>>> Stashed changes

=======
import TwitterWrapper from '../../wrappers/twitter/twitter'
>>>>>>> 34b28d43fc957e314f432f5d81eab2c981a881b8
class Auth extends AppController {

    constructor() {
        super();
    }
    async fetchComment(){
        try{
            const tw = new TwitterWrapper();
            tw.fetchComments('tp_taran');
        }
        catch(error){
            console.log(error.message)
            super.failure(req,res,{statusCode: 400, message: error.message})
        }
    }
    // Method to extract and save tokens
    async twitter(req, res) {

        try {
            console.log("[Auth.js Controller] Here");
            console.log("********************************")
            console.log(req.decoded)
            console.log("********************************")
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
                let tokens = { oAuthToken: null, oAuthTokenSecret: null }
                response['body'].split('&').forEach(pair => {
                    pair = pair.split('=');
                    if (pair.length > 1) {
                        switch (pair[0]) {
                            case "oauth_token":
                                tokens['oAuthToken'] = pair[1]
                                break;
                            case "oauth_token_secret":
                                tokens['oAuthTokenSecret'] = pair[1]
                                break;
                        }
                    }
                });
                const user = new User();

                let updatedUser = await user.update({ "email": req.body.email }, { "$set": { "oAuthToken": tokens['oAuthToken'], "oAuthTokenSecret": tokens['oAuthTokenSecret'] } })
                super.success(req, res, { statusCode: 200, message: "OK", data: null })
            }
            else {
                throw new Error("Cannot Fetch tokens")
            }
        } catch (error) {
            console.log(error.message)
            super.failure(req, res, { statusCode: 400, message: error.message })
        }
    }

    async twitterProfile(req, res) {
        try {
            let username=req.params.username;
            let url = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=' + username;
            let reqParams = {
                url: url,
                oauth: oauth
            }
            request.get(reqParams, (err, response, data) => {
                if (err){
                    res.sendStatus(400);
                } 
                data = JSON.parse(data);
                let responseData = {
                    "profile_image": data[0].user.profile_image_url,
                    "background_image": data[0].user.profile_background_image_url,
                    "followers_count": data[0].user.followers_count,
                    "following_count": data[0].user.friends_count,
                    "screen_name": data[0].user.screen_name,
                    "name": data[0].user.name,
                    "description": data[0].user.description,
                    "statuses_count": data[0].user.statuses_count,
                    "created_at": data[0].user.created_at
                }
                super.success(req, res, { statusCode: 200, message: "OK", data: responseData })
            });
        }

        catch (error) {
            console.log(error.message)
            super.failure(req, res, { statusCode: 400, message: error.message })

        }
    }
}

export default new Auth();
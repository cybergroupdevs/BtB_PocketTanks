import AppController from './app';
import Post from '../models/post';
import User from '../models/user';
import Worker from '../../wrappers/workers/workers';
import TwitterWrapper from '../../wrappers/twitter/twitter'



class Twitter extends AppController {
    constructor() {
        super();
    }

    async kpis(req, res) {
        try {
            const post = new Post();

            // Extracting userId from request body
            // TODO: Remove the ternary operator
            const userId = req.body.userId ? req.body.userId : 123;

            // Fetching KPI's from db
            const responseData = {
                postsCount: post.postsCount(userId),
                likesCount: post.likesCount(userId),
                commentsCount: post.commentsCount(userId)
            };

            super.success(req, res, {
                statusCode: 200,
                message: "",
                data: responseData
            });
        } catch (error) {
            console.log(error.message);
            super.failure(req, res, {
                statusCode: 400,
                message: error.message
            });
        }
    }

    async posts(req, res) {
        try {
            const post = new Post();

            // Extracting userId from request body
            const userId = req.body.userId;
            const postCount = req.query.postCount ? req.query.postCount : 10; // $_GET["postCount"]

            const posts = await post.get({
                userId: userId
            }, postCount);

            let responseData = {
                postCount: postCount,
                posts: posts
            }
            super.success(req, res, {
                statusCode: 200,
                message: "",
                data: responseData
            });
        } catch (error) {
            super.failure(req, res, {
                statusCode: 400,
                message: error.message
            });
        }
    }

    async sentiment(req, res) {
        try {
            const post = new Post();

            let countsData = {};
            const userId = req.user._id;

            switch (req.query.type) {
                case 'average':
                    countsData['positive'] = (await post.get({
                        userId: userId,
                        sentiment: 1
                    })).length;

                    countsData['negative'] = (await post.get({
                        userId: userId,
                        sentiment: 0
                    })).length;
                    break;
                case 'timeseries':
                    countsData = {
                        positive: 240,
                        negative: 120
                    };
                default:
                    countsData = {
                        positive: 240,
                        negative: 120
                    };
                    break;
            }

            super.success(req, res, {
                statusCode: 200,
                message: "",
                data: {
                    type: req.query.type,
                    countsData: countsData
                }
            });
        } catch (error) {
            console.log(error.message)
            super.failure(req, res, {
                statusCode: 400,
                message: error.message
            });
        }
    }

    async fetchPostsFromTwitter(req, res) {
        try {
            const user = new User();
            const data = await user.get({
                _id: req.user._id
            });
            const worker = new Worker();
            worker.saveComment(data[0]['twitter']['screenName'], req.user._id);
            super.success(req, res, {
                statusCode: 200,
                message: "Process Started",
                data: {}
            });
        } catch (error) {
            console.log(error.message)
            super.failure(req, res, {
                statusCode: 400,
                message: error.message
            });
        }
    }

    async twitterProfile(req,res){
        try{

            const user = new User()
            let data = await user.get({
                _id: req.user._id
            });
            if (data.length == 0) {
                throw new Error("No email exists");
            }
            else{
                let username = data[0]['twitter']['screenName'];
                const tw = new TwitterWrapper(data[0]['twitter']['oAuthToken'],data[0]['twitter']['oAuthTokenSecret'] );
                let profile  = await tw.getProfile(username);


                let updatedUser = await user.update({
                    "_id": req.user._id
                }, {
                    "$set": {
                            "twitter.profileImage": profile.profile_image_url,
                            "twitter.backgroundImage": profile.profile_background_image_url,
                            "twitter.followersCount": profile.followers_count,
                            "twitter.followingCount": profile.friends_count,
                            "twitter.name": profile.name,
                            "twitter.description": profile.description,
                            "twitter.statusesCount": profile.statuses_count,
                            "twitter.createdat": profile.created_at
                        
                    }
                })
                  super.success(req, res, {
                    statusCode: 200,
                    message: "OK",
                    data: null
                })
             }
        }
        catch(error){
            console.log(error.message)
            super.failure(req, res, {
                statusCode: 400,
                message: error.message
            })
        }
    }


}

export default new Twitter();
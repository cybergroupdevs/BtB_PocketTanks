import AppController from './app';
import Post from '../models/post';
import User from '../models/user';
import mongoose from 'mongoose';
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
            const userId = req.user._id;

            // Fetching KPI's from db
            const responseData = {
                postsCount: await post.getCount({
                    userId: userId,
                    parentId: {
                        $eq: null
                    }
                }),
                commentsCount: await post.getCount({
                    userId: userId,
                    parentId: {
                        $ne: null
                    }
                }),
                favoriteCount: (await post.getAggregate([{
                    $match: {
                        userId: mongoose.Types.ObjectId(userId)
                    }
                }, {
                    $group: {
                        _id: null,
                        "sumFavoriteCount": {
                            $sum: "$favoriteCount"
                        }
                    }
                }]))[0]['sumFavoriteCount'],
                retweetCount: (await post.getAggregate([{
                    $match: {
                        userId: mongoose.Types.ObjectId(userId)
                    }
                }, {
                    $group: {
                        _id: null,
                        "sumRetweetCount": {
                            $sum: "$retweetCount"
                        }
                    }
                }]))[0]['sumRetweetCount']
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
            const userId = req.user._id;
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
            console.log('req.query.type', req.query.type);
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
                    let criteria = [{
                        $match: {
                            parentId: {
                                $eq: null
                            },
                            userId: mongoose.Types.ObjectId(userId)
                        }
                    }, {
                        $project: {
                            yearMonthDay: {
                                $dateToString: {
                                    format: "%Y-%m-%d",
                                    date: "$createdAt"
                                }
                            }
                        }
                    }, {
                        $group: {
                            _id: "$yearMonthDay",
                            "count": {
                                $sum: 1
                            }
                        }
                    }];
                    let responseData = await post.getAggregate(criteria);
                    responseData.forEach(elem => {
                        countsData[elem['_id']] = elem.count;
                    });
                    break;
                default:
                    countsData = {
                        positive: 2410,
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

    async twitterProfile(req, res) {
        try {

            const user = new User()
            let data = await user.get({
                _id: req.user._id
            });
            if (data.length == 0) {
                throw new Error("No email exists");
            } else {
                let username = data[0]['twitter']['screenName'];
                const tw = new TwitterWrapper(data[0]['twitter']['oAuthToken'], data[0]['twitter']['oAuthTokenSecret']);
                let profile = await tw.getProfile(username);


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
        } catch (error) {
            console.log(error.message)
            super.failure(req, res, {
                statusCode: 400,
                message: error.message
            })
        }
    }


}

export default new Twitter();
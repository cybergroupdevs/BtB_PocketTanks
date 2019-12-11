import AppController from './app';
import Post from '../models/post';
import User from '../models/user';
import Worker from '../../wrappers/workers/workers';


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

        const _createCriteriaTimeSeries = (sentiment, userId) => {
            return [{
                $match: {
                    parentId: {
                        $eq: null
                    },
                    sentiment: sentiment,
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
        };

        try {
            console.log('this', this);
            const post = new Post();

            let countsData = {
                'positive': {},
                'negative': {}
            };
            const userId = req.user._id;

            switch (req.query.type) {
                case 'average':
                    countsData = {
                        positive: 240,
                        negative: 120
                    };
                    break;
                case 'timeseries':
                    // Getting positive sentiment posts, i.e. Sentiment = 1
                    (await post.getAggregate(_createCriteriaTimeSeries(1, userId))).forEach(elem => {
                        countsData['positive'][elem['_id']] = elem.count;
                    });;
                    // Getting negative sentiment posts, i.e. Sentiment = 0
                    (await post.getAggregate(_createCriteriaTimeSeries(0, userId))).forEach(elem => {
                        countsData['negative'][elem['_id']] = elem.count;
                    });;

                    break;
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
                });
            }
        } catch (error) {
            console.log(error.message)
            super.failure(req, res, {
                statusCode: 400,
                message: error.message
            });
        }
    }

    async profileStats(req, res) {
        try {

            const post = new Post();

            let data = await post.getAggregate([{
                $match: {
                    userId: mongoose.Types.ObjectId(req.user._id)
                }
            }, {
                $project: {
                    month: {
                        $dateToString: {
                            format: "%Y-%m",
                            date: "$createdAt"
                        }
                    }
                }
            }, {
                $group: {
                    _id: "$month",
                    sumFavoriteCount: {
                        $sum: "$favoriteCount"
                    },
                    sumCommentCount: {
                        $sum: "$commentCount"
                    },
                    sumRetweetCount: {
                        $sum: "$retweetCount"
                    }
                }
            }]);

            data.forEach(elem => {
                elem['month'] = elem['_id'];
                delete elem["_id"];
            });

            super.success(req, res, {
                statusCode: 200,
                message: "OK",
                data: data
            });
        } catch (error) {
            console.log(error.message)
            super.failure(req, res, {
                statusCode: 400,
                message: error.message
            });
        }
    }
}

export default new Twitter();
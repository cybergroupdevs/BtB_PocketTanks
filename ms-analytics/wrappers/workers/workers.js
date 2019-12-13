import Queue from 'bull';
import TwitterWrapper from '../twitter/twitter';
import Post from '../../src/models/post';
import User from '../../src/models/user';
import HttpWrapper from '../httpwrapper'
let saveCommentQueue = new Queue('Save Comment Queue', 'redis://127.0.0.1:6379');

let updateUserWordsCloudQueue = new Queue('Update User Word Cloud', 'redis://127.0.0.1:6379');
let saveSentimentsQueue = new Queue('Save Sentiment Queue', 'redis://127.0.0.1:6379');
import mongoose from 'mongoose';

saveCommentQueue.process(async (job) => {
    try {
        const tw = new TwitterWrapper(job['data']['accessToken'], job['data']['accessTokenSecret']);
        const response = await tw.fetchComments(job['data']['userName']);
        const comments = [];
        console.log('[WORKER.JS] STARTING WORKER');
        if (response && Array.isArray(response) && response.length) {
            response.forEach((res) => {
                comments.push({
                    text: res['text'] ? res['text'] : '',
                    source: res['source'],
                    location: res['location'] ? res['location'] : '',
                    sentiment: 0,
                    parentId: null,
                    userId: mongoose.Types.ObjectId(job['data']['userId']),
                    commentCount: (res['comments'] && res['comments'].length) ? res['comments'].length : 0,
                    createdAt: new Date(res['created_at']),
                    twitterPostId: res['id'] ? res['id'].toString() : "",
                    favoriteCount: res['favorite_count'],
                    retweetCount: res['retweet_count']
                })
                if (res['comments'] && Array.isArray(res['comments']) && res['comments'].length) {
                    res['comments'].forEach((comment) => {
                        comments.push({
                            text: comment['text'] ? comment['text'] : '',
                            source: res['source'],
                            location: comment['location'] ? comment['location'] : '',
                            sentiment: 0,
                            parentId: res['id'],
                            userId: mongoose.Types.ObjectId(job['data']['userId']),
                            commentCount: 0,
                            createdAt: new Date(comment['createdt_at']),
                            twitterPostId: comment['id'] ? comment['id'].toString() : "",
                            favoriteCount: comment['favorite_count'],
                            retweetCount: comment['retweet_count']
                        })
                    })
                }
            })
            console.log('[WORKER.JS] WORKER DONE');
            await (new Post()).bulkInsert(comments);
            const worker = new Workers();
            console.log(1234)
            worker.fetchWordsCloud(job['data']['userId'], comments);
            worker.saveSentiments(job['data']['userId'], comments);
        } else {
            console.log('[WORKER.JS] WORKER DONE');
            return comments;
        }
    } catch (error) {
        throw new Error(error.message);
    }
})
updateUserWordsCloudQueue.process(async (job) => {
    try {
        console.log("Start Word  Cloud WORKER")
        let commentText = job['data']['comments'].map((com) => {
            return com['text']
        });
        const url = 'http://139.59.15.204:5000/api/ml/v0.1/wordcloud';
        const httpWrapper = new HttpWrapper()
        let response = await httpWrapper.postRequest(url, null, {
            "data": {
                "sentences": commentText
            }
        });
        console.log(response['body'])
        const user = new User();
        if (response && response['body'] && response['body']['data'] && Array.isArray(response['body']['data']) && response['body']['data'].length) {
            await user.update({
                "_id": job['data']['userId']
            }, {
                "$set": {
                    "wordCloud": response['body']['data']
                }
            });
        }
        console.log("Finish Word  Cloud WORKER")
        return 1;
    } catch (error) {
        throw new Error(error.message);
    }
})
saveSentimentsQueue.process(async (job) => {
    try {
        console.log("Start Save Sentiment WORKER")
        let commentText = job['data']['comments'].map((com) => {
            return com['text']
        })
        const url = 'http://139.59.15.204:5000/api/ml/v0.1/sentiment';
        const httpWrapper = new HttpWrapper()
        let response = await httpWrapper.postRequest(url, {
            'Content-Type': 'application/json'
        }, {
            "data": {
                "sentences": commentText
            }
        });
        if (response && response['body'] && response['body']['data'] && Array.isArray(response['body']['data']) && response['body']['data'].length) {
            let count = 0
            let sentiments = response['body']['data']
            const post = new Post()
            job['data']['comments'].forEach(async (comment) => {
                console.log("count:" + count)
                let s = 0;
                if (sentiments[count]['sentiment'] == 'Positive') {
                    s = 1;
                }
                count = count + 1;
                await post.update({
                    "twitterPostId": comment['twitterPostId']
                }, {
                    "$set": {
                        "sentiment": s
                    }
                })

            })
        }
        console.log("Finish Save Sentiment WORKER")
        return 1;
    } catch (error) {
        throw new Error(error.message);
    }
})
class Workers {
    constructor() {
        //intilize
    }
    async saveComment(userName, userId, accessToken, accessTokenSecret) {
        await saveCommentQueue.add({
            userName: userName,
            userId: userId,
            accessToken: accessToken,
            accessTokenSecret: accessTokenSecret
        });
    }
    async fetchWordsCloud(userId, comments) {
        await updateUserWordsCloudQueue.add({
            userId: userId,
            comments: comments
        })
    }
    async saveSentiments(userId, comments) {
        await saveSentimentsQueue.add({
            userId: userId,
            comments: comments
        })
    }
}
export default Workers;
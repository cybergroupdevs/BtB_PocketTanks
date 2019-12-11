import Queue from 'bull';
import TwitterWrapper from '../twitter/twitter';
import Post from '../../src/models/post';
let saveCommentQueue = new Queue('Save Comment Queue', 'redis://127.0.0.1:6379');
import mongoose from 'mongoose';

saveCommentQueue.process(async (job) => {
    try {
        const tw = new TwitterWrapper();
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
                    twitterPostId: res['id'],
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
                            twitterPostId: comment['id'],
                            favoriteCount: comment['favorite_count'],
                            retweetCount: comment['retweet_count']
                        })
                    })
                }
            })
            console.log("comments length:" + comments.length)
            console.log('[WORKER.JS] WORKER DONE');
            await (new Post()).bulkInsert(comments);
        } else {
            console.log('[WORKER.JS] WORKER DONE');
            return comments;
        }
    } catch (error) {
        throw new Error(error.message);
    }
})
class Workers {
    constructor() {
        //intilize
    }
    async saveComment(userName, userId) {
        await saveCommentQueue.add({
            userName: userName,
            userId: userId
        });
    }
}
export default Workers;
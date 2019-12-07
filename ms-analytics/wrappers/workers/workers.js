import Queue from 'bull';
import TwitterWrapper from '../twitter/twitter';
import Post from '../../src/models/post';
let saveCommentQueue = new Queue('Save Comment Queue',  'redis://127.0.0.1:6379');

saveCommentQueue.process((job) => {
    try{
        const tw = new TwitterWrapper(job['access_token'], job['access_token_secret']);
        const response = tw.fetchComments(job['userName']);
        const comments = [];
        if(response && Array.isArray(response) && response.length){
            response.forEach((res) => {
                if(res['comments'] && Array.isArray(res['comments']) && res['comments'].length){
                    comments.push({
                        text: res['text'] ? res['text'] : '',
                        source: res['source'],
                        location: res['location'] ? res['location'] : '',
                        sentiment: 0,
                        parentId: null,
                        userId: '',
                        commentCount: (res['comments'] && res['comments'].length)? res['comments'].length : 0,
                        createdAt: new Date(res['created_at']),
                        twitterPostId: res['id'],
                        favoriteCount: res['favorite_count'],
                        retweetCount: res['retweet_count']
                    })
                    res['comments'].forEach((comment) => {
                        comments.push({
                            text: comment['text'] ? comment['text'] : '',
                            source: res['source'],
                            location: comment['location'] ? comment['location'] : '',
                            sentiment: 0,
                            parentId: res['id'],
                            userId: comment['userId'],
                            commentCount: 0,
                            createdAt: new Date(comment['createdt_at']),
                            twitterPostId: comment['id'],
                            favoriteCount: comment['favorite_count'],
                            retweetCount: comment['retweet_count']
                        })
                    })
                }
            })
            Post.bulkInsert(comments);
        }
        else{
            return comments;
        }
    }
    catch(error){
        throw new Error(error.message);
    }
})
class Workers {
    constructor(){
        //intilize
    }
    saveComment(userName='tp_taran', access_token, access_token_secret, userId = null) {
        saveCommentQueue.add({ userName: userName, access_token: access_token, access_token_secret: access_token_secret});
    }
}
export default Workers;
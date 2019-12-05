import Twit from 'twit';

class TwitterWrapper {
    constructor(){
        this.twit = new Twit({
            consumer_key: 'lW47S9ha17CqtimCJMOJyt1Rq',
            consumer_secret: 'IdiRMbcvyI5iiW851EPduOtXoXXO555YqX3K3bMgCvjNaAQ1cJ',
            access_token: '734237523925454848-HbznrQcFNbclbMAlNGXEp2101zhE5qe',
            access_token_secret: '6tnjOuwNM6VJxaMyfuUPxnqPyLHivZkiMnDkwwEL9fJYL',
        });
    }
    async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }
    containsObject(obj, list) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === obj.id) {
                return true;
            }
        }
        return false;
    }
    formatTweet(tweet) {
        // console.log(JSON.stringify(tweet))
        let responseTweet = {};
        responseTweet['id'] = tweet['id'];
        responseTweet['text'] = tweet['text'];
        responseTweet['source'] = tweet['source'];
        responseTweet['created_at'] = tweet['created_at'];
        responseTweet['location'] =  tweet['user']['location'] ? tweet['user']['location'] : null,
        responseTweet['favorite_count'] = tweet['favorite_count']
        responseTweet['retweet_count'] = tweet['retweet_count']
        responseTweet['userId'] = tweet['user']['id_str']
        return responseTweet;
    }
    async fetchComments(userName) {
        try{
            const count = 20;
            const responseData = [];
            const parentTweets = [];

            let data = [];
            let lastPostId = "";

            const result = await this.twit.get('statuses/user_timeline', {screen_name: userName, count: count})
            if(result.data.length){
                data = result.data
            }
            const twtWrapper = new TwitterWrapper()
            data.forEach(tweet => {
                if (tweet.in_reply_to_status_id_str) {} else {
                    if (tweet.text.includes("RT")) {} else {
                        if (twtWrapper.containsObject(tweet, parentTweets)) {} else {
                            parentTweets.push(tweet);
                        }
                    }
                }
            });
            
            await twtWrapper.asyncForEach(parentTweets, async (tweet) => {
                const query = "to:" + tweet.user.screen_name;
                const sinceID = tweet.id;
                const commentsArray = [];
                let responseTweet = null;
        
                let tempComments = await this.twit.get('search/tweets', {
                    q: query,
                    sinceID: sinceID
                });
        
                tempComments = tempComments.data.statuses;
        
                tempComments.forEach(comment => {
                    if (comment.in_reply_to_status_id == sinceID) {
                        commentsArray.push(twtWrapper.formatTweet(comment));
                    }
                });
        
                responseTweet = twtWrapper.formatTweet(tweet);
                responseTweet['comments'] = commentsArray;
        
                responseData.push(responseTweet);
            });
            return responseData;

        }
        catch(error){
            throw new Error(error.message);
        }
    }
}

export default TwitterWrapper;
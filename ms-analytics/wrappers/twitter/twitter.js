import Twit from 'twit';
import envs from '../../src/utils/config';
import fs from 'fs'


class TwitterWrapper {
    constructor(accessToken, accessTokenSecret) {
        this.twit = new Twit({
            consumer_key: String(process.env.OAUTH_CONSUMER_KEY),
            consumer_secret: String(process.env.OAUTH_CONSUMER_SECRET),
            access_token: accessToken, //'734237523925454848-HbznrQcFNbclbMAlNGXEp2101zhE5qe',
            access_token_secret: accessTokenSecret //'6tnjOuwNM6VJxaMyfuUPxnqPyLHivZkiMnDkwwEL9fJYL',
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
        let responseTweet = {};
        responseTweet['id'] = tweet['id'];
        responseTweet['text'] = tweet['text'];
        responseTweet['source'] = tweet['source'];
        responseTweet['created_at'] = tweet['created_at'];
        responseTweet['location'] = tweet['user']['location'] ? tweet['user']['location'] : null,
            responseTweet['favorite_count'] = tweet['favorite_count']
        responseTweet['retweet_count'] = tweet['retweet_count']
        responseTweet['userId'] = tweet['user']['id_str']
        return responseTweet;
    }
    async fetchComments(userName) {
        try {
            const count = 20;
            const responseData = [];
            const parentTweets = [];

            let data = [];
            let lastPostId = "";
            const result = await this.twit.get('statuses/user_timeline', {
                screen_name: userName,
                count: count
            })
            if (result.data.length) {
                data = result.data
            }
            data.forEach(tweet => {
                if (tweet.in_reply_to_status_id_str) {} else {
                    if (tweet.text.includes("RT")) {} else {
                        if (this.containsObject(tweet, parentTweets)) {} else {
                            parentTweets.push(tweet);
                        }
                    }
                }
            });

            await this.asyncForEach(parentTweets, async (tweet) => {
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
                        commentsArray.push(this.formatTweet(comment));
                    }
                });

                responseTweet = this.formatTweet(tweet);
                responseTweet['comments'] = commentsArray;

                responseData.push(responseTweet);
            });
            return responseData;

        } catch (error) {
            throw new Error(error.message);
        }
    }
    async getProfile(userName) {
        try {
            const result = await this.twit.get('statuses/user_timeline', {
                screen_name: userName,
                count: 1
            })
            if (result.data && result.data.length) {
                return result.data[0]['user']
            } else {
                return null;
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }
    async postTweet(tweet){
        try{
            const result = await this.twit.post('statuses/update',{status : tweet})
            if(result.data){
                return result.data
            } else {
                return null
            }
        } catch (error){
            throw new Error(error.message)
        }
    }
    async postMediaTweet(tweet,media){
        try{
            let base64String = media;
            let base64Image =  base64String.split(';base64,').pop();
            
            let result =await this.twit.post('media/upload',{ media_data: base64Image })
            
            if (result.data){
                
                let mediaIdStr = result.data.media_id_string;
                let altText = "uploaded using socialize";
                let meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

                await this.twit.post('media/metadata/create', meta_params)
                
                let params = { status: tweet, media_ids: [mediaIdStr] }
                result = await this.twit.post('statuses/update', params)
                
                if(result.data){
                    return result.data
                } else {
                    return null
                }
            
            } else {
                return null
            }
        } catch(error) {
            throw new Error(error.message)
        } 
    }
}

export default TwitterWrapper;

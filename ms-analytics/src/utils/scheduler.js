import TwitterWrapper from '../../wrappers/twitter/twitter'
import cron from 'cron' 
import ScheduledPost from "../models/scheduledPost"
import User from "../models/user"

const CronJob = cron.CronJob;

new CronJob('*/1 * * * *',async () => {

let requiredTweets = await TweetsToPost();

if(requiredTweets.length != 0)
{
    requiredTweets.forEach( async tweetsToPost => {
        
        //getting user auth tokens
        const user = new User();
        let data = await user.get({_id : tweetsToPost.userId})
        const tw = new TwitterWrapper(data[0]['twitter']['oAuthToken'], data[0]['twitter']['oAuthTokenSecret'])
     
        let postedTweet;
        if(tweetsToPost.containsMedia)
            {
                postedTweet = await tw.postMediaTweet(tweetsToPost.status,tweetsToPost.mediaPath);
                if(postedTweet){
                    console.log("media tweet posted");
                }
            }
        else
            {
                postedTweet = await tw.postTweet(tweetsToPost.text);
                if(postedTweet){
                    console.log("tweet posted");
                }
            }

        });
    }
}, null,true);

//#region [ function to get array of tweet to be posted in next min ]

async function TweetsToPost(){
    
    const scheduledPost = new ScheduledPost();
    // let timeNow = 1575884189010;
    let timeNow = new Date().getTime(); 
    let timeAfterAMinute = timeNow + 1 * 60 * 1000;

    //finding the required tweets
    let result = await scheduledPost.get({postTime : { "$gte": timeNow, "$lte": timeAfterAMinute }, isScheduled: true});
    if(result.data){
        return result.data
    } else {
        return null
    }
}
//#endregion
  
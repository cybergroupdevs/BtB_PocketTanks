import mongoose from 'mongoose';

const schemas = {
    users: {
        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
            required: true
        },
        fullName: {
            type: String,
            trim: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        twitter: {
            oAuthToken: {
                type: String
            },
            oAuthTokenSecret: {
                type: String
            },
            screenName: {
                type: String
            },
            profileImage:{
                type:String
            },
            backgroundImage:{
                type:String
            },
            followersCount:{
                type:Number
            },
            followingCount:{
                type:Number
            },
            name:{
                type:String
            },
            description:{
                type:String
            },
            statusesCount:{
                type:Number
            },
            createdAt:{
                type:Date
            }

        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        emailVerified: {
            type: Boolean
        },
        previousPassword: {
            type: String
        },
        passwordChangeAt: {
            type: String
        },
        emailToken: {
            type: String
        },
        passwordToken: {
            type: String
        },
        sentiments: [],
        wordCloud: []
    },
    posts: {
        text: {
            type: String
        },
        source: {
            type: String
        },
        location: {
            type: String
        },
        sentiment: {
            type: Number
        },
        parentId: {
            type: String,
            default: null
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        commentCount: {
            type: Number,
            default: 0
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        twitterPostId: {
            type: String,
            default: null,
            unique: true,
            index: true,
            required: true
        },
        favoriteCount: {
            type: Number,
            default: 0
        },
        retweetCount: {
            type: Number,
            default: 0
        }
    },

}
export default {
    dbSchema: schemas
}
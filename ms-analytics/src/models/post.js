import mongoose from 'mongoose';
import BaseModel from './base';
import schema from './schemas/schema';

const postSchema = new mongoose.Schema(schema.dbSchema.posts);

class Post extends BaseModel {
    constructor() {
        super(mongoose.model("Post", postSchema));
    }

    likesCount(userId) {
        return 0;
    }

    commentsCount(userId) {
        return 0;
    }

    postsCount(userId) {
        return 0;
    }

}

export default Post;
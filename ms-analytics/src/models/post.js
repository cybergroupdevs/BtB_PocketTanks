import mongoose from 'mongoose';
import BaseModel from './base';
import schema from './schemas/schema';

const postSchema = new mongoose.Schema(schema.dbSchema.posts);

class Post extends BaseModel {
    constructor() {
        super(mongoose.model("Post", postSchema));
    }

    async getCount(criteria) {
        return await this.model.countDocuments(criteria);
    };
};

export default Post;
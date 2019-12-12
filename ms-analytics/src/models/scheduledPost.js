import mongoose from 'mongoose';
import BaseModel from './base';
import schema from './schemas/schema';

const scheduledPost = new mongoose.Schema(schema.dbSchema.scheduledPost);

class ScheduledPost extends BaseModel {
    constructor() {
        super(mongoose.model("scheduledPost", scheduledPost));
    }

    async getCount(criteria) {
        return await this.model.countDocuments(criteria);
    };
};

export default ScheduledPost;
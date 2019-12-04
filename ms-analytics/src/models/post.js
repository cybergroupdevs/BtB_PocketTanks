import mongoose from 'mongoose';
import BaseModel from './base';
import schema from './schemas/schema';

const postSchema = new mongoose.Schema(schema.dbSchema.posts);

class Post extends BaseModel {
    constructor(){
        
    }
}
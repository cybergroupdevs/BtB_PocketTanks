import mongoose from 'mongoose';
import BaseModel from './base';
import schema from './schemas/schema';

const userSchema = new mongoose.Schema(schema.dbSchema.users);

class User extends BaseModel {
    constructor(){
        super(mongoose.model("User", userSchema));
    }
}

export default User;
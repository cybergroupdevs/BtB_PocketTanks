import mongoose from 'mongoose';
import BaseModel from './base';
import schema from './schemas/schema';

const userSchema = new mongoose.Schema(schema.dbSchema.users);

userSchema.post('save', function (error, doc, next) {
    if (err.name === 'BulkWriteError' && error.code === 11000) 
        next(new Error('Email already exists !'));
    else next(error);
});

class User extends BaseModel {
    constructor() {
        super(mongoose.model("User", userSchema));
    }
    parseUser(user, token) {
        let obj = {
            userId: user._id,
            fullName: user.fullName,
        }
        if (token) {
            obj['token'] = token
        }
        return obj
    }

}

export default User;
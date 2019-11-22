const mongoose = require('mongoose');


const schemas= {
    users: {
        email: {
          type: String,
          unique:true,
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
        createdAt: {
          type: String,
          default: Date.now
        },
        emailVerified:{
          type:Boolean
        }
      }
}

module.exports.dbSchema = schemas;
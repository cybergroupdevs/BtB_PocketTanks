const mongoose = require("../db/mongoose");
const schema = require("./schema/schema");



UserSchema = new mongoose.Schema(schema.dbSchema['users']);

// UserSchema.methods = {
//     comparePassword: function (password) {
//       return bcrypt.compareSync(password, this.hashPassword);
//     }
//   }

const User = mongoose.model('User', UserSchema)

module.exports = User
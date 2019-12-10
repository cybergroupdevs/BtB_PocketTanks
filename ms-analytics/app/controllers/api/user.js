const bcrypt = require('bcrypt')
const User = require('../../models/user')
const jwt = require("jsonwebtoken")

const users = {
  registration: function(req, res) {

    let new_user = {
      email: req.body.email,
      fullName: req.body.fullName,
      password: bcrypt.hashSync(req.body.password, 10),
      emailVerified: req.body.emailVerified
    };

    try {

      User.model('User').create(new_user).then((user) => {
        console.log(user)
        res.status(200).send(user)
      })
    } catch (e) {
      console.log(e)
    } finally {
      console.log("Final Statement")
    }
  },

  login: function(req, res) {

    const user = new User(req.body)
    console.log(1)
    user.model('User').find({
      'email': req.body.email
    }).then(async data => {
      console.log(data)

      if (data.length == 0) {
        await res.status(401).send("No email exists in Database")
      } else {
        const isMatched = await bcrypt.compare(req.body.password, data[0].password)
        console.log(isMatched)
        if (!isMatched) {
          await res.status(401).send("Password is incorrect")
        } else {
          const token = jwt.sign({
            '_id': data[0]['_id']
          }, 'authenticate')
          data_obj = data[0].toJSON()
          delete data_obj['password']
          delete data_obj['email']
          delete data_obj['emailVerified']
          delete data_obj['createdAt']
          await res.status(200).send({
            data_obj,
            token
          })
        }
      }
    })
  }
}

module.exports = users
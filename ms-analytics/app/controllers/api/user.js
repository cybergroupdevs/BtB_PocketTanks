const bcrypt = require('bcrypt')
const User = require('../../models/user')
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer");
const userwrapper = require('../../wrappers/userwrapper')

const users = {
  registration: function(req, res) {

<<<<<<< HEAD

var regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

const users = {

    sendEmail: async function (req, res) {
      
        const user = new User(req.body)
        const token= jwt.sign({
            data: req.body.email
          }, 'authenticateRegistration', { expiresIn: 60 * 60 });

        user.model('User').find({ 'email': req.body.email }).then(data => {
            
            if (data.length != 0 && data[0]['emailVerified']==false)  {
                
                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    host: "smtp.gmail.com",
                    secureConnection: true,
                    auth: {
                        user: "neerajaggrwal@gmail.com",
                        pass: "Sports@111"
                    }
                });

                let message = {
                    from: "neerajaggrwal@gmail.com",
                    to: req.body.email,
                    subject: "test mail",
                    text: " Hello, Please click http://localhost:4200/verfication/" + token + " to verify your account.",
                    dsn: {
                        id: '123',
                        return: 'headers',
                        notify: ['failure', 'delay'],
                        recipient: req.body.email
                    }
                }
                transporter.sendMail(message, (err, info) => {
                    if (err) {
                        
                        console.log(err)
                        res.send(err)
                    }
                    else {
                        user.model('User').update({'email':req.body.email}, {$set:{'emailToken':token}}).then(data=>{
                            if(data){
                                res.status(200).send({
                                    status: 200,
                                    message: message.text
                                })
                            }
                            else{
                                res.status(400).send({
                                    status: 400,
                                    message: "Token is not updated in DB"
                                })
                            }
                        })
                        
                        

                    }
                   
                });
            }
            else if(data[0]['emailVerified']==true){
                res.status(400).send({
                    status: 400,
                    message: "User is already verified"
                })
            }
            else {
               
                res.status(400).send({
                    status: 400,
                    message: "User is already registered"
                })
            }
        })

    },

    emailVerification: async function (req, res) {
        const user = new User(req.body)
        const date= new Date()
        
        jwt.verify(req.body.token, 'authenticateRegistration', (err,response)=>{
            if(err){
                console.log("my err",err.message)
                
                res.status(400).send({
                    status: 400,
                    message: "Token is expired or invalid signature"
                })
            }
            else{
                user.model('User').find({ 'email': req.body.email }).then( async data => {
                    console.log(data)
                    
                    if (data.length != 0 && data[0]['emailVerified'] == false && data[0]['emailToken']==req.body.token) {
                            
                            
                            if(req.body.emailVerified == "true"){ 
                                user.model('User').update({'email':req.body.email}, {$unset:{'emailToken':1}}).then(data=>{

                                })
                                 user.model('User').update({ 'email': req.body.email }, { $set: { 'emailVerified': true, 'createdAt':date.getTime()}  }).then( async data => {
                                console.log(data)
                                await res.status(200).send({
                                    status: 200,
                                    message: "User is verified and database is updated"
                                })
                            })
                            }
                            else {
                                await res.status(400).send({
                                    status: 400,
                                    message: "Email is not verified"
                                })
                            }     
                    }
                    else if(data.length!=0 && data[0]['emailVerified']==true){
                        await res.status(400).send({
                            status: 400,
                            message:"Email is already verified"
                        })
                    }
                    else if(data.length!=0 && data[0]['emailVerified']==false && data[0]['emailToken']!=req.body.token){
                        await res.status(400).send({
                            status: 400,
                            message:"Email Token is incorrect"
                        })
                    }
                    
                    else if(data.length==0){
                        await res.status(400).send({
                            status: 400,
                            message:"Data not found in DB"
                        })
                    }
                    
        
                })
            }
        })
    },
    registration: async function (req, res) {

        const user = new User(req.body)

        var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
        if (req.body.email == '' || req.body.fullName == '' || req.body.password == '') {
            res.status(400).send({
                status: 400,
                message: "There is null value in one of the fields"
            })
        }
        else if (req.body.password.length < 6 || regex.test(req.body.password) == false) {
            res.status(400).send({
                status: 400,
                message: "Password must contain only Alpha numeric characters, minimum of 6 characters long and must contain 1 uppercase,1 lower case character and 1 special character"
            })
        }
        else if (/\d/.test(req.body.fullName)) {
            res.status(400).send({
                status: 400,
                message: "Name field is having numbers in it"
            })
        }
        else if (emailRegex.test(req.body.email) == false) {
            res.status(400).send({
                status: 400,
                message: "Email is invalid"
            })
        }



        else {

            let new_user =
            {
                email: req.body.email,
                fullName: req.body.fullName,
                password: bcrypt.hashSync(req.body.password, 10),
                previousPassword: req.body.previousPassword,
                emailVerified: req.body.emailVerified

            };

            console.log(new_user)
            user.model('User').find({ 'email': req.body.email }).then(data => {
                if (data.length == 0) {
                    user.model('User').create(new_user, (err, result) => {

                        if (err) {
                            res.status(400).send({
                                status: 400,
                                message: "User already exists in database"
                            })
                        }
                        else {
                            res.status(200).send({
                                status: 200,
                                message: "User is registered successfully"
                            })
                        }

                    })
                }
                else {
                    res.status(400).send({
                        status: 400,
                        message: "User already exists in database"
                    })
                }
            })


        }

    },

    login: async function (req, res) {

        const user = new User(req.body)

        user.model('User').find({ 'email': req.body.email }).then(async data => {


            if (data.length == 0) {
                await res.status(401).send({
                    status:401,
                    message:"No email exists in Database"
                })
                return userwrapper.response("", false, 401, "No email exists in Database", "")
                

            }
            else if(data.length!=0 && data[0]['emailVerified']==false){
                await res.status(400).send({ 
                    status:400,
                    message:"User's email is not verfified yet"
                 })
            }  
            else {
                const isMatched = await bcrypt.compare(req.body.password, data[0].password)

                if (isMatched == false) {
                    await res.status(401).send("Password is incorrect")
                    return userwrapper.response("", false, 401, "Password is incorrect", "")
                    
                }
                else {
                    const token = jwt.sign({ '_id': data[0]['_id'] }, 'authenticate')
                    data_obj = data[0].toJSON()
                    delete data_obj['password']
                    delete data_obj['email']
                    delete data_obj['emailVerified']
                    delete data_obj['previousPassword']
                    delete data_obj['createdAt']
                    await res.status(200).send({
                        status:200,
                        data: data_obj,
                        token: token,
                        message:"User has logged in successfully"
                    })
                    return userwrapper.response("", true, 200, "", { data_obj, token })

                }
            }



        })

    },
    forgotPassword: async function (req, res) {
        const user = new User(req.body)

        const token= jwt.sign({
            data: req.body.email
          }, 'authenticate', { expiresIn: 60 * 60 });
        
       
        user.model('User').find({ 'email': req.body.email }).then(data => {
            
            if (data.length != 0 && data[0]['emailVerified']==true) {
                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    host: "smtp.gmail.com",
                    secureConnection: true,
                    auth: {
                        user: "neerajaggrwal@gmail.com",
                        pass: "Sports@111"
                    }
                });

                let message = {
                    from: "noreply.com",
                    to: req.body.email,
                    subject: "Change Passwords",
                    text: "Please click on link https:localhost:4200/changepassword/"+token+" for password change. The link will be valid for 30 minutes only.",

                    dsn: {
                        id: '123',
                        return: 'headers',
                        notify: ['failure', 'delay'],
                        recipient: req.body.email
                    }
                }
                transporter.sendMail(message, (err, info) => {
                    if (err) {
                        res.status(400).send({
                            status: 400,
                            message: err
                        })
                    }
                    else {
                        user.model('User').update({'email':req.body.email}, {'passwordToken':token}).then(data=>{
                            if(data){
                                res.status(200).send({
                                    status: 200,
                                    token:req.body.token,
                                    URL: message.text,
                                    message: "Forgot password link has been sent"
        
                                })
                            }
                            else{
                                res.status(400).send({
                                    status: 400,
                                    message: "Forgot password link has not been sent"
        
                                })
                            }
                        })
                       
                        
                    }
                   
                });

            }
            else if(data.length != 0 && data[0]['emailVerified']==false){
                res.status(400).send({
                    status: 400,
                    message: "User's email is not verified yet"
                })
            }
            else if(data.length == 0 ) {
                res.status(400).send({
                    status: 400,
                    message: "no email exists is database"
                })
            }
        })

    },
    forgotPasswordChanged: async function (req,res){
        const user = new User(req.body)
        const date= new Date()
       // let k= users.forgotPassword.token
        jwt.verify(req.body.token, 'authenticate',  (err,response)=>{
            if(err){
                console.log("my err",err.message)
                
                res.status(400).send({
                    status: 400,
                    message: "Token is expired or invalid signature"
                })
            }
            else{
                console.log("my res",response)
                user.model('User').find({'email':req.body.email}).then(async data=>{
                    const isMatched = await bcrypt.compare(req.body.newPassword, data[0].password)
                    console.log(isMatched)
                    if(data.length!=0 && req.body.newPassword.length>6 && regex.test(req.body.newPassword) == true && isMatched==false){
                            hashednewPassword = bcrypt.hashSync(req.body.newPassword, 10);
                            
                           user.model('User').update({'email':req.body.email}, { $unset:{'passwordToken':1}}).then(data=>{
                              
                             
                           })
                          
                            user.model('User').update({ 'email': req.body.email }, { $set: { 'previousPassword':data[0]['password'], 'password': hashednewPassword, 'passwordChangeAt': date.getTime() } }).then(data => {
                                console.log(data)
                                res.status(200).send({
                                    status: 200,
                                    message: "Password is changed and database is updated"
                                })

                            });
        
                    }
                    else if(data.length==0){
                        res.status(400).send({
                            status: 400,
                            message: "User not found"
                        })
                    }
                    else if(regex.test(req.body.newPassword) == false){
                        res.status(401).send({
                            status: 401,
                            message:"Password must contain only Alpha numeric characters, minimum of 6 characters long and must contain 1 uppercase,1 lower case character and 1 special character"
                        })
                    }
                    else if(req.body.newPassword.length<6){
                        res.status(401).send({
                            status: 401,
                            message:"Password should be atleast minimun of 6 characters"
                        })
                    }
                    else if(isMatched==true){
                        res.status(400).send({
                            status: 400,
                            message:"New Password and old password is same"
                        })
                    }
                })
            }
            
        })
        
    
        
       
     
    },
    changePassword: async function (req, res) {
        const user = new User(req.body)

        console.log(req.body)

        user.model('User').find({ 'email': req.body.email }).then(async data => {
            console.log(data)
            console.log(req.body.oldPassword)
            console.log(data[0].password)
            if (data.length != 0) {
                const isMatched = await bcrypt.compare(req.body.oldPassword, data[0].password)

                if (isMatched && req.body.newPassword.length > 6 && regex.test(req.body.newPassword) == true && req.body.oldPassword != req.body.newPassword) {
                    console.log("matched")
                    data[0]['previousPassword'] = req.body.oldPassword;
                    hashednewPassword = bcrypt.hashSync(req.body.newPassword, 10);
                    hashedoldPassword = bcrypt.hashSync(req.body.oldPassword, 10);

                    user.model('User').update({ 'email': req.body.email }, { $set: { 'previousPassword': hashedoldPassword, 'password': hashednewPassword } }).then(data => {
                        console.log(data)
                    });
                    console.log(data)
                    res.status(200).send({
                        status: 200,
                        message: "Password is changed"
                    })
                }
                else if(!isMatched) {
                    res.status(400).send({
                        status: 400,
                        message: "Password is not matched with the old Password"
                    })
                }
                else if(req.body.newPassword.length < 6 || regex.test(req.body.newPassword) == false ){
                    res.status(400).send({
                        status: 400,
                        message: "Password must contain only Alpha numeric characters, minimum of 6 characters long and must contain 1 uppercase,1 lower case character and 1 special character"
                    })
                }
            }
            else if(data.length==0){
                res.status(400).send({
                    status: 400,
                    message: "User not found"
                })
            }
        })

=======
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
>>>>>>> 32c12b7a405d81439f732feb5acd42dd2d692516
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

<<<<<<< HEAD
module.exports = users
=======
module.exports = users
>>>>>>> 32c12b7a405d81439f732feb5acd42dd2d692516

import  AppController  from './app.js'
import User from '../models/user';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
<<<<<<< HEAD
=======
import Mailer from '../../wrappers/mailer/mailer'
>>>>>>> 96f791d62ea94c3d110c80004cf2b07bae51db59
/**
 * The App controller class where other controller inherits or
 * overrides pre defined and existing properties
 */
class Users extends AppController{

    constructor(){
        super();
    }
    async registration(req, res) {
        try{
            let new_user = {
                email: req.body.email,
                fullName: req.body.fullName,
                password: bcrypt.hashSync(req.body.password, 10),
                emailVerified: req.body.emailVerified
              };
            const user = new User();
            let userObj = await user.insert(new_user);
<<<<<<< HEAD
=======
            const token = jwt.sign({data: req.body.email}, 'authenticateRegistration', {expiresIn: 60 * 60})
            const mailer = new Mailer();
            let message = '<p>Hi, </p><br/> Click below link to verify your account.<br/> https:localhost:4200/verfication/'+ token +'</br><br/><b>Note:</b>The link will be valid for 30 minutes only.<br/><br/>If you have any questions or need help, contact us at pockettanks60@gmail.com<br/><br/>Thank You for using Socialize.<br/><br/>Thanks,<br/>The Socialize Team<br/>socialize.com'
            
            mailer.sendEmail(req.body.email, "Forgot your password? Let's get you a new one.",message);
>>>>>>> 96f791d62ea94c3d110c80004cf2b07bae51db59
            super.success(req, res, {statusCode: 200, message: "", data: userObj})
        }
        catch(error){
            console.log(error.message)
            super.failure(req,res,{statusCode: 400, message: error.message})
        }
    }
    async login(req, res) {
        try{
            const user = new User()
            let data = await user.get({email: req.body.email});
            if (data.length == 0) {
<<<<<<< HEAD
                super.failure(req,res,{statusCode: 401, message: "No email exists"})
=======
                throw new Error("No email exists");
>>>>>>> 96f791d62ea94c3d110c80004cf2b07bae51db59
            }
            else{
                const isMatched = await bcrypt.compare(req.body.password, data[0].password)
                if (!isMatched) {
<<<<<<< HEAD
                    super.failure(req,res,{statusCode: 401, message: "Password is incorrect"})
=======
                    throw new Error("Password is incorrect");
>>>>>>> 96f791d62ea94c3d110c80004cf2b07bae51db59
                }
                else{
                    const token = jwt.sign({'_id': data[0]['_id']}, 'authenticate');
                    super.success(req, res, {statusCode: 200, message: "", data: user.parseUser(data[0], token)})
                }
            }
        }
        catch(error){
            super.failure(req,res,{statusCode: 400, message: error.message})
        }
    }
<<<<<<< HEAD
=======
    async forgotPassword(req, res) {
        try{
            const user = new User();
            let data = await user.get({email: req.body.email});
            console.log(data);
            if(data.length == 0){
                throw new Error("Email does not exist");
            }
            else if(data.length >0 && data[0]['emailVerified'] ==  false){
                throw new Error("User's email is not verified yet");
            }
            else{
                const token = jwt.sign({data: data[0]['email']}, 'authenticate', {expiresIn: 60 * 60})
                console.log(token)
                const mailer = new Mailer();
                let message = '<p>Hi, </p><br/>Seems like you forgot your password. Click below link to reset your password.<br/><br/><center><a href="https:localhost:4200/changepassword/'+ token +'">Reset Your Password</a></center></br><br/><b>Note:</b>The link will be valid for 30 minutes only.<br/><br/>If you have any questions or need help, contact us at pockettanks60@gmail.com<br/><br/>Thank You for using Socialize.<br/><br/>Thanks,<br/>The Socialize Team<br/>socialize.com'
                console.log(message);
                mailer.sendEmail(data[0]['email'], "Forgot your password? Let's get you a new one.",message);
                super.success(req, res, {statusCode: 200, message: "Forgot password link has been sent", data: null})
            }
        }
        catch(error){
            super.failure(req,res,{statusCode: 400, message: error.message})
        }
    }
    async forgotPasswordChanged(req, res) {
        try{
            const user = new User();
            const date = new Date();
            let jwtResponse = null;
            try{
                jwtResponse = jqt.verify(req.body.token, 'authenticate')
            }
            catch(error){
                throw new Error("Token is expired or invalid signature");
            }
            const data = await user.get({email: req.body.email})
            const isMatched = await bcrypt.compare(req.body.newPassword, data[0].password)
            if(data.length!=0 && req.body.newPassword.length>6 && regex.test(req.body.newPassword) == true && isMatched==false) {
                let hashednewPassword = bcrypt.hashSync(req.body.newPassword, 10);
                await user.update({'email':req.body.email}, { $unset:{'passwordToken':1}})
                let updatedUser = await user.update({'email': req.body.email} , {'$set': { 'previousPassword':data[0]['password'], 'password': hashednewPassword, 'passwordChangeAt': date.getTime() }})
                super.success(req, res, {statusCode: 200, message: "Password is changed and database is updated", data: updatedUser});
            }
            else{
                throw new Error("Email does not exist");
            }

        }
        catch(error){
            super.failure(req,res,{statusCode: 400, message: error.message})
        }
    }
    async changePassword(req, res) {
        try{
            const user = new User();
            const data = await user.get({email: req.body.email})
            if(data.length > 0){
                const isMatched = await bcrypt.compare(req.body.oldPassword, data[0].password);
                if (isMatched && req.body.newPassword.length > 6 && regex.test(req.body.newPassword) == true && req.body.oldPassword != req.body.newPassword) {
                    data[0]['previousPassword'] = req.body.oldPassword;
                    hashednewPassword = bcrypt.hashSync(req.body.newPassword, 10);
                    hashedoldPassword = bcrypt.hashSync(req.body.oldPassword, 10);

                    const updatedUser = await user.update({ 'email': req.body.email }, { $set: { 'previousPassword': hashedoldPassword, 'password': hashednewPassword } })
                    super.success(req, res, {statusCode: 200, message: "Password is changed", data: updatedUser});
                }
                else if(!isMatched) {
                    throw new Error("Password is not matched with the old Password");
                }
                else if(req.body.newPassword.length < 6 || regex.test(req.body.newPassword) == false ){
                    throw new Error("Password must contain only Alpha numeric characters, minimum of 6 characters long and must contain 1 uppercase,1 lower case character and 1 special character");
                }
            }
        }
        catch(error){
            super.failure(req,res,{statusCode: 400, message: error.message})
        }
    }
    async emailVerification(req, res) {
        try{
            const user = new User();
            let jwtResponse = null;
            try{
                jwtResponse = jqt.verify(req.body.token, 'authenticate')
            }
            catch(error){
                throw new Error("Token is expired or invalid signature");
            }

            const data = await user.get({email: req.body.email})
            if (data.length > 0 && data[0]['emailVerified'] == false && data[0]['emailToken']==req.body.token) {
                if(req.body.emailVerified == "true"){ 
                    await user.update({'email':req.body.email}, {$unset:{'emailToken':1}})
                    let updatedUser = await user.update({ 'email': req.body.email }, { $set: { 'emailVerified': true, 'createdAt':date.getTime()}})
                    super.success(req, res, {statusCode: 200, message: "User is verified and database is updated", data: updatedUser});
                }
                else{
                    throw new Error("Email is not verified");
                }
            }
            else if(data.length > 0 && data[0]['emailVerified']==true){
                throw new Error("Email is already verified");
            }
            else if(data.length > 0 && data[0]['emailVerified']==false && data[0]['emailToken']!=req.body.token){
                throw new Error("Email Token is incorrect");
            }
            else{
                throw new Error("Email does not exist");
            }
        }
        catch(error){
            super.failure(req,res,{statusCode: 400, message: error.message})
        }
    }
>>>>>>> 96f791d62ea94c3d110c80004cf2b07bae51db59
}
export default new Users();
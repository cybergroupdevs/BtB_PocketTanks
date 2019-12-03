import  AppController  from './app.js'
import User from '../models/user';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
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
                super.failure(req,res,{statusCode: 401, message: "No email exists"})
            }
            else{
                const isMatched = await bcrypt.compare(req.body.password, data[0].password)
                if (!isMatched) {
                    super.failure(req,res,{statusCode: 401, message: "Password is incorrect"})
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
}
export default new Users();
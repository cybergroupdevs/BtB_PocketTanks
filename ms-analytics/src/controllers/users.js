import  AppController  from './app.js'
import User from '../models/user';

/**
 * The App controller class where other controller inherits or
 * overrides pre defined and existing properties
 */
class Users extends AppController{

    constructor(){
        console.log("I am here")
        super();
    }
    async registration(req, res) {
        try{
            console.log(11)
            super.success(req, res, await User.get({}))
        }
        catch(error){
            super.failure()
        }
    }
}
export default Users;
import AppController from '../controllers/app';
import validator from 'validator';

class Validation extends AppController {
    constructor() {
        super();
    }
    async registration(req,res,next){
        try {
            console.log(req.body.email)
            var regex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
            if(!validator.isEmail(req.body.email)){
                super.success(req, res, {
                    statusCode: 200,
                    message: "Email is incorrect",
                    data: null
                })
            }
            else if(validator.isEmpty(req.body.password) || validator.isEmpty(req.body.fullName) || validator.isEmpty(req.body.email)){
                super.success(req, res, {
                    statusCode: 200,
                    message: "Field is empty",
                    data: null
                })  
            }
            else if(!validator.isLength(req.body.password,{min:6, max: 11} ) || regex.test(req.body.password) == false){
                super.success(req, res, {
                    statusCode: 200,
                    message: "Password must contain only Alpha numeric characters, minimum of 6 characters long and must contain 1 uppercase,1 lower case character and 1 special character",
                    data: null
                })    
            }
            else if(!validator.isAlpha(req.body.fullName)){
                super.success(req, res, {
                    statusCode: 200,
                    message: "Full Name field is incorrect",
                    data: null
                }) 
            }
            else{
                next();
            }
        }
        catch (error) {
            super.failure(req, res, {
                statusCode: 400,
                message: error.message
            })
        }
    }

    async login(req,res,next){
        try {
            console.log(req.body.email)
            if(validator.isEmpty(req.body.password) || validator.isEmpty(req.body.email)){
                super.success(req, res, {
                    statusCode: 200,
                    message: "Field is empty",
                    data: null
                })  
            }
            else{
                next();
            }
        }
        catch (error) {
            super.failure(req, res, {
                statusCode: 400,
                message: error.message
            })
        }
    }

   
    async forgotPassword(req,res,next){
        try {
            console.log(req.body.email)
            if(validator.isEmpty(req.body.email)){
                super.success(req, res, {
                    statusCode: 200,
                    message: "Email field is empty",
                    data: null
                })  
            }
            else{
                next();
            }
        }
        catch (error) {
            super.failure(req, res, {
                statusCode: 400,
                message: error.message
            })
        }
    }

    async forgotPasswordChanged(req,res,next){
        var regex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
        try {
            if(validator.isEmpty(req.body.email) || validator.isEmpty(req.body.newPassword) ){
                super.success(req, res, {
                    statusCode: 200,
                    message: "Field is empty",
                    data: null
                })  
            }
            else if(!validator.isLength(req.body.newPassword,{min:6, max: 11} ) || regex.test(req.body.newPassword) == false){
                super.success(req, res, {
                    statusCode: 200,
                    message: "Password must contain only Alpha numeric characters, minimum of 6 characters long and must contain 1 uppercase,1 lower case character and 1 special character",
                    data: null
                })    
            }
            else{
                next();
            }
        }
        catch (error) {
            super.failure(req, res, {
                statusCode: 400,
                message: error.message
            })
        }
    }

    async changePassword(req,res,next){
        var regex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
        try {
            if(validator.isEmpty(req.body.email) || validator.isEmpty(req.body.newPassword) || validator.isEmpty(req.body.oldPassword) ){
                super.success(req, res, {
                    statusCode: 200,
                    message: "Field is empty",
                    data: null
                })  
            }
            else if(!validator.isLength(req.body.newPassword,{min:6, max: 11} ) || regex.test(req.body.newPassword) == false){
                super.success(req, res, {
                    statusCode: 200,
                    message: "Password must contain only Alpha numeric characters, minimum of 6 characters long and must contain 1 uppercase,1 lower case character and 1 special character",
                    data: null
                })    
            }

            else{
                next();
            }
        }
        catch (error) {
            super.failure(req, res, {
                statusCode: 400,
                message: error.message
            })
        }
    }

    async emailVerification(req,res,next){
        
        try {
            if(validator.isEmpty(req.body.email) || validator.isEmpty(req.body.emailVerified)){
                super.success(req, res, {
                    statusCode: 200,
                    message: "Field is empty",
                    data: null
                })  
            }
            else{
                next();
            }
        }
        catch (error) {
            super.failure(req, res, {
                statusCode: 400,
                message: error.message
            })
        }
    }





    
}





export default Validation;
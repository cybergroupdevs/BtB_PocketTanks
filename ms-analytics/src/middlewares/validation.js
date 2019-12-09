import AppController from '../controllers/app';
import validator from 'validator';

class Validation extends AppController {
    constructor() {
        super();
    }
    async registration(req, res, next) {
        try {
            console.log(req.body.email)
            var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,11}$/
            if (!validator.isEmail(req.body.email)) {
                throw new Error("Email is incorrect")
            }
            else if (validator.isEmpty(req.body.password)) {
                throw new Error("Password Field is empty")
            }
            else if (validator.isEmpty(req.body.fullName)) {
                throw new Error("Full Name Field is empty")
            }
            else if (validator.isEmpty(req.body.email)) {
                throw new Error("Email Field is empty")
            }
            else if (regex.test(req.body.password) == false) {
                throw new Error("Password must contain only Alpha numeric characters, minimum of 6 characters long and must contain 1 uppercase,1 lower case character and 1 special character")

            }
            else if (!validator.isAlpha(req.body.fullName)) {
                throw new Error("Full Name field is incorrect")
            }
            else {
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

    async login(req, res, next) {
        try {
            console.log(req.body.email)
            if (validator.isEmpty(req.body.password)) {
                throw new Error("Password Field is empty")
            }
            else if (validator.isEmpty(req.body.email)) {
                throw new Error("Email Field is empty")
            }
            else {
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


    async forgotPassword(req, res, next) {
        try {
            console.log(req.body.email)
            if (validator.isEmpty(req.body.email)) {
                throw new Error("Email field is empty")
            }
            else {
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

    async forgotPasswordChanged(req, res, next) {
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
        try {
            if (validator.isEmpty(req.body.email)) {
                throw new Error("Email Field is empty")
            }
            else if (validator.isEmpty(req.body.newPassword)) {
                throw new Error("New Password Field is empty")
            }
            else if (regex.test(req.body.newPassword) == false) {
                throw new Error("Password must contain only Alpha numeric characters, minimum of 6 characters long and must contain 1 uppercase,1 lower case character and 1 special character")
            }
            else {
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

    async changePassword(req, res, next) {
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
        try {
            if (validator.isEmpty(req.body.email)) {
                throw new Error("Email Field is empty")
            }
            else if (validator.isEmpty(req.body.newPassword)) {
                throw new Error("New Password Field is empty")
            }
            else if (validator.isEmpty(req.body.oldPassword)) {
                throw new Error("Old Password Field is empty")
            }
            else if (!validator.isLength(req.body.newPassword, { min: 6, max: 11 }) || regex.test(req.body.newPassword) == false) {
                throw new Error("Password must contain only Alpha numeric characters, minimum of 6 characters long and must contain 1 uppercase,1 lower case character and 1 special character")
            }

            else {
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

    async emailVerification(req, res, next) {

        try {
            if (validator.isEmpty(req.body.email)) {
                throw new Error("Email Field is empty")
            }
            else if (validator.isEmpty(req.body.emailVerified)) {
                throw new Error("Email Verfieid is empty")
            }
            else {
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
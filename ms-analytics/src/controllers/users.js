import AppController from './app.js'
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Mailer from '../../wrappers/mailer/mailer';
import globalConfig from '../../../config.json';
/**
 * The App controller class where other controller inherits or
 * overrides pre defined and existing properties
 */
class Users extends AppController {

    constructor() {
        super();
    }
    async registration(req, res) {
        try {
            let new_user = {
                email: req.body.email,
                fullName: req.body.fullName,
                password: bcrypt.hashSync(req.body.password, 10),
                emailVerified: req.body.emailVerified
            };
            const user = new User();
            let userObj = await user.insert(new_user);
            const token = jwt.sign({
                data: req.body.email
            }, globalConfig[process.env.ENV]['JWTSECRETKEY'], {
                expiresIn: 60 * 60
            })
            await user.update({
                'email': req.body.email
            }, {
                $set: {
                    'emailToken': token
                }
            });
            const mailer = new Mailer();
            let message = '<p>Hi, </p> <br/> Click below link to verify your account. <br/> http://127.0.0.1:4200/emailverification/' +
                token +
                '</br><br/> <b>Note:</b>The link will be valid for 30 minutes only. <br/> <br/>If you have any questions or need help, contact us at pockettanks60 @gmail.com <br/> <br/> Thank You for using Socialize. <br/> <br/> Thanks, <br/> The Socialize Team <br/> socialize.com ';
            mailer.sendEmail(req.body.email, "Welcome to Socialize. Let's get you started.", message);
            super.success(req, res, {
                statusCode: 200,
                message: "",
                data: userObj
            })
        } catch (error) {
            super.failure(req, res, {
                statusCode: 400,
                message: error.message
            })
        }
    }
    async login(req, res) {
        try {
            const user = new User()
            let data = await user.get({
                email: req.body.email
            });
            if (data.length == 0) {
                throw new Error("No email exists");
            } else if (data[0].emailVerified == false) {
                throw new Error("Email is not verified")
            } else {
                const isMatched = await bcrypt.compare(req.body.password, data[0].password)
                if (!isMatched) {
                    throw new Error("Password is incorrect");
                } else {
                    const token = jwt.sign({
                        '_id': data[0]['_id']
                    }, globalConfig[process.env.ENV]['JWTSECRETKEY']);
                    super.success(req, res, {
                        statusCode: 200,
                        message: "",
                        data: user.parseUser(data[0], token)
                    })
                }
            }
        } catch (error) {
            super.failure(req, res, {
                statusCode: 400,
                message: error.message
            })
        }
    }
    async forgotPassword(req, res) {
        try {
            const user = new User();
            let data = await user.get({
                email: req.body.email
            });
            if (data.length == 0) {
                throw new Error("Email does not exist");
            } else if (data.length > 0 && data[0]['emailVerified'] == false) {
                throw new Error("User's email is not verified yet");
            } else {
                const token = jwt.sign({
                    data: data[0]['email']
                }, globalConfig[process.env.ENV]['JWTSECRETKEY'], {
                    expiresIn: 60 * 60
                });
                const mailer = new Mailer();
                let message = '<p>Hi, </p> <br/> Seems like you forgot your password.Click below link to reset your password. <br/> <br/> <center> <a href="https:localhost:4200/changepassword/' + token + '">Reset Your Password</a> </center><br/> <br/> < b > Note: </b>The link will be valid for 30 minutes only. <br/> <br/>If you have any questions or need help, contact us at pockettanks60 @gmail.com <br/> <br/> Thank You for using Socialize. <br/> <br/>Thanks, <br/>The Socialize Team < br/> socialize.com ';
                mailer.sendEmail(data[0]['email'], "Forgot your password? Let's get you a new one.", message);
                super.success(req, res, {
                    statusCode: 200,
                    message: "Forgot password link has been sent",
                    data: null
                })
            }
        } catch (error) {
            super.failure(req, res, {
                statusCode: 400,
                message: error.message
            })
        }
    }
    async forgotPasswordChanged(req, res) {
        try {
            const user = new User();
            const date = new Date();
            let jwtResponse = null;
            try {
                jwtResponse = jqt.verify(req.body.token, globalConfig[process.env.ENV]['JWTSECRETKEY'])
            } catch (error) {
                throw new Error("Token is expired or invalid signature");
            }
            const data = await user.get({
                email: req.body.email
            })
            const isMatched = await bcrypt.compare(req.body.newPassword, data[0].password)
            if (data.length != 0 && isMatched == false) {
                let hashednewPassword = bcrypt.hashSync(req.body.newPassword, 10);
                let updatedUser = await user.update({
                    'email': req.body.email
                }, {
                    $unset: {
                        'passwordToken': 1
                    },
                    $set: {
                        'previousPassword': data[0]['password'],
                        'password': hashednewPassword,
                        'passwordChangeAt': date.getTime()
                    }
                })
                // let updatedUser = await user.update({
                //     'email': req.body.email
                // }, {
                //     '$set': {
                //         'previousPassword': data[0]['password'],
                //         'password': hashednewPassword,
                //         'passwordChangeAt': date.getTime()
                //     }
                // })
                super.success(req, res, {
                    statusCode: 200,
                    message: "Password is changed and database is updated",
                    data: updatedUser
                });
            } else {
                throw new Error("Email does not exist");
            }

        } catch (error) {
            super.failure(req, res, {
                statusCode: 400,
                message: error.message
            })
        }
    }
    async changePassword(req, res) {
        try {
            const user = new User();
            const data = await user.get({
                email: req.body.email
            })
            if (data.length > 0) {
                const isMatched = await bcrypt.compare(req.body.oldPassword, data[0].password);
                if (isMatched && req.body.newPassword.length > 6 && regex.test(req.body.newPassword) == true && req.body.oldPassword != req.body.newPassword) {
                    data[0]['previousPassword'] = req.body.oldPassword;
                    hashednewPassword = bcrypt.hashSync(req.body.newPassword, 10);
                    hashedoldPassword = bcrypt.hashSync(req.body.oldPassword, 10);

                    const updatedUser = await user.update({
                        'email': req.body.email
                    }, {
                        $set: {
                            'previousPassword': hashedoldPassword,
                            'password': hashednewPassword
                        }
                    })
                    super.success(req, res, {
                        statusCode: 200,
                        message: "Password is changed",
                        data: updatedUser
                    });
                } else if (!isMatched) {
                    throw new Error("Password is not matched with the old Password");
                } else if (req.body.newPassword.length < 6 || regex.test(req.body.newPassword) == false) {
                    throw new Error("Password must contain only Alpha numeric characters, minimum of 6 characters long and must contain 1 uppercase,1 lower case character and 1 special character");
                }
            }
        } catch (error) {
            super.failure(req, res, {
                statusCode: 400,
                message: error.message
            })
        }
    }
    async emailVerification(req, res) {
        try {
            const user = new User();

            const data = await user.get({
                emailToken: req.body.token
            });
            if (data.length > 0 && data[0]['emailVerified'] == false) {
                let updateUser = await user.update({
                    emailToken: data[0]['email']
                }, {
                    $unset: {
                        'emailToken': 1
                    },
                    $set: {
                        'emailVerified': true,
                        'createdAt': new Date().getTime()
                    }
                });
                // let updatedUser = await user.update({
                //     email: data[0]['email']
                // }, {
                //     $set: {
                //         'emailVerified': true,
                //         'createdAt': new Date().getTime()
                //     }
                // });
                super.success(req, res, {
                    statusCode: 200,
                    message: "User is verified and database is updated",
                    data: {}
                });
            } else if (data.length > 0 && data[0]['emailVerified'] == true) {
                throw new Error("Email is already verified");
            } else if (data.length > 0 && data[0]['emailVerified'] == false && data[0]['emailToken'] != req.body.token) {
                throw new Error("Email Token is incorrect");
            } else {
                throw new Error("Email does not exist");
            }
        } catch (error) {
            super.failure(req, res, {
                statusCode: 400,
                message: error.message
            })
        }
    }
}
export default new Users();
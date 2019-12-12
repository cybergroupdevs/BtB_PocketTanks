/**
 * @api {post} /registration Register new user
 * @apiName Register
 * @apiGroup User
 *
 * @apiParam {String} email User's email ID.
 * @apiParam {String} password User's password.
 * @apiParam {String} fullName User's full Name.
 * @apiParam {Boolean} emailVerified User's email is verified or not (true or false).
 * 
 * @apiSuccess {String} userId userid of the user which is unique in database.
 * @apiSuccess {String} email Email of the User.
 * @apiSuccess {String} fullName Full Name of the User.
 * @apiSuccess {String} password Password of the User.
 * @apiSuccess {Boolean} emailVerified Whether user's email is verified or not (True or False).
 * @apiSuccess {Date} createdAt Date and time when the user is created.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *  "success": true,
 *   "status": 200,
 *  "message": "",
 *   "data": {
 *       "email": "test3456@gmail.com",
 *       "fullName": "test",
 *       "password": "$2b$10$j9USTqvc7GnvohItOPA.W.CRtSWv2BQinEgYKc3B/vJpiDYrIo0hi",
 *       "emailVerified": false,
 *       "createdAt": "2019-12-09T10:29:41.881Z",
 *       "__v": 0
 *   }
 * }
 *
 * @apiError emailNotFound The email id of the User was not found.
 * @apiError fullName Full Name of the User is not found.
 * @apiError password Password of the User is not found.
 * @apiError emailVerified Email Verification field is not found for the user.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "success": false,
 *       "status": 400,
 *       "message": "Password Field is empty",
 *       "data": null
 *      }
 */
/**
 * @api {post} /login Login user
 * @apiName Login
 * @apiGroup User
 *
 * @apiParam {String} email User's email ID.
 * @apiParam {String} password User's password.
 * 
 * @apiSuccess {String} fullName Full Name of the User.
 * @apiSuccess {String} token Unique token of the user for login.
 * @apiSuccess {String} userId userid of the user which is unique in database.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   {
 *   "success": true,
 *   "status": 200,
 *   "message": "",
 *   "data": {
 *       "userId": "5dea21c259d7021983ee6e69",
 *       "fullName": "John Wickman",
 *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGVhMjFjMjU5ZDcwMjE5ODNlZTZlNjkiLCJpYXQiOjE1NzU4Nzg4Mzl9.ZrKZ1F0gbbjejVrLElKtEx0VdoaneO7fAQVhNm-p3iE"
 *   }
 *  }
 *
 * @apiError emailNotFound The email id of the User was not found.
 * @apiError password Password of the User is not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "success": false,
 *       "status": 400,
 *       "message": "Email Field is empty",
 *       "data": null
 *      }
 */
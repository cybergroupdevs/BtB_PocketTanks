/**
 * @api {post} /forgotpassword Forgot Password for the user
 * @apiName Forgot Password
 * @apiGroup User
 *
 * @apiParam {String} email User's email ID.
 * 
 * @apiSuccess {String} message Confirmation of sending the forgot password link.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   {
 *   "success": true,
 *   "status": 200,
 *   "message": "Forgot password link has been sent",
 *   "data": null
 * }
 *
 * @apiError message If user's email is not verified then user wont be able to send email
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *    {
 *   "success": false,
 *   "status": 400,
 *   "message": "User's email is not verified yet",
 *   "data": null
 * }
 */
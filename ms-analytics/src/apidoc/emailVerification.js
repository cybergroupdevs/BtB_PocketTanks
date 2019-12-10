/**
 * @api {post} /emailverification Verify user's Registered Email Id
 * @apiName CVerify user's email ID
 * @apiGroup User
 *
 * @apiParam {String} email User's email ID.
 * @apiParam {Boolean} emailVerified Email Verified should be true if email is verified by user else false
 * 
 * @apiSuccess {String} message User has verified the email
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   {
 *   "success": true,
 *   "status": 200,
 *   "message": "Email Id is verified successfully",
 *   "data": null
 * }
 *
 * @apiError message If user's email ID is incorrect or email verified is false then user wont be able to get verified.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *    {
 *   "success": false,
 *   "status": 400,
 *   "message": "Email Id is incorrect",
 *   "data": null
 * }
 */
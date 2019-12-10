/**
 * @api {post} /changepassword Change Password for the user after login 
 * @apiName Change Old Password
 * @apiGroup User
 *
 * @apiParam {String} email User's email ID.
 * @apiParam {String} oldPassword User's old password.
 * @apiParam {String} newPassword User's new password.
 * 
 * @apiSuccess {String} message Confirmation of changing the old password to new.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   {
 *   "success": true,
 *   "status": 200,
 *   "message": "Password is changed successfully",
 *   "data": null
 * }
 *
 * @apiError message If user's old password and new password is same then user wont be able to change password
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *    {
 *   "success": false,
 *   "status": 400,
 *   "message": "User's old password and new password is same",
 *   "data": null
 * }
 */
import { Router } from "express";
import { authRouteConfig, baseApiConfig } from "../../config/api.config";
import {
  forgetPassword,
  loginController,
  logoutController,
  resetPassword,
  signupController,
  updatePasswordController,
} from "../../controller/auth.controller";
import { verifyAuthToken } from "../../middlewares/auth.middleware";

const authRouter = Router();

/**
 * @openapi
 * /api/v1/signup:
 *   post:
 *     summary: Create a new user account
 *     description: Registers a new user with an email and password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json: 
 *           schema: 
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               username:
 *                 type: string
 *                 example: "john"
 *               password:
 *                 type: string
 *                 example: "strongPassword123"
 *             required:
 *               - email
 *               - password
 *               - username
 *     responses:
 *       201:
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User account created successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "user-12345"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *       400:
 *         description: Bad Request - Invalid input data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid email or password format."
 *       409:
 *         description: Conflict - Email already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email is already registered."
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred. Please try again later."
 */

authRouter.post(authRouteConfig["signup"], signupController);
/**
 * @openapi
 * /api/v1/login:
 *   post:
 *     summary: Log in to an existing user account
 *     description: Authenticates a user using either their email or username along with a password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     example: "john.doe@example.com"
 *                   password:
 *                     type: string
 *                     example: "strongPassword123"
 *                 required:
 *                   - email
 *                   - password
 *               - type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                     example: "john"
 *                   password:
 *                     type: string
 *                     example: "strongPassword123"
 *                 required:
 *                   - username
 *                   - password
 *             example:
 *               username: "john"
 *               password: "strongPassword123"
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful."
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Bad Request - Missing or invalid credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Username/email and password are required."
 *       401:
 *         description: Unauthorized - Incorrect credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid username/email or password."
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred. Please try again later."
 */

authRouter.post(authRouteConfig["login"], loginController);
/**
 * @openapi
 * /api/v1/logout:
 *   post:
 *     summary: Log out from the current user session
 *     description: Invalidates the user's authentication token and ends the current session.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - $ref: '#/components/parameters/XCorrelationId'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: User logged out successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logout successful."
 *       401:
 *         description: Unauthorized - No valid authentication token provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Authentication required to perform logout."
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred. Please try again later."
 */



authRouter.post(authRouteConfig["logout"], verifyAuthToken, logoutController);

/**
 * @openapi
 * /api/v1/forget-password:
 *   post:
 *     summary: Initiate password reset process
 *     description: Sends a password reset link to the user's registered email address.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - $ref: '#/components/parameters/XCorrelationId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Password reset email sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password reset link has been sent to your email."
 *       400:
 *         description: Bad Request - Invalid email format.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid email address."
 *       404:
 *         description: Not Found - Email does not exist in our records.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No user found with this email."
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred. Please try again later."
 */



authRouter.post(authRouteConfig["forgetPassword"], forgetPassword);

/**
 * @openapi
 * /api/v1/reset-password/{id}:
 *   post:
 *     summary: Reset user password
 *     description: Resets the user's password using the provided reset token or identifier.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - $ref: '#/components/parameters/XCorrelationId'
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique reset token or user identifier.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 example: "newStrongPassword123!"
 *             required:
 *               - password
 *     responses:
 *       200:
 *         description: Password reset successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Your password has been reset successfully."
 *       400:
 *         description: Bad Request - Invalid or missing password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password must meet security requirements."
 *       404:
 *         description: Not Found - Reset token or user not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid or expired reset token."
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred. Please try again later."
 */


authRouter.post(authRouteConfig["resetPassword"].concat("/:id"), resetPassword);

/**
 * @openapi
 * /api/v1/updatepassword:
 *   post:
 *     summary: Update the user's password
 *     description: Allows an authenticated user to update their password by providing the current password and a new one.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - $ref: '#/components/parameters/XCorrelationId'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentpassword:
 *                 type: string
 *                 example: "strongPassword123"
 *               newpassword:
 *                 type: string
 *                 example: "NewSecurePassword456!"
 *             required:
 *               - currentpassword
 *               - newpassword
 *     responses:
 *       200:
 *         description: Password updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password updated successfully."
 *       400:
 *         description: Bad Request - Invalid input or password validation failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid current password or weak new password."
 *       401:
 *         description: Unauthorized - No valid authentication token provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Authentication required to update password."
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred. Please try again later."
 */

authRouter.post(
  authRouteConfig["updatePassword"],
  verifyAuthToken,
  updatePasswordController
);

export default authRouter;

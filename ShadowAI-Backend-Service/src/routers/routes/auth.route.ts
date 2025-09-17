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
 *               - username
 *               - password
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
 *                   example: "Username or email and password are required."
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
 *     security:
 *       - bearerAuth: []
 *       - XCorrelationId: []   # <-- add it here if you want it only for this route
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

authRouter.post(authRouteConfig["forgetPassword"], forgetPassword);

authRouter.post(authRouteConfig["resetPassword"].concat("/:id"), resetPassword);

authRouter.post(
  authRouteConfig["updatePassword"],
  verifyAuthToken,
  updatePasswordController
);

export default authRouter;

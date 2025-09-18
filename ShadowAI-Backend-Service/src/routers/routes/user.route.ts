import { Router } from "express";
import { userRouteConfig } from "../../config/api.config";
import { verifyAuthToken } from "../../middlewares/auth.middleware";
import {
  deactivatedUser,
  editUserProfile,
  extractImageAndAnalyzeController,
  getUserProfile,
  removeImage,
  uploadPostController,
} from "../../controller/user.controller";
import validateRepeatedToken from "../../middlewares/tokenValidator.middleware";
import upload from "../../config/multer.config";
import verifyDeactivatedAndDeleted from "../../middlewares/status.middleware";
import { extractImageAndAnalyzeService } from "../../services/user/user.service";

const userRouter = Router();
/**
 * @openapi
 * /api/v1/user/profile:
 *   get:
 *     summary: Get user profile
 *     description: Retrieves the profile details of the authenticated user.
 *     tags:
 *       - User
 *     parameters:
 *       - $ref: '#/components/parameters/XCorrelationId'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User profile fetched successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "user-12345"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     role:
 *                       type: string
 *                       example: "student"
 *                     isActive:
 *                       type: boolean
 *                       example: true
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid or missing token."
 *       403:
 *         description: Forbidden - User is deactivated or deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User account is deactivated or deleted."
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


userRouter.get(
  userRouteConfig["getUserProfile"],
  verifyAuthToken,
  validateRepeatedToken,
  verifyDeactivatedAndDeleted,
  getUserProfile
);
/**
 * @openapi
 * /api/v1/user/profile/upload:
 *   post:
 *     summary: Upload user profile image
 *     description: Allows the authenticated user to upload a profile image.
 *     tags:
 *       - User
 *     parameters:
 *       - $ref: '#/components/parameters/XCorrelationId'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               upload:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload.
 *             required:
 *               - upload
 *     responses:
 *       200:
 *         description: Image uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Image uploaded successfully."
 *                 imageUrl:
 *                   type: string
 *                   example: "https://cdn.shadow-ai.com/uploads/user-12345/profile.png"
 *       400:
 *         description: Bad Request - No file provided or invalid file type.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No file uploaded or file type not supported."
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Authentication required."
 *       403:
 *         description: Forbidden - User is deactivated or deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User account is deactivated or deleted."
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


userRouter.post(
  userRouteConfig["uploadImage"],
  verifyAuthToken,
  validateRepeatedToken,
  verifyDeactivatedAndDeleted,
  upload.single("upload"),
  uploadPostController
);

/**
 * @openapi
 * /api/v1/user/profile/edit:
 *   patch:
 *     summary: Edit user profile
 *     description: Updates profile details of the authenticated user. All fields are optional, but at least one must be provided.
 *     tags:
 *       - User
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
 *               userProfileName:
 *                 type: string
 *                 example: "John Doe"
 *               primaryEmail:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               secondaryEmail:
 *                 type: string
 *                 example: "john.secondary@example.com"
 *               phoneNumber:
 *                 type: string
 *                 example: "+1234567890"
 *     responses:
 *       200:
 *         description: Profile updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: "Profile updated successfully."
 *               data:
 *                 userProfileName: "John Doe"
 *                 primaryEmail: "john.doe@example.com"
 *                 secondaryEmail: "john.secondary@example.com"
 *                 phoneNumber: "+1234567890"
 *       400:
 *         description: Validation error - at least one field must be provided.
 *         content:
 *           application/json:
 *             example:
 *               message: "At least one field (userProfileName, primaryEmail, secondaryEmail, phoneNumber) must be provided."
 *       401:
 *         description: Unauthorized - Missing or invalid token.
 *         content:
 *           application/json:
 *             example:
 *               message: "Authentication required."
 */


userRouter.patch(
  userRouteConfig["editUserProfile"],
  verifyAuthToken,
  validateRepeatedToken,
  verifyDeactivatedAndDeleted,
  editUserProfile
);

/**
 * @openapi
 * /api/v1/user/profile/status:
 *   patch:
 *     summary: Update user profile status
 *     description: Updates a user status field dynamically using query params.
 *     tags:
 *       - User
 *     parameters:
 *       - $ref: '#/components/parameters/XCorrelationId'
 *       - $ref: '#/components/parameters/StatusFieldParam'
 *       - $ref: '#/components/parameters/StatusValueParam'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User status updated successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: "User isDeactivated updated to false"
 *               data:
 *                 id: "user-12345"
 *                 isDeactivated: false
 *                 isDeleted: false
 *               statusCode: 200
 *               error: false
 *       400:
 *         description: Invalid query parameters.
 *         content:
 *           application/json:
 *             example:
 *               message: "Query parameters missing or invalid."
 *               data: null
 *               statusCode: 400
 *               error: true
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             example:
 *               message: "An unexpected error occurred."
 *               data: null
 *               statusCode: 500
 *               error: true
 */


userRouter.patch(
  userRouteConfig["deactivatedUser"],
  verifyAuthToken,
  validateRepeatedToken,
  deactivatedUser
);

/**
 * @openapi
 * /api/v1/user/profile/remove-image:
 *   delete:
 *     summary: Remove user profile image
 *     description: Deletes the authenticated user's profile image.
 *     tags:
 *       - User
 *     parameters:
 *       - $ref: '#/components/parameters/XCorrelationId'
 *     security:
 *       - bearerAuth: []
  *     responses:
 *       200:
 *         description: Image removed successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: "Profile image removed."
 *       404:
 *         description: No image found to delete.
 *         content:
 *           application/json:
 *             example:
 *               message: "No profile image found."
 *       401:
 *         description: Unauthorized - Missing or invalid token.
 *         content:
 *           application/json:
 *             example:
 *               message: "Authentication required."
 */

userRouter.delete(
  userRouteConfig["removeImage"],
  verifyAuthToken,
  validateRepeatedToken,
  removeImage
);
/**
 * @openapi
 * /api/v1/user/profile/imageextraction:
 *   post:
 *     summary: Upload image for text extraction and analysis
 *     description: Allows the authenticated user to upload an image and extracts/analyzes its contents.
 *     tags:
 *       - User
 *     parameters:
 *       - $ref: '#/components/parameters/XCorrelationId'
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               upload:
 *                 type: string
 *                 format: binary
 *                 description: The image file to be analyzed.
 *             required:
 *               - upload
 *     responses:
 *       200:
 *         description: Image analyzed successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: "Image analyzed successfully."
 *               data:
 *                 textExtracted: "Hello world"
 *                 objectsDetected: ["cat", "tree"]
 *       400:
 *         description: Invalid image format or unreadable file.
 *         content:
 *           application/json:
 *             example:
 *               message: "Unable to process the uploaded image."
 *       401:
 *         description: Unauthorized - Missing or invalid token.
 *         content:
 *           application/json:
 *             example:
 *               message: "Authentication required."
 */

userRouter.post(
  userRouteConfig["imageExtractandAnalyse"],
  verifyAuthToken,
  validateRepeatedToken,
  upload.single("upload"),
  extractImageAndAnalyzeController

)

export default userRouter;

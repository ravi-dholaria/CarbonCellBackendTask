import express from "express";
import {
  registerController,
  loginController,
  logoutController,
} from "../controllers/authController.js";
import { isSignIn } from "../middlewares/isSignIn.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registers a new user
 *     description: Creates a new user in the database
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: The username of the user
 *                 required: true
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 required: true
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request (e.g., missing data)
 *       500:
 *         description: Internal server error
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The user's ID
 *         userName:
 *           type: string
 *           description: The username of the user
 *         password:
 *           type: string
 *           description: The password of the user (hashed)
 *         createdAt:
 *           type: string
 *           description: The timestamp of user creation
 *         updatedAt:
 *           type: string
 *           description: The timestamp of last user update
 */

router.post("/register", registerController);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Logs in an existing user
 *     description: Logs in a user with existing credentials and returns a JWT token.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: The username of the user
 *                 required: true
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 required: true
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Bad request (e.g., missing data)
 *       401:
 *         description: Unauthorized (invalid credentials)
 *       500:
 *         description: Internal server error
 */

router.post("/login", loginController);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logs out the current user
 *     description: Logs out a signed-in user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       500:
 *         description: Internal server error
 */

router.post("/logout", isSignIn, logoutController);

export default router;

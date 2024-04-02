import express from "express";
import { getData, getAllCategories } from "../controllers/dataController.js";
import { isSignIn } from "../middlewares/isSignIn.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Data
 *   description: API endpoints for data retrieval
 */

/**
 * @swagger
 * /api/data:
 *   get:
 *     summary: Get data entries
 *     description: Retrieves data entries based on the specified category and limit
 *     tags: [Data]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: The category of the data entries to retrieve. (optional)
 *         example: Animals
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The maximum number of entries to retrieve. (optional)
 *         example: 5
 *     responses:
 *       200:
 *         description: Data retrieved successfully
 *       500:
 *         description: Internal server error
 */

router.get("", getData);

/**
 * @swagger
 * /api/data/categories:
 *   get:
 *     summary: Get all categories
 *     description: Retrieves all available categories of data entries
 *     tags: [Data]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *       401:
 *         description: Unauthorized (user not logged in)
 *       500:
 *         description: Internal server error
 */

router.get("/categories", isSignIn, getAllCategories);

export default router;

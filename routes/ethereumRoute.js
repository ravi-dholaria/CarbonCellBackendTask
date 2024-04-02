import express from "express";
import { getBalance } from "../controllers/ethereumController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Ethereum
 *   description: API endpoints for Ethereum account balance retrieval
 */

/**
 * @swagger
 * /api/ethereum/balance/{account}:
 *   get:
 *     summary: Get Ethereum account balance
 *     description: Retrieves the balance of the specified Ethereum account.
 *     tags: [Ethereum]
 *     parameters:
 *       - in: path
 *         name: account
 *         schema:
 *           type: string
 *         required: true
 *         description: The Ethereum account address.
 *     responses:
 *       200:
 *         description: Ethereum account balance retrieved successfully
 *       400:
 *         description: Invalid Ethereum address provided.
 *       500:
 *         description: Internal server error
 */

router.get("/balance/:account", getBalance);

export default router;

import FeedbackController from "../controllers/FeedbackController";
import express from "express";
import authMiddleWare from "../middleware/AuthMiddleWare";
import RoleMiddleware from "../middleware/RoleMiddleWare";

const router = express.Router();

/**
 * @swagger
 * /feedbacks:
 *   post:
 *     summary: Create feedback for a product
 *     tags: [Feedbacks]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - rating
 *               - comment
 *             properties:
 *               productId:
 *                 type: integer
 *               rating:
 *                 type: integer
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Feedback created successfully
 */
router.post("/",authMiddleWare,FeedbackController.createFeedbackController);

/**
 * @swagger
 * /feedbacks:
 *   get:
 *     summary: Get all feedbacks
 *     tags: [Feedbacks]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Feedbacks retrieved successfully
 *       403:
 *         description: Forbidden
 */
router.get("/",authMiddleWare,RoleMiddleware("admin"),FeedbackController.getAllFeedbacksController);

/**
 * @swagger
 * /feedbacks/product/{productId}:
 *   get:
 *     summary: Get feedbacks by product ID
 *     tags: [Feedbacks]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Feedbacks retrieved successfully
 *       404:
 *         description: Feedbacks not found
 */
router.get("/product/:productId",FeedbackController.getFeedbackByProductIdController);

/**
 * @swagger
 * /feedbacks/{id}:
 *   delete:
 *     summary: Delete feedback by ID
 *     tags: [Feedbacks]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Feedback deleted successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Feedback not found
 */
router.delete("/:id",authMiddleWare,RoleMiddleware("admin"),FeedbackController.deleteFeedbackController)

export default router;

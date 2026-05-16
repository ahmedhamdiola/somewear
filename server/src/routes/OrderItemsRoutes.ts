import express from "express";
import OrderItemsController from "../controllers/OrderItemsController";
import authMiddleware from "../middleware/AuthMiddleWare";
import RoleMiddleware from "../middleware/RoleMiddleWare";

const router = express.Router();

/**
 * @swagger
 * /order-items/items/{orderId}:
 *   get:
 *     summary: Get all order items by order ID
 *     tags: [Order Items]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order items retrieved successfully
 *       404:
 *         description: Order items not found
 */
router.get(
  "/items/:orderId",
  authMiddleware,
  OrderItemsController.getOrderItemsByOrderIdController,
);

export default router;

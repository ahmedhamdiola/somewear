import express from "express"
import OrderItemsController from "../controllers/OrderItemsController"
import authMiddleware from "../middleware/AuthMiddleWare"
import RoleMiddleware from "../middleware/RoleMiddleWare"

const router =express.Router();

/**
 * @swagger
 * /order-items:
 *   post:
 *     summary: Create a new order item
 *     tags: [Order Items]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - productVariantId
 *               - quantity
 *               - price
 *             properties:
 *               orderId:
 *                 type: integer
 *               productVariantId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Order item created successfully
 */

router.post("/",authMiddleware,OrderItemsController.createOrderItemController);

/**
 * @swagger
 * /order-items/{id}:
 *   get:
 *     summary: Get order item by ID
 *     tags: [Order Items]
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
 *         description: Order item retrieved successfully
 *       404:
 *         description: Order item not found
 */
router.get("/:id",authMiddleware,OrderItemsController.getOrderItemByIdController);

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
router.get("/items/:orderId",authMiddleware,OrderItemsController.getOrderItemsByOrderIdController);

/**
 * @swagger
 * /order-items/{id}:
 *   delete:
 *     summary: Delete order item by ID
 *     tags: [Order Items]
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
 *         description: Order item deleted successfully
 *       404:
 *         description: Order item not found
 */
router.delete("/:id",authMiddleware,OrderItemsController.deleteOrderItemController)

export default router
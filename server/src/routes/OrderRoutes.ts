import express from "express";
import UserController from "../controllers/UserController";
import authMiddleware from "../middleware/AuthMiddleWare";
import RoleMiddleware from "../middleware/RoleMiddleWare";
import OrderController from "../controllers/OrderController";

const router = express.Router();

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - totalPrice
 *               - shippingFees
 *               - city
 *               - address
 *               - phone
 *             properties:
 *               totalPrice:
 *                 type: number
 *               shippingFees:
 *                 type: number
 *               city:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order created successfully
 */
router.post("/", authMiddleware, OrderController.createOrderController);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
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
 *         description: Order retrieved successfully
 *       403:
 *         description: Forbidden
 */
router.get(
  "/:id",
  authMiddleware,
  RoleMiddleware("admin"),
  OrderController.getOrderByIdController,
);

/**
 * @swagger
 * /orders/myOrders:
 *   get:
 *     summary: Get orders by user ID
 *     tags: [Orders]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User orders retrieved successfully
 */
router.get(
  "/myOrders",
  authMiddleware,
  OrderController.getOrdersByUserIdController,
);

/**
 * @swagger
 * /orders/myCounts:
 *   get:
 *     summary: Get order count by user ID
 *     tags: [Orders]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User order count retrieved successfully
 *      403:
 *         description: Forbidden
 *      
 */
router.get(
  "/myCounts",
  authMiddleware,
  OrderController.getCountByUserIdController,
);


/**
 * @swagger
 * /orders/myTotalAmount:
 *   get:
 *     summary: Get total order amount by user ID
 *     tags: [Orders]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User total order amount retrieved successfully
 *       403:
 *         description: Forbidden
 * 
 */
router.get(
  "/myTotalAmount",
  authMiddleware,
  OrderController.getTotalAmountByUserIdController,
);
/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: All orders retrieved successfully
 *       403:
 *         description: Forbidden
 */
router.get(
  "/",
  authMiddleware,
  RoleMiddleware("admin"),
  OrderController.getAllOrdersController,
);

/**
 * @swagger
 * /orders/cancel/{id}:
 *   patch:
 *     summary: Cancel an order
 *     tags: [Orders]
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
 *         description: Order cancelled successfully
 *       403:
 *         description: Forbidden
 */
router.patch(
  "/cancel/:id",
  authMiddleware,
  OrderController.cancelOrderController,
);

/**
 * @swagger
 * /orders/status/{id}:
 *   patch:
 *     summary: Update order status
 *     tags: [Orders]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: delivered
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       403:
 *         description: Forbidden
 */
router.patch(
  "/status/:id",
  authMiddleware,
  RoleMiddleware("admin"),
  OrderController.updateOrderStatusController,
);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete order by ID
 *     tags: [Orders]
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
 *         description: Order deleted successfully
 *       403:
 *         description: Forbidden
 */
router.delete(
  "/:id",
  authMiddleware,
  RoleMiddleware("admin"),
  OrderController.deleteOrderController,
);

/**
 * @swagger
 * /orders/checkout:
 *   post:
 *     summary: Checkout cart and create order
 *     tags: [Orders]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - shippingFees
 *               - city
 *               - address
 *               - phone
 *             properties:
 *               shippingFees:
 *                 type: number
 *               city:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Checkout completed successfully
 */
router.post("/checkout", authMiddleware, OrderController.checkoutController);

export default router;

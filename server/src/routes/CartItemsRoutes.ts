import express from "express";
import CartItemsController from "../controllers/CartItemsController";
import authMiddleware from "../middleware/AuthMiddleWare";

const router = express.Router();

/**
 * @swagger
 * /cart-items:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart Items]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productVariantId
 *               - quantity
 *             properties:
 *               productVariantId:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Cart item created successfully
 */
router.post("/", authMiddleware, CartItemsController.createCartItemController);

/**
 * @swagger
 * /cart-items/getCartItems:
 *   get:
 *     summary: Get cart items by user ID
 *     tags: [Cart Items]
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
 *         description: Cart items retrieved successfully
 *       403:
 *         description: Forbidden
 */
router.get(
  "/",
  authMiddleware,
  CartItemsController.getCartItemsByUserIdController,
);

/**
 * @swagger
 * /cart-items/{id}:
 *   patch:
 *     summary: Update cart item quantity
 *     tags: [Cart Items]
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
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *       403:
 *         description: Forbidden
 */
router.patch(
  "/:id",
  authMiddleware,
  CartItemsController.updateCartItemQuantityController,
);

/**
 * @swagger
 * /cart-items/{id}:
 *   delete:
 *     summary: Delete cart item by ID
 *     tags: [Cart Items]
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
 *         description: Cart item deleted successfully
 *       403:
 *         description: Forbidden
 */
router.delete(
  "/:id",
  authMiddleware,
  CartItemsController.deleteCartItemController,
);

/**
 * @swagger
 * /cart-items/user/{userId}:
 *   delete:
 *     summary: Delete all cart items by user ID
 *     tags: [Cart Items]
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
 *         description: Cart items deleted successfully
 *       403:
 *         description: Forbidden
 */
router.delete(
  "/user/:userId",
  authMiddleware,
  CartItemsController.deleteCartItemsByUserIdController,
);
export default router;

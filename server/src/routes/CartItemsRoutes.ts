import express from "express"
import CartItemsController from "../controllers/CartItemsController"
import authMiddleware from "../middleware/AuthMiddleWare"

const router = express.Router();

router.post("/", authMiddleware, CartItemsController.createCartItemController)
router.get("/:userId", authMiddleware, CartItemsController.getCartItemsByUserIdController)
router.put("/:id", authMiddleware, CartItemsController.updateCartItemQuantityController)
router.delete("/:id", authMiddleware, CartItemsController.deleteCartItemController)
export default router
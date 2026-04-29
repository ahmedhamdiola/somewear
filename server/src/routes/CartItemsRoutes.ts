import express from "express"
import CartItemsController from "../controllers/CartItemsController"
import authMiddleware from "../middleware/AuthMiddleWare"
import RoleMiddleware from "../middleware/RoleMiddleWare"

const router =express.Router();

router.post("/",authMiddleware,CartItemsController.createCartItemController)
router.get("/",authMiddleware,CartItemsController.getCartItemsByCartIdController)
router.get("/:id",authMiddleware,CartItemsController.getCartItemByIdController)
router.put("/:id",authMiddleware,CartItemsController.updateCartItemQuantityController)
router.delete("/:id",authMiddleware,RoleMiddleware("admin"),CartItemsController.deleteCartItemController)

export default router
import express from "express"
import OrderItemsController from "../controllers/OrderItemsController"
import authMiddleware from "../middleware/AuthMiddleWare"
import RoleMiddleware from "../middleware/RoleMiddleWare"

const router =express.Router();

router.post("/",authMiddleware,OrderItemsController.createOrderItemController)
router.get("/:id",authMiddleware,OrderItemsController.getOrderItemByIdController)
router.get("/items/:orderId",authMiddleware,OrderItemsController.getOrderItemsByOrderIdController)
router.delete("/:id",authMiddleware,OrderItemsController.deleteOrderItemController)

export default router
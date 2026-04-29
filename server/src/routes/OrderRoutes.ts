import express from "express";
import UserController from "../controllers/UserController";
import authMiddleware from "../middleware/AuthMiddleWare";
import RoleMiddleware from "../middleware/RoleMiddleWare";
import OrderController from "../controllers/OrderController";

const router = express.Router();

router.post("/", authMiddleware, OrderController.createOrderController);
router.get("/:id", authMiddleware, RoleMiddleware("admin"), OrderController.getOrderByIdController);
router.get("/order/:userId", authMiddleware, OrderController.getOrderByUserIdController);
router.get("/", authMiddleware, RoleMiddleware("admin"), OrderController.getAllOrdersController);
router.patch("/cancel/:id", authMiddleware, OrderController.cancelOrderController)
router.patch("/status/:id", authMiddleware, RoleMiddleware("admin"), OrderController.updateOrderStatusController);
router.delete("/:id", authMiddleware, RoleMiddleware("admin"), OrderController.deleteOrderController);

export default router;

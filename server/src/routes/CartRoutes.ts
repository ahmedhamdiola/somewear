import express from "express";
import CartController from "../controllers/CartController";
import authMiddleware from "../middleware/AuthMiddleWare";
import RoleMiddleware from "../middleware/RoleMiddleWare";

const router = express.Router();

router.post("/", authMiddleware, CartController.createCartController);
router.get("/user/:userId", authMiddleware, CartController.getCartByUserIdController);
router.get("/:id", authMiddleware,RoleMiddleware("admin"), CartController.getCartByIdController);
router.delete("/:id/:userId", authMiddleware, CartController.deleteCartByIdController);

export default router;
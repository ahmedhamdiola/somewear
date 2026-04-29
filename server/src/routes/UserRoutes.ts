import express from "express";
import UserController from "../controllers/UserController";
import authMiddleware from "../middleware/AuthMiddleWare";

const router = express.Router();

router.post("/register",UserController.registerUserController);
router.post("/login",authMiddleware, UserController.loginUserController);
router.get("/:id", authMiddleware,UserController.getUserByIdController);
router.put("/:id", authMiddleware, UserController.updateUserByIdController);
router.delete("/:id", authMiddleware, UserController.deleteUserByIdController);

export default router;
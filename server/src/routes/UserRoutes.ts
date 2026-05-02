import express from "express";
import UserController from "../controllers/UserController";
import authMiddleware from "../middleware/AuthMiddleWare";
import RoleMiddleware from "../middleware/RoleMiddleWare";

const router = express.Router();

router.post("/register", UserController.registerUserController);
router.post("/login", UserController.loginUserController);
router.get("/", authMiddleware, RoleMiddleware("admin"), UserController.getAllUsersController);
router.get("/:id", authMiddleware, UserController.getUserByIdController);
router.put("/:id", authMiddleware, UserController.updateUserByIdController);
router.delete("/:id", authMiddleware, RoleMiddleware("admin"), UserController.deleteUserByIdController);
router.post("/logout",authMiddleware,UserController.logoutController)

export default router;
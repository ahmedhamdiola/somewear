import FeedbackController from "../controllers/FeedbackController";
import express from "express";
import authMiddleWare from "../middleware/AuthMiddleWare";
import RoleMiddleware from "../middleware/RoleMiddleWare";

const router = express.Router();

router.post("/",authMiddleWare,FeedbackController.createFeedbackController)
router.get("/",authMiddleWare,RoleMiddleware("admin"),FeedbackController.getAllFeedbacksController)
router.get("/product/:productId",FeedbackController.getFeedbackByProductIdController)
router.delete("/:id",authMiddleWare,RoleMiddleware("admin"),FeedbackController.deleteFeedbackController)

export default router;

import { Router } from "express"
import { createContactUsController, getContactUsController, getAllContactUsController } from "../controllers/ContactUsController"
import authMiddleware from "../middleware/AuthMiddleWare"

const router = Router()

router.post("/", createContactUsController)
router.get("/:id", authMiddleware, getContactUsController)
router.get("/", authMiddleware, getAllContactUsController)

export default router
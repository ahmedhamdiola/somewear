import { Router } from "express"
import { createContactUsController, getContactUsController, getAllContactUsController } from "../controllers/ContactUsController"
import authMiddleware from "../middleware/AuthMiddleWare"

const router = Router()
/**
 * @swagger
 * /contact-us:
 *   post:
 *     summary: Create a contact us message
 *     tags: [Contact Us]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact message created successfully
 */
router.post("/", createContactUsController);

/**
 * @swagger
 * /contact-us/{id}:
 *   get:
 *     summary: Get contact us message by ID
 *     tags: [Contact Us]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Contact message retrieved successfully
 *       404:
 *         description: Contact message not found
 */
router.get("/:id", authMiddleware, getContactUsController);

/**
 * @swagger
 * /contact-us:
 *   get:
 *     summary: Get all contact us messages
 *     tags: [Contact Us]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Contact messages retrieved successfully
 */
router.get("/", authMiddleware, getAllContactUsController)

export default router
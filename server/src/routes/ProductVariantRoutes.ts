import express from 'express';
import productVariantController from '../controllers/ProductVariantController';
import authMiddleWare from '../middleware/AuthMiddleWare';
import RoleMiddleware from '../middleware/RoleMiddleWare';

const router = express.Router();

/**
 * @swagger
 * /product-variants:
 *   post:
 *     summary: Create a product variant
 *     tags: [Product Variants]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - size
 *               - stock
 *             properties:
 *               productId:
 *                 type: integer
 *               size:
 *                 type: string
 *               stock:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Product variant created successfully
 *       403:
 *         description: Forbidden
 */
router.post('/',authMiddleWare,RoleMiddleware("admin"), productVariantController.createProductVariantController);

/**
 * @swagger
 * /product-variants/{id}:
 *   get:
 *     summary: Get product variant by ID
 *     tags: [Product Variants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product variant retrieved successfully
 *       404:
 *         description: Product variant not found
 */
router.get('/:id', productVariantController.getProductVariantByIdController);

/**
 * @swagger
 * /product-variants/variants/{productId}:
 *   get:
 *     summary: Get all variants of a product
 *     tags: [Product Variants]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product variants retrieved successfully
 */
router.get('/variants/:productId', productVariantController.getProductVariantsByProductIdController);

/**
 * @swagger
 * /product-variants/{id}:
 *   put:
 *     summary: Update product variant by ID
 *     tags: [Product Variants]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               size:
 *                 type: string
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product variant updated successfully
 *       403:
 *         description: Forbidden
 */
router.put('/:id', authMiddleWare,RoleMiddleware("admin"), productVariantController.updateProductVariantController);

export default router;
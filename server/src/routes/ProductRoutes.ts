import productcontroller from "../controllers/ProductController";
import express from "express";
import authMiddleWare from "../middleware/AuthMiddleWare";
import RoleMiddleware from "../middleware/RoleMiddleWare";
import upload from "../middleware/MulterMiddleWare";

const router = express.Router();

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category
 *               - subcategory
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               subcategory:
 *                 type: string
 *               soldAmount:
 *                 type: integer
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 *       403:
 *         description: Forbidden
 */
router.post(
  "/",
  authMiddleWare,
  RoleMiddleware("admin"),
  upload.single("image"),
  productcontroller.createProductController,
);

/**
 * @swagger
 * /products/product/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *       404:
 *         description: Product not found
 */
router.get("/product/:id", productcontroller.getProductByIdController);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products with pagination
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: subcategory
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 */
router.get("/", productcontroller.getAllProductsController);

/**
 * @swagger
 * /products/productsCount:
 *   get:
 *     summary: Get total number of products
 *     tags: [Products]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Total products count retrieved successfully
 */
router.get(
  "/productsCount",
  authMiddleWare,
  RoleMiddleware("admin"),
  productcontroller.getProductsCountController,
);

/**
 * @swagger
 * /products/category:
 *   get:
 *     summary: Get categories and subcategories
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 */
router.get(
  "/category",
  productcontroller.getCategoriesAndSubcategoriesController,
);

/**
 * @swagger
 * /products/featured:
 *   get:
 *     summary: Get featured products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Featured products retrieved successfully
 */
router.get("/featured", productcontroller.getFeaturedProductsController);

/**
 * @swagger
 * /products/best-sellers:
 *   get:
 *     summary: Get best seller products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Best seller products retrieved successfully
 */
router.get("/best-sellers", productcontroller.getBestSellersProductsController);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update product by ID
 *     tags: [Products]
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               subcategory:
 *                 type: string
 *               soldAmount:
 *                 type: integer
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       403:
 *         description: Forbidden
 */
router.put(
  "/:id",
  authMiddleWare,
  RoleMiddleware("admin"),
  upload.single("image"),
  productcontroller.updateProductController,
);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete product by ID
 *     tags: [Products]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       403:
 *         description: Forbidden
 */
router.delete(
  "/:id",
  authMiddleWare,
  RoleMiddleware("admin"),
  productcontroller.deleteProductController,
);

export default router;

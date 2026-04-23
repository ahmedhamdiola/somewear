import express from 'express';
import productVariantController from '../controllers/ProductVariantController';
import AuthMiddleWare from '../middleware/AuthMiddleWare';
import RoleMiddleware from '../middleware/RoleMiddleWare';

const router = express.Router();

router.post('/product-variants',AuthMiddleWare,RoleMiddleware("admin"), productVariantController.createProductVariantController);
router.get('/product-variants/:id', productVariantController.getProductVariantByIdController);
router.get('/products/:productId/variants', productVariantController.getProductVariantsByProductIdController);
router.put('/product-variants/:id', AuthMiddleWare,RoleMiddleware("admin"), productVariantController.updateProductVariantController);
router.delete('/product-variants/:id', AuthMiddleWare,RoleMiddleware("admin"), productVariantController.deleteProductVariantController);

export default router;
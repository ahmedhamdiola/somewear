import express from 'express';
import productVariantController from '../controllers/ProductVariantController';
import authMiddleWare from '../middleware/AuthMiddleWare';
import RoleMiddleware from '../middleware/RoleMiddleWare';

const router = express.Router();

router.post('/',authMiddleWare,RoleMiddleware("admin"), productVariantController.createProductVariantController);
router.get('/:id', productVariantController.getProductVariantByIdController);
router.get('/variants/:productId', productVariantController.getProductVariantsByProductIdController);
router.put('/:id', authMiddleWare,RoleMiddleware("admin"), productVariantController.updateProductVariantController);
router.delete('/:id', authMiddleWare,RoleMiddleware("admin"), productVariantController.deleteProductVariantController);

export default router;
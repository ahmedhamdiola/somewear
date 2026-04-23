import {Request, Response} from 'express';
import ProductVariantService from '../services/ProductVariantService';
import { successResponse, errorResponse } from '../utils/response';


export const createProductVariantController = (req: Request, res: Response) => {
    try {
        const productVariant = ProductVariantService.createProductVariantService(req.body);    
        return successResponse(res, productVariant, "Product variant created successfully", 201);
    } catch (error) {
        return errorResponse(res, error, "Failed to create product variant", 400);
    }
};

export const getProductVariantByIdController = (req: Request<{id: string}>, res: Response) => {
    try {
        const id = Number(req.params.id);
        const productVariant = ProductVariantService.getProductVariantByIdService(id);
        if (!productVariant) {
            return res.status(404).json({ error: "Product variant not found" });
        }
        return successResponse(res, productVariant, "Product variant found", 200);
  } catch (error) {
    return errorResponse(res, error, "Failed to get product variant", 400);
        }

    };



export const getProductVariantsByProductIdController = (req: Request<{productId: string}>, res: Response) => {
    try {
        const productId = Number(req.params.productId);
        const productVariants = ProductVariantService.getProductVariantsByProductIdService(productId);
        return successResponse(res, productVariants, "Product variants found", 200);
    }
    catch (error) {
        return errorResponse(res, error, "Failed to get product variants", 400);
    }
    };

export const updateProductVariantController = (req: Request<{id: string}>, res: Response) => {
    try {
        const id = Number(req.params.id);
        const updatedVariant = ProductVariantService.updateProductVariantService(id, req.body);
        if (!updatedVariant) {
            return res.status(404).json({ error: "Product variant not found" });
        }
        return successResponse(res, updatedVariant, "Product variant updated successfully", 200);
    } catch (error) {        
        return errorResponse(res, error, "Failed to update product variant", 400);
    }
};

export const deleteProductVariantController = (req: Request<{id: string}>, res: Response) => {
    try {
        const id = Number(req.params.id);
        const result = ProductVariantService.deleteProductVariantService(id);
        return successResponse(res, result, "Product variant deleted successfully", 200);
    } catch (error) {
        return errorResponse(res, error, "Failed to delete product variant", 400);
    }
};

export default {
createProductVariantController,
getProductVariantByIdController,
getProductVariantsByProductIdController,
updateProductVariantController,
deleteProductVariantController
};
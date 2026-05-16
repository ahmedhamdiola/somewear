import { Request, Response } from 'express';
import ProductVariantService from '../services/ProductVariantService';
import { successResponse, errorResponse } from '../utils/response';
import { AuthRequest } from '../middleware/AuthMiddleWare';


export const createProductVariantController = async (req: AuthRequest, res: Response) => {
    try {
        const productVariant = await ProductVariantService.createProductVariantService(req.body);
        return successResponse(res, productVariant, "Product variant created successfully", 201);
    } catch (error) {
        return errorResponse(res, error, "Failed to create product variant", 400);
    }
};

export const getProductVariantByIdController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const productVariant = await ProductVariantService.getProductVariantByIdService(id);
        return successResponse(res, productVariant, "Product variant found");
    } catch (error) {
        return errorResponse(res, error, "Failed to get product variant", 400);
    }

};



export const getProductVariantsByProductIdController = async (req: Request, res: Response) => {
    try {
        const productId = Number(req.params.productId);
        const productVariants = await ProductVariantService.getProductVariantsByProductIdService(productId);
        return successResponse(res, productVariants, "Product variants found");
    }
    catch (error) {
        return errorResponse(res, error, "Failed to get product variants", 400);
    }
};

export const updateProductVariantController = async (req: AuthRequest, res: Response) => {
    try {
        const id = Number(req.params.id);
        const updatedVariant = await ProductVariantService.updateProductVariantService(id, req.body);
        return successResponse(res, updatedVariant, "Product variant updated successfully");
    } catch (error) {
        return errorResponse(res, error, "Failed to update product variant", 400);
    }
};



export default {
    createProductVariantController,
    getProductVariantByIdController,
    getProductVariantsByProductIdController,
    updateProductVariantController,

};
import {Request, Response} from 'express';
import ProductVariantService from '../services/ProductVariantService';

export const createProductVariantController = (req: Request, res: Response) => {
    try {
        const productVariant = ProductVariantService.createProductVariantService(req.body);    
        return res.status(201).json(productVariant);
    } catch (error) {
        return res.status(400).json({ error: (error as Error).message });
    }
};

export const getProductVariantByIdController = (req: Request<{id: string}>, res: Response) => {
    try {
        const id = Number(req.params.id);
        const productVariant = ProductVariantService.getProductVariantByIdService(id);
        if (!productVariant) {
            return res.status(404).json({ error: "Product variant not found" });
        }
        return res.status(200).json(productVariant);
  } catch (error) {
    return res.status(400).json({
      error: (error as Error).message,
        });
    }
};

export const getProductVariantsByProductIdController = (req: Request<{productId: string}>, res: Response) => {
    try {
        const productId = Number(req.params.productId);
        const productVariants = ProductVariantService.getProductVariantsByProductIdService(productId);
        return res.status(200).json(productVariants);
    }
    catch (error) {
        return res.status(400).json({
            error: (error as Error).message,
        });
    }
};

export const updateProductVariantController = (req: Request<{id: string}>, res: Response) => {
    try {
        const id = Number(req.params.id);
        const updatedVariant = ProductVariantService.updateProductVariantService(id, req.body);
        if (!updatedVariant) {
            return res.status(404).json({ error: "Product variant not found" });
        }
        return res.status(200).json(updatedVariant);
    } catch (error) {        
        return res.status(400).json({
        error: (error as Error).message,
        });
    }
};

export const deleteProductVariantController = (req: Request<{id: string}>, res: Response) => {
    try {
        const id = Number(req.params.id);
        const result = ProductVariantService.deleteProductVariantService(id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({
            error: (error as Error).message,
        });
    }
};

export default {
createProductVariantController,
getProductVariantByIdController,
getProductVariantsByProductIdController,
updateProductVariantController,
deleteProductVariantController
};
import{Request, Response} from 'express';
import  ProductService from '../services/ProductService';
import { successResponse, errorResponse } from '../utils/response';


export const createProductController = (req: Request, res: Response) => {
    try {
        const product = ProductService.createProduct(req.body);
        return successResponse(res, product, "Product created successfully", 201);
    } catch (error) {
        return errorResponse(res, error, "Failed to create product", 400);
    }
};

export const getProductByIdController = (req: Request<{id: string}>, res: Response) => {
    try {
        const id = Number(req.params.id);
        const product = ProductService.getProductById(id);
    
        return successResponse(res, product, "Product retrieved successfully");
    }
        catch (error) {
        return errorResponse(res, error, "Failed to retrieve product", 404);
    }
};

export const getAllProductsController = (req: Request, res: Response) => {
    try {
        const { category, subcategory } = req.query;

        const products = ProductService.getAllProducts( category as string | undefined, subcategory as string | undefined);
        return successResponse(res, products, "Products retrieved successfully");
    } catch (error) {
        return errorResponse(res, error, "Failed to retrieve products");
        
    }
};

export const updateProductController = (req: Request<{id: string}>, res: Response) => {
    try {
        const id = Number(req.params.id);
        const product = ProductService.updateProduct(id, req.body);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
       return successResponse(res, product, "Product updated successfully");
    } catch (error) {
        return errorResponse(res, error, "Failed to update product", 400);
    }
};

export const deleteProductController = (req: Request<{id: string}>, res: Response) => {
    try {
        const id = Number(req.params.id);
        const result = ProductService.deleteProduct(id);
       return successResponse(res, result, "Product deleted successfully");
    } catch (error) {
        return errorResponse(res, error, "Failed to delete product", 400);
    }
};

export default {
    createProduct: createProductController,
    getProductById: getProductByIdController,
    getAllProducts: getAllProductsController,
    updateProduct: updateProductController,
    deleteProduct: deleteProductController
};


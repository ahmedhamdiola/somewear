import { Request, Response } from 'express';
import ProductService from '../services/ProductService';
import { successResponse, errorResponse } from '../utils/response';
import { AuthRequest } from '../middleware/AuthMiddleWare';
import cloudinary from '../utils/cloudinary';

export const createProductController = async(req: Request, res: Response) => {
    try {
        let imageUrl=""
        let imageId=""  

        if(req.file){
            const res= await cloudinary.uploader.upload(req.file.path)
            imageUrl=res.secure_url
            imageId=res.public_id
        }
        const product = ProductService.createProductService({...req.body,imageUrl,imageId});
        return successResponse(res, product, "Product created successfully", 201);
    } catch (error) {
        return errorResponse(res, error, "Failed to create product", 400);
    }
};

export const getProductByIdController = (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const product = ProductService.getProductByIdService(id);
        if (!product) {
            return errorResponse(res, null, "Product not found", 404);
        }
        return successResponse(res, product, "Product retrieved successfully");
    }
    catch (error) {
        return errorResponse(res, error, "Failed to retrieve product", 400);
    }
};

export const getAllProductsController = (req: Request, res: Response) => {
    try {
        const { category, subcategory } = req.query;

        const products = ProductService.getAllProductsService(category as string | undefined, subcategory as string | undefined);
        return successResponse(res, products, "Products retrieved successfully");
    } catch (error) {
        return errorResponse(res, error, "Failed to retrieve products", 400);

    }
};

export const getCategoriesAndSubcategoriesController = (req: Request, res: Response) => {
    try {
        const categoriesAndSubcategories = ProductService.getCategoriesAndSubcategoriesService();
        return successResponse(res, categoriesAndSubcategories, "Categories and subcategories retrieved successfully");
    } catch (error) {
        return errorResponse(res, error, "Failed to retrieve categories and subcategories");
    }
}

export const getFeaturedProductsController = (req: Request, res: Response) => {
    try {
        const products = ProductService.getFeaturedProductService();
        return successResponse(res, products, "Featured products retrieved successfully")
    } catch (error) {
        return errorResponse(res, error, "Failed to retrieve Featured products", 400)
    }

}


export const getBestSellersProductsController = (req: Request, res: Response) => {
    try {
        const products = ProductService.getBestSellersProductService();
        return successResponse(res, products, "Best sellers retrieved successfully")
    } catch (error) {
        return errorResponse(res, error, "Failed to retrieve best sellers", 400)
    }

}

export const updateProductController = async(req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const existing =ProductService.getProductByIdService(id)
        if(!existing){
            return errorResponse(res,null,"Product not found",404)
        }
        let imageUrl=existing.imageUrl
        let imageId=existing.imageId

        if(req.file){
            //del.old
            if(existing.imageId){
                await cloudinary.uploader.destroy(existing.imageId)
            }
            //up new
            const res =await cloudinary.uploader.upload(req.file.path)

            imageUrl=res.secure_url
            imageId=res.public_id
        }

        const product = ProductService.updateProductService(id,{... req.body,imageUrl,imageId});
        return successResponse(res, product, "Product updated successfully");
    } catch (error) {
        return errorResponse(res, error, "Failed to update product", 400);
    }
};

export const deleteProductController =async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const existing =ProductService.getProductByIdService(id)
        if(!existing){
            return errorResponse(res,null,"Product not found",404)
        }
        //del(cloud)
        if(existing.imageId){
            await cloudinary.uploader.destroy(existing.imageId)

        }

        const result = ProductService.deleteProductService(id);
        return successResponse(res, result, "Product deleted successfully");
    } catch (error) {
        return errorResponse(res, error, "Failed to delete product", 400);
    }
};

export default {
    createProductController,
    getProductByIdController,
    getAllProductsController,
    getCategoriesAndSubcategoriesController,
    getFeaturedProductsController,
    getBestSellersProductsController,
    updateProductController,
    deleteProductController
};


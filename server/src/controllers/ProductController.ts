import{Request, Response} from 'express';
import  ProductService from '../services/ProductService';
import { successResponse, errorResponse } from '../utils/response';


export const createProductController = (req: Request, res: Response) => {
    try {
        const product = ProductService.createProductService(req.body);
        return successResponse(res, product, "Product created successfully", 201);
    } catch (error) {
        return errorResponse(res, error, "Failed to create product", 400);
    }
};

export const getProductByIdController = (req: Request<{id: string}>, res: Response) => {
    try {
        const id = Number(req.params.id);
        const product = ProductService.getProductByIdService(id);
    
        return successResponse(res, product, "Product retrieved successfully");
    }
        catch (error) {
        return errorResponse(res, error, "Failed to retrieve product", 404);
    }
};

export const getAllProductsController = (req: Request, res: Response) => {
    try {
        const { category, subcategory } = req.query;

        const products = ProductService.getAllProductsService( category as string | undefined, subcategory as string | undefined);
        return successResponse(res, products, "Products retrieved successfully");
    } catch (error) {
        return errorResponse(res, error, "Failed to retrieve products");
        
    }
};

export const getCategoriesAndSubcategoriesController=(req:Request,res:Response)=>{
    try{
        const categoriesAndSubcategories=ProductService.getCategoriesAndSubcategoriesService();
        return successResponse(res, categoriesAndSubcategories, "Categories and subcategories retrieved successfully");
    }catch(error){
        return errorResponse(res, error, "Failed to retrieve categories and subcategories");   
    }
}

export const getFeaturedProductsController=(req:Request,res:Response)=>{
    try{
        const products=ProductService.getFeaturedProductService();
        successResponse(res,products,"Featured products retrieved successfully",200)
    }catch(error){
        return errorResponse(res,error,"Failed to retrieve Featured products",400)
    }

}


export const getBestSellersProductsController=(req:Request,res:Response)=>{
    try{
        const products=ProductService.getBestSellersProductService();
        successResponse(res,products,"Best sellers retrieved successfully",200)
    }catch(error){
        return errorResponse(res,error,"Failed to retrieve best sellers",400)
    }

}

export const updateProductController = (req: Request<{id: string}>, res: Response) => {
    try {
        const id = Number(req.params.id);
        const product = ProductService.updateProductService(id, req.body);
       return successResponse(res, product, "Product updated successfully");
    } catch (error) {
        return errorResponse(res, error, "Failed to update product", 400);
    }
};

export const deleteProductController = (req: Request<{id: string}>, res: Response) => {
    try {
        const id = Number(req.params.id);
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


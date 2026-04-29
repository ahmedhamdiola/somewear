import { ProductVariantInterface } from '../interfaces/ProductVariantInterface';
import  ProductVariantRepository from '../repository/ProductVariantRepository';

export const createProductVariantService = (variant: ProductVariantInterface): ProductVariantInterface => {
    // validation
    if (!variant.productId || variant.productId <= 0) {
        throw new Error("Product ID is required and must be greater than zero");
    }
    if (variant.stock < 0 || variant.stock === undefined) {
        throw new Error("Stock must be a non-negative number");
    }
    if(  variant.size.trim() === "") {
        throw new Error("Size cannot be empty");
    }

    return ProductVariantRepository.createProductVariant(variant);
};

export const getProductVariantByIdService = (id: number): ProductVariantInterface | null => {
    if (!id || id <= 0) {
        throw new Error("Invalid product variant ID");
    }
    return ProductVariantRepository.getProductVariantById(id);
};

export const getProductVariantsByProductIdService = (productId: number): ProductVariantInterface[] => {
    if (!productId || productId <= 0) {
        throw new Error("Invalid product ID");
    }
    return ProductVariantRepository.getProductVariantsByProductId(productId);
};

export const updateProductVariantService = (id: number, variant: Partial<ProductVariantInterface>): ProductVariantInterface | null => {
    if (!id || id <= 0) {
        throw new Error("Invalid product variant ID");
    }
    if (variant.stock !== undefined && variant.stock < 0) {
        throw new Error("Stock cannot be negative");
    }
    if(  variant.size?.trim() === "") {
        throw new Error("Size cannot be empty");
    }
    return ProductVariantRepository.updateProductVariant(id, variant);
};

//delete product variant
export const deleteProductVariantService = (id: number): {message: string} => {
    if (!id || id <= 0) {
        throw new Error("Invalid product variant ID");
    }
    
    return ProductVariantRepository.deleteProductVariant(id);
};

export default {
    createProductVariantService,
    getProductVariantByIdService,
    getProductVariantsByProductIdService,
    updateProductVariantService,
    deleteProductVariantService
};
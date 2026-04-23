
import { ProductInterface } from '../interfaces/ProductInterface';
import  ProductRepository from '../repository/ProductRepository';


export const createProductService = (product: ProductInterface): ProductInterface => {
    // validation
    if (!product.name || product.name.trim() === "") {
        throw new Error("Name is required");
    }

    if ( !product.price || product.price <= 0) {
        throw new Error("Price must be greater than zero");
    }

    if( product.category && product.category.trim() === "") {
        throw new Error("Category cannot be empty");
    }

    if( product.subcategory && product.subcategory.trim() === "") {
        throw new Error("Subcategory cannot be empty");
    }

    if( product.description && product.description.trim() === "") {
        throw new Error("Description cannot be empty");
    }

    if( product.imageUrl && product.imageUrl.trim() === "") {
        throw new Error("Image URL cannot be empty");
    }

  return ProductRepository.createProduct(product);
}

export const getProductByIdService = (id: number): ProductInterface | null => {
    if( !id || id <= 0) {
        throw new Error("Invalid product ID");
    }
    
  return ProductRepository.getProductById(id);
}

export const getAllProductsService = ( category?: string,
  subcategory?: string): ProductInterface[] => {
    // validation
    if (category && category.trim() === "") {
        throw new Error("Category cannot be empty");
    }
    if (subcategory && subcategory.trim() === "") {
        throw new Error("Subcategory cannot be empty");
    }
    
  return ProductRepository.getAllProducts(category, subcategory);
}

export const updateProductService = (id: number, product: ProductInterface): ProductInterface | null => {
    if( !id || id <= 0) {
        throw new Error("Invalid product ID");
    }
    
        if (product.name !== undefined && product.name.trim() === "") {
        throw new Error("Name cannot be empty");
    }
    if (product.price !== undefined && product.price <= 0) {
        throw new Error("Price must be greater than zero");
    }
    if (product.category !== undefined && product.category !== null && product.category.trim() === "") {
        throw new Error("Category cannot be empty");
    }
    if (product.subcategory !== undefined && product.subcategory !== null && product.subcategory.trim() === "") {
        throw new Error("Subcategory cannot be empty");
    }
    if (product.description !== undefined && product.description !== null && product.description.trim() === "") {
        throw new Error("Description cannot be empty");
    }
    if (product.imageUrl !== undefined && product.imageUrl !== null && product.imageUrl.trim() === "") {
        throw new Error("Image URL cannot be empty");
    }

  return ProductRepository.updateProduct(id, product);
}

export const deleteProductService = (id: number): { message: string } => {
    if (!id || id <= 0) {
        throw new Error("Invalid product ID");
    }
    
  return ProductRepository.deleteProduct(id);
}

export default {
  createProduct: createProductService,
  getProductById: getProductByIdService,
  getAllProducts: getAllProductsService,
  updateProduct: updateProductService,
  deleteProduct: deleteProductService
};

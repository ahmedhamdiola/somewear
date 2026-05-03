
import { ProductInterface } from '../interfaces/ProductInterface';
import ProductRepository, { getProductById } from '../repository/ProductRepository';


export const createProductService = (product: ProductInterface): ProductInterface => {
    // validation
    if (!product.name || product.name.trim() === "") {
        throw new Error("Name is required");
    }

    if (!product.price || product.price <= 0) {
        throw new Error("Price must be greater than zero");
    }

    if (product.category && product.category.trim() === "") {
        throw new Error("Category cannot be empty");
    }

    if (product.subcategory && product.subcategory.trim() === "") {
        throw new Error("Subcategory cannot be empty");
    }

    if (product.description && product.description.trim() === "") {
        throw new Error("Description cannot be empty");
    }

    if (product.imageUrl && product.imageUrl.trim() === "") {
        throw new Error("Image URL cannot be empty");
    }

    if (product.createdAt && isNaN(Date.parse(product.createdAt))) {
        throw new Error("Invalid createdAt date format");
    }
    if (product.soldAmount && (isNaN(product.soldAmount) || product.soldAmount < 0)) {
        throw new Error("Sold amount must be a non-negative number");
    }

    return ProductRepository.createProduct(product);
}

export const getProductByIdService = (id: number): ProductInterface | null => {
    if (!id || id <= 0) {
        throw new Error("Invalid product ID");
    }

    return ProductRepository.getProductById(id);
}

export const getAllProductsService = (category?: string,
    subcategory?: string, page?:number,limit?:number): ProductInterface[] => {
    // validation
    if (category && category.trim() === "") {
        throw new Error("Category cannot be empty");
    }
    if (subcategory && subcategory.trim() === "") {
        throw new Error("Subcategory cannot be empty");
    }
    if(!page || page<=0){
        page=1
    }
    if(!limit ||limit <=0){
        limit =10
    }
    if(limit>20){
        limit =20
    }


    return ProductRepository.getAllProducts(category, subcategory,page,limit);
}

export const getCategoriesAndSubcategoriesService = (): { category: string, subcategory: string }[] => {
    return ProductRepository.getCategoriesAndSubcategories();
}

export const getFeaturedProductService = (): ProductInterface[] => {
    return ProductRepository.getFeaturedProducts();
}

export const getBestSellersProductService = (): ProductInterface[] => {
    return ProductRepository.getBestSellersProducts();
}


export const updateProductService = (id: number, product: Partial<ProductInterface>): ProductInterface | null => {
    if (!id || id <= 0) {
        throw new Error("Invalid product ID");
    }

    if (product.name && product.name.trim() === "") {
        throw new Error("Name cannot be empty");
    }
    if (product.price && product.price <= 0) {
        throw new Error("Price must be greater than zero");
    }
    if (product.category && product.category.trim() === "") {
        throw new Error("Category cannot be empty");
    }
    if (product.subcategory && product.subcategory.trim() === "") {
        throw new Error("Subcategory cannot be empty");
    }
    if (product.description && product.description.trim() === "") {
        throw new Error("Description cannot be empty");
    }
    if (product.imageUrl && product.imageUrl.trim() === "") {
        throw new Error("Image URL cannot be empty");
    }

    return ProductRepository.updateProduct(id, product);
}

export const deleteProductService = (id: number): boolean => {
    if (!id || id <= 0) {
        throw new Error("Invalid product ID");
    }
    const product = getProductById(id);
    if (!product) {
        throw new Error("ID not found");
    }
    if (!ProductRepository.deleteProduct(id)) {
        return false
    }
    return true;
}

export default {
    createProductService,
    getProductByIdService,
    getAllProductsService,
    getCategoriesAndSubcategoriesService,
    getFeaturedProductService,
    getBestSellersProductService,
    updateProductService,
    deleteProductService
};

import db from "../config/db";
import { ProductVariantInterface } from "../interfaces/ProductVariantInterface";

//create product variant
export const createProductVariant = (variant: ProductVariantInterface): ProductVariantInterface => {
    const stmt = db.prepare <[
        number,
        string | null,
        string | null,
        number
    ]>(
        "INSERT INTO product_variants (productId, color, size, stock) VALUES (?, ?, ?, ?)"
    );
    const res = stmt.run(
        variant.productId,
        variant.color ?? null,
        variant.size ?? null,
        variant.stock
    );
    return { ...variant, id: res.lastInsertRowid as number };
};

//get product variant by id
export const getProductVariantById = (id: number): ProductVariantInterface | null => {
    const stmt = db.prepare<[number], ProductVariantInterface>(
        "SELECT * FROM product_variants WHERE id = ?"
    );
    const variant = stmt.get(id);
    return variant || null;
};

//get product variants by product id
export const getProductVariantsByProductId = (productId: number): ProductVariantInterface[] => {
    const stmt = db.prepare<[number], ProductVariantInterface>(
        "SELECT * FROM product_variants WHERE productId = ?"
    );
    return stmt.all(productId);
};

//update product variant
export const updateProductVariant = (id: number, variant:Partial<ProductVariantInterface>): ProductVariantInterface | null => {
    const existingVariant = getProductVariantById(id);
    if (!existingVariant) {
        return null;
    }
    const stmt = db.prepare <[ number, string | null, string | null, number,number ],void>(
        "UPDATE product_variants SET productId = ?, color = ?, size = ?, stock = ? WHERE id = ?"
    );  
    const res = stmt.run(
        variant.productId ?? existingVariant.productId,
        variant.color ?? existingVariant.color?? null,
        variant.size ?? existingVariant.size?? null,
        variant.stock ?? existingVariant.stock,
        id
    );
    if (res.changes === 0) {
        return null;
    }
    return  getProductVariantById(id);
};

//delete product variant    
export const deleteProductVariant = (id: number): {message: string} => {
    const stmt = db.prepare<[number], void>(
        "DELETE FROM product_variants WHERE id = ?"
    );
    const res = stmt.run(id);
    if (res.changes > 0) {
        return { message: "Product variant deleted successfully" };
    }
    throw new Error("Product variant not found");
};

export default {
    createProductVariant,
    getProductVariantById,
    getProductVariantsByProductId,
    updateProductVariant,
    deleteProductVariant
};

import db from "../config/db";
import { ProductVariantInterface } from "../interfaces/ProductVariantInterface";

//create product variant
export const createProductVariant = (variant: ProductVariantInterface): ProductVariantInterface => {
    const stmt = db.prepare(
        "INSERT INTO product_variants (productId, size, stock) VALUES (?, ?, ?)"
    );
    const res = stmt.run(
        variant.productId,
        variant.size,
        variant.stock
    );
    return { id: Number(res.lastInsertRowid), ...variant };
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



//update stock
export const updateStock=(id:number, stock:number):ProductVariantInterface =>{
    const stmt = db.prepare(`
    UPDATE product_variants
    SET stock = ?
    WHERE id = ?
  `);

  const result = stmt.run(stock, id);
   if (result.changes === 0) {
    throw new Error("Failed to update stock");
  }

    return getProductVariantById(id)!;

}



//update product variant
export const updateProductVariant = (id: number, variant: Partial<ProductVariantInterface>): ProductVariantInterface | null => {
    const existingVariant = getProductVariantById(id);
    const stmt = db.prepare(
        "UPDATE product_variants SET productId = ?, size = ?, stock = ? WHERE id = ?"
    );
    stmt.run(
        variant.productId ?? existingVariant?.productId,
        variant.size ?? existingVariant?.size,
        variant.stock ?? existingVariant?.stock,
        id
    );
    return getProductVariantById(id);
};

//delete product variant    
export const deleteProductVariant = (id: number): boolean => {
    const stmt = db.prepare<[number], { changes: number }>(
        "DELETE FROM product_variants WHERE id = ?"
    );
    const res = stmt.run(id);
    if (res.changes === 0) {
        return false
    }
    return true;
};

export default {
    createProductVariant,
    getProductVariantById,
    getProductVariantsByProductId,
    updateProductVariant,
    updateStock,
    deleteProductVariant
};

import db from '../config/db';
import { ProductInterface } from '../interfaces/ProductInterface';



//create product 
type CreateProductInput = Omit<ProductInterface, "id">;
export const createProduct = (product: ProductInterface): ProductInterface => {
  const stmt = db.prepare(`
    INSERT INTO products ( name, description, price, imageUrl, imageId, category, subcategory, createdAt, soldAmount)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    product.name,
    product.description,
    product.price,
    product.imageUrl,
    product.imageId,
    product.category,
    product.subcategory,
    product.createdAt || new Date().toISOString(),
    product.soldAmount || 0
  );
  return {
    id: Number(result.lastInsertRowid),
    ...product
  };
};


//get product by id
export const getProductById = (id: number): ProductInterface | null => {
  const res = db.prepare<[number], ProductInterface>(`
    SELECT * FROM products WHERE id = ?
  `);
  const productData = res.get(id);
  return productData || null;
};


//get all products
export const getAllProducts = (category?: string,
  subcategory?: string): ProductInterface[] => {

  let query = "SELECT * FROM products";
  const params: (string | undefined)[] = [];

  if (category && subcategory) {
    query += " WHERE category = ? AND subcategory = ?";
    params.push(category, subcategory);
  }

  const stmt = db.prepare<string[], ProductInterface>(query);
  return stmt.all(...params as string[]);


};

//get category and subcategory
export const getCategoriesAndSubcategories = (): { category: string, subcategory: string }[] => {
  const res = db.prepare<[], { category: string, subcategory: string }>(`
    SELECT DISTINCT category, subcategory FROM products
  `);
  return res.all();
};


//get featured products
export const getFeaturedProducts = (): ProductInterface[] => {
  const Feature = db.prepare<string[], ProductInterface>(
    "SELECT * FROM products ORDER BY createdAt DESC LIMIT 5"
  );
  return Feature.all();
};



//get best sellers products
export const getBestSellersProducts = (): ProductInterface[] => {
  const BestSellers = db.prepare<string[], ProductInterface>(
    "SELECT * FROM products ORDER BY soldAmount DESC LIMIT 5"
  );
  return BestSellers.all();
}


//update product
type UpdateProductInput = Omit<ProductInterface, "id">;

export const updateProduct = (id: number, product: Partial<UpdateProductInput>): ProductInterface | null => {
  const exisitingProduct = getProductById(id)
  const stmt = db.prepare(`
    UPDATE products
    SET name = ?, description = ?, price = ?, imageUrl = ?, imageId=? , category = ?, subcategory = ?, soldAmount = ?
    WHERE id = ?
  `);
  stmt.run(
    product.name ?? exisitingProduct?.name,
    product.description ?? exisitingProduct?.description,
    product.price ?? exisitingProduct?.price,
    product.imageUrl ?? exisitingProduct?.imageUrl,
    product.imageId ?? exisitingProduct?.imageId,
    product.category ?? exisitingProduct?.category,
    product.subcategory ?? exisitingProduct?.subcategory,
    product.soldAmount ?? exisitingProduct?.soldAmount,
    id
  );
  return getProductById(id);
};




//delete product
export const deleteProduct = (id: number): boolean => {

  const stmt = db.prepare<[number], { changes: number }>(`
    DELETE FROM products WHERE id = ?
  `);

  const res = stmt.run(id);
  if (res.changes === 0) {
    return false;
  }
  return true;

};

export default {
  createProduct,
  getProductById,
  getAllProducts,
  getCategoriesAndSubcategories,
  getFeaturedProducts,
  getBestSellersProducts,
  updateProduct,
  deleteProduct
};
import db from '../config/db';
import { ProductInterface } from '../interfaces/ProductInterface';



//create product 
 export const createProduct = (product: ProductInterface): ProductInterface => {
  const stmt = db.prepare<
    [
      string,
      string | null,
      number,
      string | null,
      string | null,
      string | null
    ],
    ProductInterface
  >(`
    INSERT INTO products ( name, description, price, imageUrl, category, subcategory)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    product.name,
    product.description ?? null,
    product.price,
    product.imageUrl ?? null,
    product.category ?? null,
    product.subcategory ?? null
  );
  return {
    id: result.lastInsertRowid as number,
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
  try {
    let query = "SELECT * FROM products";
    const params: (string | undefined)[] = [];

    if (category && subcategory) {
      query += " WHERE category = ? AND subcategory = ?";
      params.push(category, subcategory);
    }
    else if (category && category.trim() !== "") {
      query += " WHERE category = ?";
      params.push(category);
    }
      else if (subcategory && subcategory.trim() !== "") {
      query += " WHERE subcategory = ?";
      params.push(subcategory);
    }

    const stmt = db.prepare<string[], ProductInterface>(query);
    return stmt.all(...params as string[]);

  }
   catch (error) {
    throw new Error("Error fetching products: " + (error as Error).message);
  }
};

//update product
    export const updateProduct = (id: number, product:Partial<ProductInterface>): ProductInterface | null => {
        
        const existing = getProductById(id);
        if(!existing) {
            throw new Error("Product not found");
        }
     const stmt = db.prepare<
    [
      string,
      string | null,
      number,
      string | null,
      string | null,
      string | null,
      number
    ],
    void
  >(`
    UPDATE products
    SET name = ?, description = ?, price = ?, imageUrl = ?, category = ?, subcategory = ?
    WHERE id = ?
  `);
  stmt.run(
    product.name ?? existing.name,
    product.description ?? existing.description ?? null,
    product.price ?? existing.price,
    product.imageUrl ?? existing.imageUrl ?? null,
    product.category ?? existing.category ?? null,
    product.subcategory ?? existing.subcategory ?? null,
    id
  );
  return getProductById(id);
};




//delete product
    export const deleteProduct = (id: number): {message: string} => {
    
        
    const stmt = db.prepare<[number], void>(`
    DELETE FROM products WHERE id = ?
  `);

 const res = stmt.run(id);
  if (res.changes > 0) {
    return {
      message: "Product deleted successfully"
    };
  }
  throw new Error("Product not found");

};
    
export default {
    createProduct : createProduct,
    getProductById : getProductById,
    getAllProducts : getAllProducts,
    updateProduct : updateProduct,
    deleteProduct : deleteProduct
};
export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
};


let products: Product[] = [
  {
    id: "1",
    name: "Hoodie",
    price: 300,
    description: "Oversized hoodie",
    stock: 10,
  },
  {
    id: "2",
    name: "T-shirt",
    price: 200,
    description: "Basic cotton t-shirt",
    stock: 5,
  },
];

// GET
export const getProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 300);
  });
};

// DELETE
export const deleteProduct = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    products = products.filter((p) => p.id !== id);
    setTimeout(() => resolve(), 200);
  });
};

// UPDATE
export const updateProduct = async (updated: Product): Promise<void> => {
  return new Promise((resolve) => {
    products = products.map((p) =>
      p.id === updated.id ? updated : p
    );
    setTimeout(() => resolve(), 200);
  });
};

// ADD
export const addProduct = async (newProduct: Product): Promise<void> => {
  return new Promise((resolve) => {
    products.push(newProduct);
    setTimeout(() => resolve(), 200);
  });
};
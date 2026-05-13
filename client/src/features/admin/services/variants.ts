import axios from "axios";

export type ProductVariant = {
  id: number;
  productId: number;
  size: string;
  stock: number;
};

const API_URL = "http://localhost:3000/variants";
const config = { withCredentials: true };

export const getProductVariants = async (productId: number): Promise<ProductVariant[]> => {
  const response = await axios.get(`${API_URL}/variants/${productId}`);
  return response.data.data;
};

export const addProductVariant = async (newVariant: Omit<ProductVariant, "id">): Promise<ProductVariant> => {
  const response = await axios.post(API_URL, newVariant, config);
  return response.data.data;
};

export const updateProductVariant = async (id: number, stock: number): Promise<void> => {
  await axios.put(`${API_URL}/${id}`, { stock }, config);
};

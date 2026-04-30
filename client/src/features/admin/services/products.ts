import axios from "axios";

export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  subcategory: string;
  imageUrl: string;
  soldAmount?: number;
  createdAt?: string;
};

const API_URL = "http://localhost:3000/products"; // Base URL for products

// Helper to get auth header
const getAuthHeaders = () => {
  const token = localStorage.getItem("token") || "";
  return {
    headers: {  
      Authorization: `Bearer ${token}`,
    },
  };
};

// GET
export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get(API_URL);
  // Backend returns { success: true, message: "...", data: [...] }
  return response.data.data;
};

// DELETE
export const deleteProduct = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};

// UPDATE
export const updateProduct = async (updated: Product): Promise<void> => {
  await axios.put(`${API_URL}/${updated.id}`, updated, getAuthHeaders());
};

// ADD
export const addProduct = async (newProduct: Omit<Product, 'id' | 'soldAmount' | 'createdAt'>): Promise<Product> => {
  const response = await axios.post(API_URL, newProduct, getAuthHeaders());
  return response.data.data;
};

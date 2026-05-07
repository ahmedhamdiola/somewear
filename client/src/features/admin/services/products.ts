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

export type ProductFormData = {
  name: string;
  price: number;
  description: string;
  category: string;
  subcategory: string;
  image?: File; // the actual file to upload
};

const API_URL = "http://localhost:3000/products";

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
  return response.data.data;
};

// DELETE
export const deleteProduct = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};

// ADD — sends FormData so the server can upload the image to Cloudinary
export const addProduct = async (data: ProductFormData): Promise<Product> => {
  const form = new FormData();
  form.append("name", data.name);
  form.append("description", data.description);
  form.append("price", String(data.price));
  form.append("category", data.category);
  form.append("subcategory", data.subcategory);
  if (data.image) form.append("image", data.image);

  const response = await axios.post(API_URL, form, getAuthHeaders());
  return response.data.data;
};

// UPDATE — sends FormData so a new image can optionally be uploaded
export const updateProduct = async (id: number, data: ProductFormData): Promise<void> => {
  const form = new FormData();
  form.append("name", data.name);
  form.append("description", data.description);
  form.append("price", String(data.price));
  form.append("category", data.category);
  form.append("subcategory", data.subcategory);
  if (data.image) form.append("image", data.image);

  await axios.put(`${API_URL}/${id}`, form, getAuthHeaders());
};


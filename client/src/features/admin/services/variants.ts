import axios from "axios";

export type ProductVariant = {
  id: number;
  productId: number;
  size: string;
  stock: number;
};

const API_URL = "http://localhost:3000/variants";

const getAuthHeaders=()=>{
  const token = localStorage.getItem("token")|| "";
  return {
    headers:{
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getProductVariants=async(productId:number):Promise<ProductVariant[]> => {
  const response = await axios.get(`${API_URL}/variants/${productId}`);
  return response.data.data;
};

export const addProductVariant = async (newVariant: Omit<ProductVariant,"id">): Promise<ProductVariant> =>{
  const response = await axios.post(API_URL, newVariant, getAuthHeaders());
  return response.data.data;
};

// // DELETE variant
// export const deleteProductVariant = async (id: number): Promise<void> => {
//   await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
// };

export const updateProductVariant = async (id: number, stock: number): Promise<void>=>{
  await axios.put(`${API_URL}/${id}`, { stock }, getAuthHeaders());
};

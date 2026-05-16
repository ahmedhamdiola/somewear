import axios from "axios";

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

const API_URL = "http://localhost:3000";
const config = { withCredentials: true };

export const getAllMessages = async (): Promise<ContactMessage[]> => {
  const res = await axios.get(`${API_URL}/contact`, config);
  return res.data.data;
};  

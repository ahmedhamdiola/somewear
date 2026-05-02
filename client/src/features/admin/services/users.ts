import axios from "axios";

export type User = {
  id: string;
  username: string;
  email: string;
  phone: string;
  role: string;
};

const API_URL = "http://localhost:3000";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token") || "";
  return { headers: { Authorization: `Bearer ${token}` } };
};

// GET all users
export const getUsers = async (): Promise<User[]> => {
  const res = await axios.get(`${API_URL}/users`, getAuthHeaders());
  return res.data.data;
};

// DELETE user
export const deleteUser = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/users/${id}`, getAuthHeaders());
};
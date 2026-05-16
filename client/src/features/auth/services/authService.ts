import axios from "axios";

const API_URL = "http://localhost:3000/users";
const config = { withCredentials: true };

export const registerService = async (data: {
  username: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}) => {
  const response = await axios.post(
    `${API_URL}/register`,
    { ...data, role: "customer" },
    config
  );
  return response.data; 
};

export const loginService = async (data: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/login`, data, config);
  return response.data;
};
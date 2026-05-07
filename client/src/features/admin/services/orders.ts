import axios from "axios";

export type Order = {
  id:string;
  customerName:string;
  email: string;
  phone:string
  date: string
  address: string
  total: number
  status: "pending" |"delivered" |"cancelled";
};

export type OrderItem = {
  id: number;
  orderId: number;
  productVariantId: number;
  productName: string;
  size: string;
  quantity: number;
  price: number;
};

const API_URL ="http://localhost:3000";
const getAuthHeaders=()=>{
  const token = localStorage.getItem("token")||"";
  return { headers:{ Authorization: `Bearer ${token}`} };
};

// GET all orders
export const getOrders = async (): Promise<Order[]> => {
  const res = await axios.get(`${API_URL}/order`, getAuthHeaders());
  return res.data.data;
};

// GET items for a specific order
export const getOrderItems = async (orderId: string): Promise<OrderItem[]> => {
  const res = await axios.get(`${API_URL}/orderItem/items/${orderId}`, getAuthHeaders());
  return res.data.data;
};

// UPDATE order status
export const updateOrderStatus = async (
  id: string,
  status: Order["status"]
): Promise<void> => {
  await axios.patch(`${API_URL}/order/status/${id}`, { status }, getAuthHeaders());
};
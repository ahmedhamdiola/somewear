import axios from "axios";

const API_URL = "http://localhost:3000";

export interface ContactUsPayload {
  name: string
  email: string
  phone: string
  message: string
}
export const sendContactMessage = async (payload: ContactUsPayload)=>{
  const res = await axios.post(`${API_URL}/contact`, payload);
  return res.data;
};

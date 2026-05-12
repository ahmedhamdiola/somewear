import axios from "axios";

const API_URL = "http://localhost:3000/order/checkout";

export const checkout = async (data: {
    shippingFees: number;
    city: string;
    address: string;
    phone: string;
}) => {
    const res = await axios.post(
        API_URL,
        data,
        {
            withCredentials: true
        }
    );

    return res.data;
};
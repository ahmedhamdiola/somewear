import axios from "axios"
import type { UserInterface } from "./interfaces"

const API_URL = "http://localhost:3000"

export const getUserProfile = async () => {
    const response = await axios.get(
        `${API_URL}/users/getProfile`,
        {
            withCredentials: true
        }
    )
    return response.data.data
}

export const updateUserProfile = async (userData: UserInterface) => {
    await axios.put(
        `${API_URL}/users/updateProfile`,
        userData,
        {
            withCredentials: true
        }
    )
}

export const getOrdersCount = async () => {
    const res = await axios.get(
        `${API_URL}/order/myCounts`,
        {
            withCredentials: true
        }
    )
    return res.data.data
}

export const getTotalAmount = async () => {
    const res = await axios.get(
        `${API_URL}/order/myTotalAmount`,
        {
            withCredentials: true
        }
    )
    return res.data.data
}

export const getLastOrders = async () => {
    const res = await axios.get(
        `${API_URL}/order/myLastOrders`,
        {
            withCredentials: true
        }
    )
    return res.data.data
}

export const getAllOrders = async () => {
    const res = await axios.get(
        `${API_URL}/order/myOrders`,
        {
            withCredentials: true
        }
    )
    return res.data.data
}

export const cancelOrder = async (orderId: number) => {
    await axios.patch(
        `${API_URL}/order/cancel/${orderId}`,
        {},
        {
            withCredentials: true
        }
    )
}

export const logout = async () => {
    await axios.post(
        `${API_URL}/users/logout`,
        {},
        {
            withCredentials: true
        }
    )
}
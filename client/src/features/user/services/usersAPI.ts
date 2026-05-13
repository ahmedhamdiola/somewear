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
    console.log(res)
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
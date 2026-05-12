import axios from "axios"

const API_URL = "http://localhost:3000/feedback"

// GET feedback by product
export const getFeedbackByProduct = async (productId: number) => {
    const res = await axios.get(`${API_URL}/product/${productId}`, {
        withCredentials: true
    })

    return res.data.data
}

// CREATE feedback
export const createFeedback = async (data: {
    name: string
    userId: number
    productId: number
    comment: string
    rating: number
}) => {
    const res = await axios.post(API_URL, data, {
        withCredentials: true
    })

    return res.data.data
}

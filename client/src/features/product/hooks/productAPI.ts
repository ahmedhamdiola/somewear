import axios from "axios"
export const API_URL = "http://localhost:3000/variants/"
export const getProductVariantByProductId = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}variants/${id}`)
        console.log("Product variant data:", response.data)
        return response.data
    } catch (error) {
        console.error("Error fetching product variant:", error)
        throw error
    }
}
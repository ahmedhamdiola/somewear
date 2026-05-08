import axios from "axios"
import { getProductVariantByProductId } from "../../product/hooks/productAPI"

const API_URL = "http://localhost:3000/cart"
const getToken = () => localStorage.getItem("token")

export const addToCart = async (data: { productId: string, size: string, quantity: number }) => {
    const res = await getProductVariantByProductId(data.productId)
    const variants = res.data
    const selectedVariant = variants.find(
        (variant: { size: string }) => variant.size === data.size
    )
    if (!selectedVariant) {
        throw new Error("Selected size not found")
    }
    if (selectedVariant.stock <= 0) {
        throw new Error("This size is out of stock")
    }
    const response = await axios.post(
        `${API_URL}`,
        {
            productVariantId: selectedVariant.id,
            quantity: data.quantity
        },
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    )
    return response.data
}

export const getCartItems = async (userId: number) => {
    const response = await axios.get(
        `${API_URL}/${userId}`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    )
    return response.data.data
}

export const updateCartItemQuantity = async (id: number, quantity: number) => {
    const res = await axios.patch(
        `${API_URL}/${id}`,
        { quantity },
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    )
    return res.data
}

export const deleteCartItem = async (id: number) => {
    const res = await axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
    return res.data
}
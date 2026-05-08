import { useEffect, useState } from "react"
import type { CartItem } from "../utils/types"
import { getCartItems } from "../services/cartAPI"
import { updateCartItemQuantity, deleteCartItem } from "../services/cartAPI"
import type { AxiosError } from "axios"

export const useCart = (userId: number) => {
    const [cart, setCart] = useState<CartItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchCart = async () => {
            try {
                setLoading(true)
                const res = await getCartItems(userId)
                setCart(res)
            } catch (err) {
                const error = err as AxiosError
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchCart()
    }, [userId])

    const updateQty = async (id: number, quantity: number) => {
        await updateCartItemQuantity(id, quantity)
        setCart(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        )
    }

    const remove = async (id: number) => {
        await deleteCartItem(id)
        setCart(prev => prev.filter(item => item.id !== id))
    }


    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )

    return {
        cart,
        loading,
        error,
        subtotal,
        updateQty,
        remove
    }
}
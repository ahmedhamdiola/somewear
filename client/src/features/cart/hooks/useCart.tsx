import { useState } from "react"
import type { CartItem } from "../utils/types"
import { removeItem, updateQuantity } from "../utils/cartActions"

export const useCart = (initialCart: CartItem[]) => {
    const [cart, setCart] = useState<CartItem[]>(initialCart)

    const updateQty = (id: number, delta: number) => {
        setCart(prev => updateQuantity(prev, id, delta))
    }

    const remove = (id: number) => {
        setCart(prev => removeItem(prev, id))
    }

    const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0)

    return {
        cart,
        updateQty,
        remove,
        subtotal
    }
}
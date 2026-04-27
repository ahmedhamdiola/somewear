import type { CartItem } from "./types"

export const addItem = (cart: CartItem[], newItem: CartItem): CartItem[] => {
    const existing = cart.find(item => item.id === newItem.id)

    if (existing) {
        return cart.map(item =>
            item.id === newItem.id
                ? {
                    ...item,
                    quantity: Math.min(item.stock, item.quantity + newItem.quantity)
                }
                : item
        )
    }

    return [...cart, newItem]
}

export const updateQuantity = (
    cart: CartItem[],
    id: number,
    delta: number
): CartItem[] => {
    return cart.map(item =>
        item.id === id
            ? {
                ...item,
                quantity: Math.max(1, Math.min(item.stock, item.quantity + delta))
            }
            : item
    )
}

export const removeItem = (cart: CartItem[], id: number): CartItem[] => {
    return cart.filter(item => item.id !== id)
}

export const clearCart = (): CartItem[] => {
    return []
}

export const getSubtotal = (cart: CartItem[]): number => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export const getSavings = (cart: CartItem[]): number => {
    return cart.reduce((sum, item) => {
        if (!item.originalPrice) return sum
        return sum + (item.originalPrice - item.price) * item.quantity
    }, 0)
}
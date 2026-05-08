export interface CartItem {
    id: number
    name: string
    price: number
    originalPrice?: number
    quantity: number
    imageUrl: string
    size: string
    stock: number
}
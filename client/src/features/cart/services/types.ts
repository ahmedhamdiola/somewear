export interface CartItem {
    id: number
    name: string
    productVariantId?: number
    price: number
    originalPrice?: number
    quantity: number
    imageUrl: string
    size: string
    stock: number
}
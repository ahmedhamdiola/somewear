export interface Product {
    id: number
    name: string
    price: number
    description: string
    imageUrl?: string
}
export interface Variant {
    id: number
    size: string;
    stock: number
}

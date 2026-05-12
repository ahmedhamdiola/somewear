export interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
    size: string
}
export interface CheckoutFormValues {
    address: string
    city: string
    phone: string
};
export interface OrderInterface{
    id?: number;
    userId: number;
    totalPrice: number;
    shippingFees: number;
    city: string;
    address: string;
    phone: string;
    status: string;
    createdAt: string;
}
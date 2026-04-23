export interface ProductVariantInterface {
    id?: number;
    productId: number;
    color?: string | null;
    size?: string | null;
    stock: number;
}
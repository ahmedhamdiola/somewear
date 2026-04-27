import type { CartItem } from "./types";

// THIS GONNA BE REMOVED WHEN CONNECTING WITH DB
export const initialCart: CartItem[] = [
    {
        id: 1,
        name: 'Oversized Graphic Hoodie',
        price: 79.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=200&h=200&fit=crop',
        size: 'L',
        stock: 8,
    },
    {
        id: 2,
        name: 'Baggy Cargo Pants',
        price: 69.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=200&h=200&fit=crop',
        size: 'M',
        stock: 5,
    },
    {
        id: 3,
        name: 'Vintage Washed T-Shirt',
        price: 39.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop',
        size: 'XL',
        stock: 12,
    },
    {
        id: 4,
        name: 'Streetwear Denim Jacket',
        price: 119.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=200&h=200&fit=crop',
        size: 'L',
        stock: 4,
    },
    {
        id: 5,
        name: 'Essential Sweat Shorts',
        price: 49.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=200&h=200&fit=crop',
        size: 'M',
        stock: 10,
    },
]
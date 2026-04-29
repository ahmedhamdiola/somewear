import { CartItemsInterface } from "../interfaces/CartItemsInterface"
import CartItemsRepository from "../repository/CartItemsRepository"


export const createCartItemService = (item: CartItemsInterface): CartItemsInterface => {
    if (!item.userId || item.userId <= 0) {
        throw new Error("Invalid cart ID ")
    }
    if (!item.productVariantId || item.productVariantId <= 0) {
        throw new Error("Invalid product variant ID ")
    } if (!item.quantity || item.quantity <= 0) {
        throw new Error("Quantity must be greater than 0")
    }
    return CartItemsRepository.createCartItem(item);
};


export const getCartItemByIdService = (id: number): CartItemsInterface | null => {
    if (!id || id <= 0) {
        throw new Error("Invalid cart item ID ")
    }
    const item = CartItemsRepository.getCartItemById(id);
    if (!item) {
        throw new Error("Cart item not found")
    }
    return item;
};


export const getCartItemsByUserIdService = (userId: number): CartItemsInterface[] => {
    if (!userId || userId <= 0) {
        throw new Error("Invalid user ID ")
    }
    return CartItemsRepository.getCartItemsByUserId(userId);
};

export const updateCartItemQuantityService = (id: number, quantity: number): CartItemsInterface | null => {
    if (!id || id <= 0) {
        throw new Error("Invalid cart item ID ")
    }
    if (!quantity || quantity <= 0) {
        throw new Error("Quantity must be greater than 0 ")
    }
    const updated = CartItemsRepository.updateCartItemQuantity(id, quantity);
    if (!updated) {
        throw new Error("Cart item not found")
    }
    return updated;


}

export const deleteCartItemService = (id: number): boolean => {
    if (!id || id <= 0) {
        throw new Error("Invalid cart item ID ")
    }
    return CartItemsRepository.deleteCartItem(id);
};

export default {
    createCartItemService,
    getCartItemByIdService,
    getCartItemsByUserIdService,
    updateCartItemQuantityService,
    deleteCartItemService
}
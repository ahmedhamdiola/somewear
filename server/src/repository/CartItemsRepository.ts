import db from "../config/db";
import { CartItemsInterface } from "../interfaces/CartItemsInterface";

//create cart item
export const createCartItem = (item: CartItemsInterface): CartItemsInterface => {
    const cartItem = db.prepare<
        [number, number, number], CartItemsInterface
    >(
        `
        INSERT INTO cart_items
        (userId,productVariantId,quantity) VALUES (?,?,?)
        `
    );
    const result = cartItem.run(
        item.userId,
        item.productVariantId,
        item.quantity || 1
    );
    return {
        id: Number(result.lastInsertRowid),
        ...item
    };
}

//get cart item by id
export const getCartItemById = (id: number): CartItemsInterface | null => {
    const cartItem = db.prepare<[number], CartItemsInterface>(
        `SELECT * FROM cart_items WHERE id=?`
    );
    const result = cartItem.get(id);
    return result || null;
}


//get cart items
export const getCartItemsByUserId = (userId: number): CartItemsInterface[] => {
    const cartItems = db.prepare<[number], CartItemsInterface>(
        `SELECT * FROM cart_items WHERE userId=?`
    );
    const result = cartItems.all(userId);
    return result;
}


//update quantity
export const updateCartItemQuantity = (id: number, quantity: number): CartItemsInterface | null => {
    const cartItem = db.prepare<[number, number], { changes: number }>(
        `UPDATE cart_items SET quantity = ? WHERE id = ?`
    );
    const result = cartItem.run(quantity, id);
    if (result.changes === 0) {
        return null;
    }
    return getCartItemById(id);
}

//delete 
export const deleteCartItem = (id: number): boolean => {
    const orderItem = db.prepare<[number], { changes: number }>(
        `DELETE FROM cart_items WHERE id=?`
    );
    const result = orderItem.run(id);
    if (result.changes === 0) {
        return false
    }
    return true
}

export default {
    createCartItem,
    getCartItemById,
    getCartItemsByUserId,
    updateCartItemQuantity,
    deleteCartItem
}
import db from "../config/db";
import { CartItemsInterface }from "../interfaces/CartItemsInterface";

//create cart item
export const createCartItem=(item:CartItemsInterface): CartItemsInterface=>{
     const cartItem=db.prepare<
    [number,number,number],CartItemsInterface
    >(
        `
         INSERT INTO cart_items
         (cartId,productVariantId,quantity) VALUES (?,?,?)
        `
    );
    const result=cartItem.run(
        item.cartId,
        item.productVariantId,
        item.quantity
        );
    return{...item, 
        id: Number(result.lastInsertRowid )};
}

//get cart item by id
export const getCartItemById=(id:number): CartItemsInterface | null=>{
    const cartItem=db.prepare<[number],CartItemsInterface>(
        `SELECT * FROM cart_items WHERE id=?`
    );
    const result=cartItem.get(id);
    return result || null;
}


//get cart items
export const getCartItemsByCartId=(cartId:number):CartItemsInterface[]=>{
    const cartItems=db.prepare<[number],CartItemsInterface>(
        `SELECT * FROM cart_items WHERE cartId=?`
    );
    const result= cartItems.all(cartId);
    return result ;
} 


//update quantity
export const updateCartItemQuantity=(id:number,quantity:number):CartItemsInterface |null=>{
    const cartItem=db.prepare<[number,number],{changes:number}>(
        `UPDATE cart_items WHERE id=?`
    );
    const result=cartItem.run(quantity,id);
    if(result.changes===0){
        return null;
    }
    return getCartItemById(id);
}

//delete 
export const deleteCartItem=(id:number): {message:string} =>{
    const orderItem=db.prepare<[number],{changes:number}>(
        `DELETE FROM order_items WHERE id=?`
    );
    const result =orderItem.run(id);
    if(result.changes===0){
        throw new Error("Cart item not found");
    }
    return {message:"Cart item deleted successfully"}
}

export default{
    createCartItem,
    getCartItemById,
    getCartItemsByCartId,
    updateCartItemQuantity,
    deleteCartItem
}
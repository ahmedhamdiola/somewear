import {CartInterface} from "../interfaces/CartInterface";
import CartRepository from "../repository/CartRepository";

export const createCartService=(cart: CartInterface):CartInterface=>{
    if(!cart.userId || cart.userId <= 0){
        throw new Error("Invalid user ID");
    }
    const existingCart = CartRepository.getCartByUserId(cart.userId);
    if(existingCart){
        throw new Error("Cart already exists for this user");
    }
    return CartRepository.createCart(cart);
};



export const getCartByUserIdService=(userId:number):CartInterface|null=>{
    if(!userId || userId <= 0){
        throw new Error("Invalid user ID");
    }
    const cart = CartRepository.getCartByUserId(userId);
    if(!cart){
        throw new Error("Cart not found for this user");
    }
    return cart;
};

export const getCartByIdService=(id:number):CartInterface|null=>{
    if(!id || id <= 0){
        throw new Error("Invalid cart ID");
    }
    const cart = CartRepository.getCartById(id);
    if(!cart){
        throw new Error("Cart not found");
    }
    return cart;
};

export const deleteCartByIdService=(id:number):{message: string}=>{
    if(!id || id <= 0){
        throw new Error("Invalid cart ID");
    }
    return CartRepository.deleteCartById(id);
};

export default {
    createCartService,
    getCartByUserIdService,
    getCartByIdService,
    deleteCartByIdService

};

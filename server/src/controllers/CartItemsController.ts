import CartItemsService from "../services/CartItemsService";
import CartService from "../services/CartService";
import { Request,Response } from "express";
import { successResponse,errorResponse } from "../utils/response";
import { AuthRequest } from "../middleware/AuthMiddleWare";
import CartItemsRepository from "../repository/CartItemsRepository";

export const createCartItemController=(req:Request,res:Response)=>{
    try{

        const cartItem=CartItemsService.createCartItemService(req.body);
        return successResponse(res,cartItem,"cart item created successully",201)
    }catch(error){
        return errorResponse(res,error,"Failed to create order item",400)
    }
}


export const getCartItemByIdController=(req:AuthRequest,res:Response)=>{
    try{
        const id=Number(req.params.id)
        const user= req.user!;

        const cart=CartService.getCartByUserIdService(user.id);
        const cartItem=CartItemsService.getCartItemByIdService(cart?.id!);
        if(!cartItem || cartItem.cartId !== cart?.id){
            return errorResponse(res,null,"Forbidden",403)
        }

        
        return successResponse(res,cartItem,"Cart item found",201)
    }catch(error){
        return errorResponse(res,error,"Failed to get cart item",400)
    }
}


export const getCartItemsByCartIdController=(req:AuthRequest,res:Response)=>{
    try{
       
        const user= req.user!;

        const cart=CartService.getCartByUserIdService(user.id);
        const cartItems=CartItemsService.getCartItemByIdService(cart?.id!);

       return successResponse(res,cartItems,"Cart items retrieved successully")
        }catch(error){
        return errorResponse(res,error,"Failed to retrieve cart items",400)
    }
}


export const updateCartItemQuantityController=(req:AuthRequest,res:Response)=>{
    try{
    const quantity=Number(req.body.quantity)
    const id=Number(req.params.id)
     const user= req.user!;

        const cart=CartService.getCartByUserIdService(user.id);
        const cartItem=CartItemsService.getCartItemByIdService(id);

        if(!cartItem || cartItem.cartId !== cart?.id){
            return errorResponse(res,null,"Forbidden",403)
        }


    const updated =CartItemsService.updateCartItemQuantitService(id,quantity);
    return successResponse(res,updated,"Cart item updated successfully",200)
    }catch(error){
        return errorResponse(res,error,"Faile to update cart item",400)
    }
}


export const deleteCartItemController=(req:AuthRequest,res:Response)=>{
    try{
        const user= req.user!;
        const id=Number(req.params.id)

        const cart=CartService.getCartByUserIdService(user.id);
        const cartItem=CartItemsService.getCartItemByIdService(id);

        if(!cartItem || cartItem.cartId !== cart?.id){
            return errorResponse(res,null,"Forbidden",403)
        }

        const result =CartItemsService.deleteOrderItemService(id);;
        return successResponse(res,result,"Cart item deleted successully")
    }catch(error){
        return errorResponse(res,error,"Failed to delete cart item",400)
    }
}


export default{
    createCartItemController,
    getCartItemByIdController,
    getCartItemsByCartIdController,
    updateCartItemQuantityController,
    deleteCartItemController
}

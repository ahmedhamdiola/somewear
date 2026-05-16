import CartItemsService from "../services/CartItemsService";
import { Response } from "express";
import { successResponse, errorResponse } from "../utils/response";
import { AuthRequest } from "../middleware/AuthMiddleWare";
import CartItemsRepository from "../repository/CartItemsRepository";
import OrderService from "../services/OrderService";

export const createCartItemController = async (req: AuthRequest, res: Response) => {
    try {
        const data = { ...req.body, userId: req.user!.id }
        const cartItem = await CartItemsService.createCartItemService(data);
        return successResponse(res, cartItem, "cart item created successully", 201)
    } catch (error) {
        return errorResponse(res, error, "Failed to create order item", 400)
    }
}


// export const getCartItemByIdController = async(req: AuthRequest, res: Response) => {
//     try {
//         const id = Number(req.params.id)
//         const cartItem = await CartItemsService.getCartItemByIdService(id);
//         return successResponse(res, cartItem, "Cart item found")
//     } catch (error) {
//         return errorResponse(res, error, "Failed to get cart item", 400)
//     }
// }


export const getCartItemsByUserIdController = async (req: AuthRequest, res: Response) => {
    try {
        const userId=req.user!.id;
        const cartItems = await CartItemsService.getCartItemsByUserIdService(userId);
        return successResponse(res, cartItems, "Cart items retrieved successully")
    } catch (error) {
        return errorResponse(res, error, "Failed to retrieve cart items", 400)
    }
}


export const updateCartItemQuantityController = async (req: AuthRequest, res: Response) => {
    try {

        const quantity = Number(req.body.quantity)
        const id = Number(req.params.id)
        const UserId = Number(req.user?.id)
        const cartItem = await CartItemsService.getCartItemByIdService(id);

        if (!cartItem || cartItem.id !== id) {
            return errorResponse(res, null, "Item not found", 404)
        }

        // check authenticity
        if (cartItem.userId !== UserId && req.user?.role !== "admin") {
            return errorResponse(res, null, "Forbidden", 403);
        }

        const updated = await CartItemsService.updateCartItemQuantityService(id, quantity);
        return successResponse(res, updated, "Cart item updated successfully")
    } catch (error) {
        return errorResponse(res, error, "Failed to update cart item", 400)
    }
}


export const deleteCartItemController = async (req: AuthRequest, res: Response) => {
    try {
        const UserId = Number(req.user?.id)

        const id = Number(req.params.id)
        const cartItem = await CartItemsService.getCartItemByIdService(id);

        if (!cartItem) {
            return errorResponse(res, null, "Item not found", 404);
        }

        // check authenticity
        if (cartItem.userId !== UserId && req.user?.role !== "admin") {
            return errorResponse(res, null, "Forbidden", 403);
        }

        const result = await CartItemsService.deleteCartItemService(id);
        return successResponse(res, result, "Cart item deleted successully")
    } catch (error) {
        return errorResponse(res, error, "Failed to delete cart item", 400)
    }
}

export const deleteCartItemsByUserIdController=async(req:AuthRequest,res:Response)=>{
    try{
    const userId=Number(req.params.userId);

    // check authenticity
        if (req.user?.id !== userId && req.user?.role !== "admin") {
            return errorResponse(res, null, "Forbidden", 403);
        }

    const result=await CartItemsRepository.deleteCartItemsByUserId(userId)
    return successResponse(res,result,"Cart items deleted successully")
    }catch(error){
        return errorResponse(res,error,"Failed to delete cart items",400)
    }

}




export default {
    createCartItemController,
    getCartItemsByUserIdController,
    updateCartItemQuantityController,
    deleteCartItemController,
    deleteCartItemsByUserIdController
}

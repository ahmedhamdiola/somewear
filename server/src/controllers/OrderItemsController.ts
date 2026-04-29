import OrderItemsService from "../services/OrderItemsService";
import { Request,Response } from "express";
import { successResponse,errorResponse } from "../utils/response";
import { AuthRequest } from "../middleware/AuthMiddleWare";
import OrderRepository from "../repository/OrderRepository";

export const createOrderItemController=(req:Request,res:Response)=>{
    try{
        const orderItem=OrderItemsService.createOrderItemService(req.body);
        return successResponse(res,orderItem,"Order item created successully",201)
    }catch(error){
        return errorResponse(res,error,"Failed to create order item",400)
    }
}


export const getOrderItemByIdController=(req:AuthRequest,res:Response)=>{
    try{
        const id=Number(req.params.id)
        const orderItem=OrderItemsService.getOrderItemByIdService(id);
        if(!orderItem){
            return errorResponse(res,null,"Order item not found",404)
        }
        const order=OrderRepository.getOrderById(orderItem.orderId)
        if(!order){
            return errorResponse(res,null,"Order not found",404)
        }
        if(req.user?.role!=="admin" && order.userId!==req.user?.id){
            return errorResponse(res,null,"forbidden",403)
        }
        return successResponse(res,orderItem,"Order item found",201)
    }catch(error){
        return errorResponse(res,error,"Failed to get order item",400)
    }
}


export const getOrderItemsByOrderIdController=(req:AuthRequest,res:Response)=>{
    try{
        const orderId=Number(req.params.orderId)
        const order=OrderRepository.getOrderById(orderId)
        if(!order){
            return errorResponse(res,null,"Order not found",404)
        }
        if(req.user?.role!=="admin" && order.userId!==req.user?.id){
            return errorResponse(res,null,"forbidden",403)
        } 
        const orderitems=OrderItemsService.getOrderItemByIdService(orderId);
        
       return successResponse(res,orderitems,"Order items retrieved successully")
        }catch(error){
        return errorResponse(res,error,"Failed to retrieve order items",400)
    }
}


export const deleteOrderItemController=(req:Request<{id:string}>,res:Response)=>{
    try{
        const id=Number(req.params.id)
        const orderItem=OrderItemsService.getOrderItemByIdService(id);
        return successResponse(res,orderItem,"Order item deleted successully")
    }catch(error){
        return errorResponse(res,error,"Failed to delete order item",400)
    }
}


export default{
    createOrderItemController,
    getOrderItemByIdController,
    getOrderItemsByOrderIdController,
    deleteOrderItemController
}

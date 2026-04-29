import{Request, Response} from 'express';
import OrderService from '../services/OrderService';
import { successResponse, errorResponse } from '../utils/response';
import { AuthRequest } from '../middleware/AuthMiddleWare';

export const createOrderController =(req:AuthRequest,res:Response)=>{
try {
        const data={...req.body,userId:req.user!.id}
        const order = OrderService.createOrderService(data);
       return successResponse(res, order, "Product created successfully", 201);
 } catch (error) {
     return errorResponse(res, error, "Failed to create product", 400);
   }
}

export const getOrderByIdController=(req:Request,res:Response)=>{
    try {
        const id=Number(req.params.id);
        const order = OrderService.getOrderByIdService(id);
       return successResponse(res, order, "Product retrieved succesully");
 } catch (error) {
     return errorResponse(res, error, "Failed to retrieve order", 400);
   }
}

export const getOrderByUserIdController=(req:AuthRequest,res:Response)=>{
    try {
        const userId = Number(req.params.userId);
        if(req.user!.id !==userId && req.user?.role!=="admin"){
            return errorResponse(res,null,"Forbidden",403)
        }
        const orders = OrderService.getOrderByUserIdService(userId);
        return successResponse(res, orders, "User orders retrieved successfully");
    } catch (error) {
        return errorResponse(res, error, "Failed to get user orders", 400);
    }
};


export const getAllOrdersController = (req: Request, res: Response) => {
    try {
        const orders = OrderService.getAllOrdersService();
        return successResponse(res, orders, "All orders retrieved successfully");
    } catch (error) {
        return errorResponse(res, error, "Failed to get orders", 400);
    }
};

export const cancelOrderController = (req: AuthRequest, res: Response) => {
    try {
        const orderId = Number(req.params.id);
        const existingOrder=OrderService.getOrderByIdService(orderId)
       
        if(existingOrder?.userId !== req.user?.id && req.user?.role!=="admin"){
            return errorResponse(res,null,"Forbidden",403)
        }
        
        const order = OrderService.cancelOrderService(orderId);
        return successResponse(res, order, "Order cancelled successfully");
    } catch (error) {
        return errorResponse(res, error, "Failed to cancel order", 400);
    }
};

export const updateOrderStatusController = (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { status } = req.body;

        const updated = OrderService.updateOrderStatusService(id, status);

        if (!updated) {
            return errorResponse(res, null, "Order not found", 404);
        }

        return successResponse(res, updated, "Order status updated successfully");
    } catch (error) {
        return errorResponse(res, error, "Failed to update order", 400);
    }
};

export const deleteOrderController = (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const result = OrderService.deleteOrderService(id);

        return successResponse(res, result, "Order deleted successfully");
    } catch (error) {
        return errorResponse(res, error, "Failed to delete order", 400);
    }
};

export default {
    createOrderController,
    getOrderByIdController,
    getOrderByUserIdController,
    getAllOrdersController,
    cancelOrderController,
    updateOrderStatusController,
    deleteOrderController
};
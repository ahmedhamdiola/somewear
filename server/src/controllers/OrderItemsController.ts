import OrderItemsService from "../services/OrderItemsService";
import { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response";
import { AuthRequest } from "../middleware/AuthMiddleWare";
import OrderRepository from "../repository/OrderRepository";




export const getOrderItemsByOrderIdController = async (req: AuthRequest, res: Response) => {
    try {
        const orderId = Number(req.params.orderId)
        const order = await OrderRepository.getOrderById(orderId)
        if (!order) {
            return errorResponse(res, null, "Order not found", 404)
        }
        if (req.user?.role !== "admin" && order.userId !== req.user?.id) {
            return errorResponse(res, null, "forbidden", 403)
        }
        const orderitems = await OrderItemsService.getOrderItemsByOrderIdService(orderId);

        return successResponse(res, orderitems, "Order items retrieved successully")
    } catch (error) {
        return errorResponse(res, error, "Failed to retrieve order items", 400)
    }
}


export default {
    getOrderItemsByOrderIdController,
}

import { Request, Response } from 'express';
import OrderService from '../services/OrderService';
import { successResponse, errorResponse } from '../utils/response';
import { AuthRequest } from '../middleware/AuthMiddleWare';

export const createOrderController = async (req: AuthRequest, res: Response) => {
    try {
        const data = { ...req.body, userId: req.user!.id }
        const order = await OrderService.createOrderService(data);
        return successResponse(res, order, "Order created successfully", 201);
    } catch (error) {
        return errorResponse(res, error, "Failed to create order", 400);
    }
}

export const getOrderByIdController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const order = await OrderService.getOrderByIdService(id);
        return successResponse(res, order, "Order retrieved succesully");
    } catch (error) {
        return errorResponse(res, error, "Failed to retrieve order", 400);
    }
}

export const getOrdersByUserIdController = async (req: AuthRequest, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        if (req.user!.id !== userId && req.user?.role !== "admin") {
            return errorResponse(res, null, "Forbidden", 403)
        }
        const orders = await OrderService.getOrdersByUserIdService(userId);
        return successResponse(res, orders, "User orders retrieved successfully");
    } catch (error) {
        return errorResponse(res, error, "Failed to get user orders", 400);
    }
};

export const getCountByUserIdController = async (req: AuthRequest, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        if (req.user!.id !== userId && req.user?.role !== "admin") {
            return errorResponse(res, null, "Forbidden", 403)
        }
        const count = await OrderService.getCountByUserIdService(userId);
        return successResponse(res, count, "User order count retrieved successfully");
    } catch (error) {
        return errorResponse(res, error, "Failed to get user order count", 400);
    }
};

export const getTotalAmountByUserIdController = async (req: AuthRequest, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        if (req.user!.id !== userId && req.user?.role !== "admin") {
            return errorResponse(res, null, "Forbidden", 403)
        }
        const totalAmount = await OrderService.getTotalAmountByUserIdService(userId);
        return successResponse(res, totalAmount, "User total order amount retrieved successfully");
    } catch (error) {
        return errorResponse(res, error, "Failed to get user total order amount", 400);
    }
};

export const getAllOrdersController = async (req: Request, res: Response) => {
    try {
        const orders = await OrderService.getAllOrdersService();
        return successResponse(res, orders, "All orders retrieved successfully");
    } catch (error) {
        return errorResponse(res, error, "Failed to get orders", 400);
    }
};

export const cancelOrderController = async (req: AuthRequest, res: Response) => {
    try {
        const orderId = Number(req.params.id);
        const existingOrder = await OrderService.getOrderByIdService(orderId)

        if (existingOrder?.userId !== req.user?.id && req.user?.role !== "admin") {
            return errorResponse(res, null, "Forbidden", 403)
        }

        const order = await OrderService.cancelOrderService(orderId);
        return successResponse(res, order, "Order cancelled successfully");
    } catch (error) {
        return errorResponse(res, error, "Failed to cancel order", 400);
    }
};

export const updateOrderStatusController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { status } = req.body;

        const updated = await OrderService.updateOrderStatusService(id, status);

        if (!updated) {
            return errorResponse(res, null, "Order not found", 404);
        }

        return successResponse(res, updated, "Order status updated successfully");
    } catch (error) {
        return errorResponse(res, error, "Failed to update order", 400);
    }
};

export const deleteOrderController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const result = await OrderService.deleteOrderService(id);

        return successResponse(res, result, "Order deleted successfully");
    } catch (error) {
        return errorResponse(res, error, "Failed to delete order", 400);
    }
};

export const checkoutController = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user!.id
        const order = await OrderService.checkoutService(userId, req.body)
        return successResponse(res, order, "Checkout completed successfully")
    } catch (error) {
        return errorResponse(res, error, "Failed to checkout", 400)
    }
}

export default {
    createOrderController,
    getOrderByIdController,
    getOrdersByUserIdController,
    getCountByUserIdController,
    getTotalAmountByUserIdController,
    getAllOrdersController,
    cancelOrderController,
    updateOrderStatusController,
    deleteOrderController,
    checkoutController
};
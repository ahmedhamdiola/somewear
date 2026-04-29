import { AuthRequest } from "../middleware/AuthMiddleWare";
import CartService from "../services/CartService";
import { successResponse, errorResponse } from "../utils/response";
import { Request, Response } from "express";

export const createCartController = (req: Request, res: Response) => {
    try {
         const cart = CartService.createCartService(req.body);
        successResponse(res, cart, "Cart created successfully", 200);
    } catch (error) {
        errorResponse(res, error, "Failed to create cart");
    }
};

export const getCartByIdController = (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const cart = CartService.getCartByIdService(id);
        successResponse(res, cart, "Cart retrieved successfully", 200);
    } catch (error) {
        errorResponse(res, error, "Failed to retrieve cart");
    }
};

export const getCartByUserIdController = (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.userId);
        const cart = CartService.getCartByUserIdService(userId);
        successResponse(res, cart, "Cart retrieved successfully", 200);
    } catch (error) {
        errorResponse(res, error, "Failed to retrieve cart");
    }
};


export const deleteCartByIdController = (req: Request, res: Response) => {
    try {
         const id=Number(req.params.id)
        const result = CartService.deleteCartByIdService(id);

        successResponse(res, result, "Cart deleted successfully", 200);
    } catch (error) {
        errorResponse(res, error, "Failed to delete cart");
    }
};

export default {
    createCartController,
    getCartByIdController,
    getCartByUserIdController,
    deleteCartByIdController
};
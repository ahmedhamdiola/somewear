import {  Request, Response} from "express";
import { UserInterface } from "../interfaces/UserInterface";
import {successResponse, errorResponse} from "../utils/response";

import UserService from "../services/UserService";

export const registerUserController = async (req: Request, res: Response) => {
    try {
        const user: UserInterface = req.body;
        const result = await  UserService.registerUserService(user);
        return successResponse(res, result, "User registered successfully", 201);
    } catch (error) {
        return errorResponse(res, error, "Failed to register user", 400);
    }
};

export const loginUserController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = await UserService.loginUserService(email, password);
        return successResponse(res, result, "User logged in successfully");
    } catch (error) {
        return errorResponse(res, error, "Failed to login user", 400);
    }
};

export const getUserByIdController = (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const result = UserService.getUserByIdService(id);
        return successResponse(res, result, "User retrieved successfully");
    } catch (error) {
        return errorResponse(res, error, "Failed to retrieve user", 400);
    }
};

export const updateUserByIdController = (req: Request<{ id: string }>, res: Response) => {
    try {
        const id = Number(req.params.id);
        const userUpdates: Partial<UserInterface> = req.body;
        const result = UserService.updateUserByIdService(id, userUpdates);
        return successResponse(res, result, "User updated successfully");
    } catch (error) {
        return errorResponse(res, error, "Failed to update user", 400);
    }
};
    
export const deleteUserByIdController = (req: Request<{ id: string }>, res: Response) => {
    try {
        const id = Number(req.params.id);
        const result = UserService.deleteUserByIdService(id);
        return successResponse(res, result, "User deleted successfully");
    }
        catch (error) {
        return errorResponse(res, error, "Failed to delete user", 400);
    }
};


export default {
    registerUserController,
    loginUserController,
    getUserByIdController,
    updateUserByIdController,
    deleteUserByIdController
};

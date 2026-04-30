import {  Request, Response} from "express";
// import { UserInterface } from "../interfaces/UserInterface";
import {successResponse, errorResponse} from "../utils/response";
import UserService from "../services/UserService";
import { AuthRequest } from "../middleware/AuthMiddleWare";

export const registerUserController = async (req: Request, res: Response) => {
    try {
        const result = await  UserService.registerUserService(req.body);
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

export const getUserByIdController = (req: AuthRequest, res: Response) => {
    try {
        const id = Number(req.params.id);
        if(req.user!.id !==id && req.user?.role!=="admin"){
            return errorResponse(res,null,"Forbidden",403)
        }
        const result = UserService.getUserByIdService(id);
        return successResponse(res, result, "User retrieved successfully");
    } catch (error) {
        return errorResponse(res, error, "Failed to retrieve user", 400);
    }
};

export const updateUserByIdController =async(req: AuthRequest, res: Response)=> {
    try {
        const id = Number(req.params.id);
        if(req.user!.id !==id && req.user?.role!=="admin"){
            return errorResponse(res,null,"Forbidden",403)
        }
        const result = await UserService.updateUserByIdService(id, req.body);
        return successResponse(res, result, "User updated successfully");
    } catch (error) {
        return errorResponse(res, error, "Failed to update user", 400);
    }
};
    
export const deleteUserByIdController = (req: AuthRequest, res: Response) => {
    try {
        const id = Number(req.params.id);
        if(req.user!.id !==id && req.user?.role!=="admin"){
            return errorResponse(res,null,"Forbidden",403)
        }
        const result = UserService.deleteUserByIdService(id);
        return successResponse(res, result, "User deleted successfully");
    }
        catch (error) {
        return errorResponse(res, error, "Failed to delete user", 400);
    }
};


export const logoutController=(req:Request,res:Request)=>{
    try{
        const result=UserService.logoutService()
        successResponse(res,result,"User logged ot successfully")
    }catch(error){
        errorResponse(res,error,"Failed to logout",400)
    }
}

export default {
    registerUserController,
    loginUserController,
    getUserByIdController,
    updateUserByIdController,
    deleteUserByIdController,
    logoutController
};

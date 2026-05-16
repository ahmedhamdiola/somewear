import { Request, Response } from "express";
// import { UserInterface } from "../interfaces/UserInterface";
import { successResponse, errorResponse } from "../utils/response";
import UserService from "../services/UserService";
import { AuthRequest } from "../middleware/AuthMiddleWare";

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const result = await UserService.registerUserService(req.body);
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true in production with HTTPS
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return successResponse(
      res,
      { user: result.user },
      "User registered successfully",
      201,
    );
  } catch (error) {
    return errorResponse(res, error, "Failed to register user", 400);
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await UserService.loginUserService(email, password);
    res.cookie("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true in production with HTTPS
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return successResponse(
      res,
      { user: result.safeUser },
      "User logged in successfully",
    );
  } catch (error) {
    return errorResponse(res, error, "Failed to login user", 400);
  }
};

export const getUserByIdController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const userId = req.user!.id;
    const result = await UserService.getUserByIdService(userId);
    return successResponse(res, result, "User retrieved successfully");
  } catch (error) {
    return errorResponse(res, error, "Failed to retrieve user", 400);
  }
};

export const getUsersCountController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const count = await UserService.getUsersCountService();
    return successResponse(res, count, "Users count retrieved successfully");
  } catch (error) {
    return errorResponse(res, error, "Failed to retrieve users count", 400);
  }
};

export const updateUserByIdController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const userId = req.user!.id;
    const result = await UserService.updateUserByIdService(userId, req.body);
    return successResponse(res, result, "User updated successfully");
  } catch (error) {
    return errorResponse(res, error, "Failed to update user", 400);
  }
};

export const deleteUserByIdController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);
    if (req.user!.id !== id && req.user?.role !== "admin") {
      return errorResponse(res, null, "Forbidden", 403);
    }
    const result = await UserService.deleteUserByIdService(id);
    return successResponse(res, result, "User deleted successfully");
  } catch (error) {
    return errorResponse(res, error, "Failed to delete user", 400);
  }
};

export const getAllUsersController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    const result = await UserService.getAllUsersService();
    return successResponse(res, result, "Users retrieved successfully");
  } catch (error) {
    return errorResponse(res, error, "Failed to retrieve users", 400);
  }
};

export const checkAdminController = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role === "admin") {
      return successResponse(res, { isAdmin: true }, "User is admin");
    }
    return successResponse(res, { isAdmin: false }, "User is not admin");
  } catch (error) {
    return errorResponse(res, error, "Failed to check admin status", 400);
  }
};

export const checkLoggedInController = async (
  req: AuthRequest,
  res: Response,
) => {
  try {
    if (req.user?.id !== undefined) {
      return successResponse(res, { isLoggedIn: true }, "User is authorized");
    }
    return successResponse(
      res,
      { isLoggedIn: false },
      "User is not authorized",
    );
  } catch (error) {
    return errorResponse(
      res,
      error,
      "Failed to check authorization status",
      400,
    );
  }
};

export default {
  registerUserController,
  loginUserController,
  getUserByIdController,
  getUsersCountController,
  updateUserByIdController,
  deleteUserByIdController,
  getAllUsersController,
  checkAdminController,
  checkLoggedInController,
};

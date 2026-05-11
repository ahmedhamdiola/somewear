import { Request, Response, NextFunction } from "express";

import { verifyToken } from "../utils/jwt";
import { errorResponse } from "../utils/response";

interface jwtPayload {
    id: number;
    role: string;
}

export interface AuthRequest extends Request {
    user?: jwtPayload;
}
const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token=req.cookies.token ;
        if (!token) {
            return errorResponse(res, null, "Unauthorized", 401);
        }
        const decoded = verifyToken(token);
        if (!decoded) {
            return errorResponse(res, null, "Invalid token", 401);
        }
        req.user = decoded as jwtPayload;
        next();
    } catch (error) {
        return errorResponse(res, null, "Unauthorized", 401);
    }
};
export default authMiddleware;
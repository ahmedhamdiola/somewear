import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "./AuthMiddleWare";


export const RoleMiddleware = (requiredRole: string) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        if (req.user.role !== requiredRole) {
            return res.status(403).json({ error: "Forbidden" });
        }

        next();
    };
};
export default RoleMiddleware;
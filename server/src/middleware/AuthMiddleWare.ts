import {Request, Response, NextFunction} from "express";

import { verifyToken } from "../utils/jwt";

interface jwtPayload {
    id: number;
    role: string;
}

export interface AuthRequest extends Request {
    user?: jwtPayload;
}
const authMiddleware=(req: AuthRequest, res: Response, next: NextFunction) => {
    try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "Authorization header missing" });
    }   
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Token missing" });
    }
    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ error: "Invalid token" });
    }
    req.user = decoded as jwtPayload;
    next();
    } catch (error) {
        res.status(401).json({ error: "Unauthorized" });
    }
};
export default authMiddleware;
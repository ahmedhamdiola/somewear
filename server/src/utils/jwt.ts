import jwt, { JwtPayload }  from "jsonwebtoken";
const secret= "secretkey";

export const generateToken = (payload: object): string => {
    return jwt.sign(payload, secret, { expiresIn: '1d' });
};

export const verifyToken = (token: string): jwt.JwtPayload | null => {
    try {
        return jwt.verify(token, secret) as jwt.JwtPayload;
    } catch (error) {
        return null;
    }
};

export default {
    generateToken: generateToken,
    verifyToken: verifyToken
};
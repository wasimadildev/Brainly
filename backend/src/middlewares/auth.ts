// src/middleware/verifyToken.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: { id: number; email: string; name?: string };
}


export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Get token from cookies
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Verify token
    const secret = process.env.JWT_SECRET!;

    const decoded = jwt.verify(token, secret) as { id: number; email: string; name?: string };
    req.user = decoded; // attach user data to request
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

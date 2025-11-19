import { Request, Response, NextFunction } from "express";
import { Encrypt } from "../helpers/encrypt.helper";

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.cookies.token;
  if (!authToken) {
    return res.status(401).json({ message: "Access denied" });
  }
  const decoded = Encrypt.verifyToken(authToken);
  if (!decoded) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
  (req as any).user = decoded;
  next();
};

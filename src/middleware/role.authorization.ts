import { NextFunction, Request, Response } from "express";
import { userRepository } from "../repository/Repository";

export const roleAuthorization = (role: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    const userData = await userRepository.findById(user.id);

    if (userData.role !== role) {
      return res.status(403).json({
        message: `Forbidden: ${userData.role} do not have access to this resource`,
      });
    }
    next();
  };
};

import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";

export const validator = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userDto = plainToInstance(dtoClass, req.body);

    const errors: ValidationError[] = await validate(userDto);

    if (errors.length > 0) {
      const messages = errors
        .map((err) => Object.values(err.constraints || {}))
        .flat();

      return res.status(400).json({
        status: 400,
        message: "Validation failed",
        errors: messages,
      });
    }

    next();
  };
};

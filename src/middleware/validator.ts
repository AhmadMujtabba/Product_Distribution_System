import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";

export const validator = (dtoClass: any) => {
  console.log("inside validator function");
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log("req", req.body);
    const userDto = plainToInstance(dtoClass, req.body);
    console.log("userDto", userDto);

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

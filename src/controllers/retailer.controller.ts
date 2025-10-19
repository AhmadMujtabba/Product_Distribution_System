import {
  retailerRepository,
  userRepository,
} from "../repository/user.Repository";
import { Request, Response } from "express";
import handleresponse from "../utils/utils";

export class retailerController {
  static async createRetailer(req: Request, res: Response) {
    try {
      const userdata = (req as any).user;
      const user = await userRepository.findById(userdata.id);
      const payload = {
        ...req.body,
        created_by: { id: user.id },
      };
      const retailer = await retailerRepository.createRetailer(payload);
      handleresponse(res, 201, "Retailer created successfully", retailer);
    } catch (error) {
      handleresponse(res, 500, "Internal Server Error", error.message);
    }
  }

  static async findAllRetailer(req: Request, res: Response) {
    try {
      const retailers = await retailerRepository.findAll();
      handleresponse(res, 200, "Retailer records", retailers);
    } catch (error) {
      handleresponse(res, 500, "Internal Server Error", error.message);
    }
  }
}

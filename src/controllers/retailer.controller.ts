import {
  retailerRepository,
  userRepository,
} from "../repository/user.Repository";
import { Request, Response } from "express";
import handleresponse from "../utils/utils";

export class retailerController {
  static async createRetailer(req: Request, res: Response) {
    try {
      //user object is attached here from authentication middleware
      const userdata = (req as any).user;
      const user = await userRepository.findById(userdata.id);
      const payload = {
        ...req.body,
        user,
      };
      const retailer = await retailerRepository.createRetailer(payload);
      handleresponse(res, 201, "Retailer created successfully", retailer);
    } catch (error) {
      handleresponse(res, 500, "Internal Server Error", error.message);
    }
  }
}

import { retailerRepository, userRepository } from "../repository/Repository";
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

  static async findById(req: Request, res: Response) {
    try {
      const retailers = await retailerRepository.findById(
        Number(req.params.id)
      );
      handleresponse(res, 200, "Retailer Records", retailers);
    } catch (error) {
      handleresponse(res, 500, "Internal Server Error", error.message);
    }
  }

  static async updateRetailer(req: Request, res: Response) {
    try {
      const retailer = await retailerRepository.updateRetailer(
        Number(req.params.id),
        req.body
      );
      handleresponse(res, 200, "Updated Retailer", retailer);
    } catch (error) {
      handleresponse(res, 500, "Internal Server Error", error.message);
    }
  }

  static async deleteRetailer(req: Request, res: Response) {
    try {
      const retailer = await retailerRepository.deleteRetailer(
        Number(req.params.id)
      );
      handleresponse(res, 200, "Deleted Retailer", retailer);
    } catch (error) {
      handleresponse(res, 500, "Internal Server Error", error.message);
    }
  }
}

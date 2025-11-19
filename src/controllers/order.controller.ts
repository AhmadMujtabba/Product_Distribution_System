import { orderRepository } from "../repository/Repository";
import { retailerRepository } from "../repository/Repository";
import { orderItemsRepository } from "../repository/Repository";
import { productRepository } from "../repository/Repository";
import { Request, Response } from "express";
import handleresponse from "../utils/utils";

export class orderController {
  static async createOrder(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const retailer = req.body.retailer_id;
      const retailerData = await retailerRepository.findById(retailer);
      if (retailerData !== null) {
        const payload = { ...req.body, order_by: user.id };
        const order = await orderRepository.createOrder(payload);
        handleresponse(res, 201, "Order added successfully", order);
      }
      handleresponse(res, 404, "Retailer not found");
    } catch (error) {
      handleresponse(res, 500, "Internal Server Error", error.message);
    }
  }
}

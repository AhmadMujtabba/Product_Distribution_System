import { productRepository } from "../repository/Repository";
import { Request, Response } from "express";
import handleresponse from "../utils/utils";

export class productController {
  static async addProduct(req: Request, res: Response) {
    try {
      const product = await productRepository.addProduct(req.body);
      handleresponse(res, 201, "Product added successfully", product);
    } catch (error) {
      handleresponse(res, 500, "Internal Server Error", error.message);
    }
  }

  static async findAllProduct(req: Request, res: Response) {
    try {
      const products = await productRepository.findAll();
      handleresponse(res, 200, "Product records", products);
    } catch (error) {
      handleresponse(res, 500, "Internal Server Error", error.message);
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const products = await productRepository.findById(Number(req.params.id));
      handleresponse(res, 200, "Product Records", products);
    } catch (error) {
      handleresponse(res, 500, "Internal Server Error", error.message);
    }
  }

  static async updateProduct(req: Request, res: Response) {
    try {
      const products = await productRepository.updateProduct(
        Number(req.params.id),
        req.body
      );
      handleresponse(res, 200, "Updated Product", products);
    } catch (error) {
      handleresponse(res, 500, "Internal Server Error", error.message);
    }
  }

  static async deleteProduct(req: Request, res: Response) {
    try {
      const retailer = await productRepository.deleteProduct(
        Number(req.params.id)
      );
      handleresponse(res, 200, "Deleted Product", retailer);
    } catch (error) {
      handleresponse(res, 500, "Internal Server Error", error.message);
    }
  }
}

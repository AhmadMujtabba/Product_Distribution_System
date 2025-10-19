import { Request, Response } from "express";
import handleresponse from "../utils/utils";
import { userRepository } from "../repository/Repository";
import { Encrypt } from "../helpers/encrypt.helper";

export class UserController {
  static async getallUser(req: Request, res: Response) {
    const users = await userRepository.findAll();
    handleresponse(res, 200, "All User Find", users);
  }

  static async createUser(req: Request, res: Response) {
    const user = await userRepository.createUser(req.body);
    handleresponse(res, 201, "User Created", user);
  }

  static async getUserById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const user = await userRepository.findById(id);
    handleresponse(res, 200, "User Found", user);
  }

  static async updateUser(req: Request, res: Response) {
    if (req.body.password) {
      req.body.password = await Encrypt.hashPassword(req.body.password);
    }
    const updateuser = await userRepository.updateUser(
      Number(req.params.id),
      req.body
    );
    handleresponse(res, 200, "User Updated", updateuser);
  }

  static async deleteUser(req: Request, res: Response) {
    const deleteuser = await userRepository.deleteUser(Number(req.params.id));
    handleresponse(res, 200, "User Deleted", deleteuser);
  }
}

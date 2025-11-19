import { Request, Response } from "express";
import handleresponse from "../utils/utils";
import { userRepository } from "../repository/Repository";
import { Encrypt } from "../helpers/encrypt.helper";
import { sendMail } from "../helpers/nodemailer.helper";

export class UserController {
  static async getallUser(req: Request, res: Response) {
    const users = await userRepository.findAll();
    handleresponse(res, 200, "All User Find", users);
  }

  static async createUser(req: Request, res: Response) {
    const otp = await Encrypt.generateOtp();
    const otp_valid = await Encrypt.generateOtpValidTill();
    const userdata = { ...req.body, otp: otp, otp_expiry: otp_valid };
    console.log(userdata);
    const user = await userRepository.createUser(userdata);
    if (user) {
      await sendMail(user.email, "OTP", userdata.otp.toString());
      handleresponse(res, 201, "User Created", user);
    }
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

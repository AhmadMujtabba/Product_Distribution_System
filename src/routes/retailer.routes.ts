import * as express from "express";
import { UserController } from "../controllers/user.controller";
import { userDto } from "../dto/user.dto";
import { validator } from "../middleware/validator";
import { retailerController } from "../controllers/retailer.controller";
import { authentication } from "../middleware";

const router = express.Router();

router.post(
  "/createretailer",
  authentication,
  retailerController.createRetailer
);
router.get("/retailers", authentication, retailerController.findAllRetailer);

export { router as retailerRouter };

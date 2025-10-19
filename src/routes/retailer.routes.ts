import * as express from "express";
import { validator } from "../middleware/validator";
import { retailerController } from "../controllers/retailer.controller";
import { authentication } from "../middleware/authentication";
import { roleAuthorization } from "../middleware/role.authorization";
import { userRoles } from "../enum/userroles.enum";
import { retailerDto } from "../dto/retailer.dto";

const router = express.Router();

router.post(
  "/createretailer",
  authentication,
  validator(retailerDto),
  retailerController.createRetailer
);
router.get("/retailers", authentication, retailerController.findAllRetailer);
router.get("/getretailer/:id", authentication, retailerController.findById);
router.put(
  "/updateretailer/:id",
  authentication,
  roleAuthorization(userRoles.ADMIN),
  retailerController.updateRetailer
);
router.delete(
  "/deleteretailer/:id",
  authentication,
  roleAuthorization(userRoles.ADMIN),
  retailerController.deleteRetailer
);

export { router as retailerRouter };

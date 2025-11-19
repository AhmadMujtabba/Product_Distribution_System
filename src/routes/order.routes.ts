import * as express from "express";
import { validator } from "../middleware/validator";
import { authentication } from "../middleware/authentication";
import { roleAuthorization } from "../middleware/role.authorization";
import { userRoles } from "../enum/userroles.enum";
import { productController } from "../controllers/product.controller";
import { productDto } from "../dto/product.dto";
import { orderController } from "../controllers/order.controller";
const router = express.Router();

router.post("/createorder",authentication, orderController.createOrder);
// router.get("/products", authentication, productController.findAllProduct);
// router.get("/getproduct/:id", authentication, productController.findById);
// router.put(
//   "/updateproduct/:id",
//   authentication,
//   roleAuthorization(userRoles.ADMIN),
//   productController.updateProduct
// );
// router.delete(
//   "/deleteproduct/:id",
//   authentication,
//   roleAuthorization(userRoles.ADMIN),
//   productController.deleteProduct
// );

export { router as orderRouter };

import { userService } from "../service/users.service";
import { datasource } from "../config/data-source";
import { User } from "../entity/user.entity";
import { Retailer } from "../entity/retailer.entity";
import { retailerService } from "../service/retailer.service";
import { productService } from "../service/product.service";
import { Product } from "../entity/products.entity";

export const userRepository = new userService(datasource.getRepository(User));

export const retailerRepository = new retailerService(
  datasource.getRepository(Retailer)
);

export const productRepository = new productService(
  datasource.getRepository(Product)
);

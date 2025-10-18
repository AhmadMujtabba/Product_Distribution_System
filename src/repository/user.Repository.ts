import { userService } from "../service/users.service";
import { adminService } from "../service/admin.service";
import { datasource } from "../config/data-source";
import { User } from "../entity/user.entity";
import { retailerService } from "../service/retailer.service";

export const userRepository =new userService(
    datasource.getRepository(User)
)

// export const adminRepository =new adminService(
//     datasource.getRepository(Admin)
// )

// export const retailerRepository =new retailerService(
//     datasource.getRepository(Retailer)
// )
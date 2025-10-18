import {
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsDefined,
  IsOptional,
  IsEnum,
} from "class-validator";
import { userRoles } from "../enum/userroles.enum";

export class userDto {
  @IsDefined({ message: "Name is required" })
  @IsNotEmpty()
  name: string;

  @IsDefined({ message: "Email is required" })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDefined({ message: "Password is required" })
  @IsNotEmpty()
  password: string;

  @IsDefined({ message: "Mobile number is required" })
  @IsNotEmpty()
  @IsNumber()
  mobile: number;

  @IsOptional()
  @IsEnum(userRoles, { message: "Role is invalid" })
  role: userRoles;
}

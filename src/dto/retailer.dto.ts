import { IsNotEmpty, IsDefined } from "class-validator";

export class retailerDto {
  @IsDefined({ message: "Name is required" })
  @IsNotEmpty()
  name: string;

  @IsDefined({ message: "Mobile number is required" })
  @IsNotEmpty()
  mobile: string;

  @IsDefined({ message: "Address is required" })
  @IsNotEmpty()
  address: string;
}

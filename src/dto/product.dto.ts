import { IsNotEmpty, IsDefined, IsOptional, IsNumber } from "class-validator";

export class productDto {
  @IsDefined({ message: "Name is required" })
  @IsNotEmpty()
  name: string;

  @IsDefined({ message: "Mobile number is required" })
  @IsNotEmpty()
  @IsNumber()
  unit_price: number;

  @IsDefined({ message: "Address is required" })
  @IsNotEmpty()
  company: string;

  @IsDefined({ message: "Address is required" })
  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  stock: number;
}

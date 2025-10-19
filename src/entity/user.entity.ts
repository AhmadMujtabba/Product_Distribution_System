import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { userRoles } from "../enum/userroles.enum";
import { Order } from "./order.entity";
import { Retailer } from "./retailer.entity";
@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({
    type: "enum",
    enum: userRoles,
    default: userRoles.STAFF,
    nullable: false,
  })
  role: userRoles;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  mobile: number;

  @Column({ nullable: true })
  otp: number;

  @Column({ nullable: true })
  otp_expiry: Date;

  @Column({ nullable: false, default: false })
  verification_status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Order, (order) => order.order_by)
  orders: Order[];

  @OneToMany(() => Retailer, (retailer) => retailer.created_by)
  retailers: Retailer[];
}

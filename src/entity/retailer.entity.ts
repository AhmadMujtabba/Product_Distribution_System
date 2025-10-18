import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Order } from "./order.entity";
@Entity({ name: "retailers" })
export class Retailer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: String;

  @Column({ nullable: false })
  mobile: number;

  @Column({ nullable: false })
  address: String;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Order, (order) => order.retailer_id)
  orders: Order[];
}

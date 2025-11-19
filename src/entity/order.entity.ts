import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { orderStatus } from "../enum/orderstatus.enum";
import { User } from "./user.entity";
import { Retailer } from "./retailer.entity";
import { OrderItems } from "./order_items.entity";
@Entity({ name: "orders" })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  order_date: Date = new Date();

  @Column({ type: "enum", enum: orderStatus, default: orderStatus.PENDING })
  order_status: orderStatus;
  // these 2 colums will come as foreign keys
  @ManyToOne(() => User, (order_by) => order_by.orders)
  @JoinColumn({ name: "order_by" })
  order_by: User;

  @ManyToOne(() => Retailer, (retailer_id) => retailer_id.orders)
  @JoinColumn({ name: "retailer_id" })
  retailer_id: Retailer;
  //----------------------------------------

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => OrderItems, (order_items) => order_items.order)
  order_items: OrderItems[];
}

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
import { Order } from "./order.entity";
import { User } from "./user.entity";
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

  @ManyToOne(() => User, (created_by) => created_by.retailers)
  @JoinColumn({ name: "created_by" })
  created_by: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Order, (order) => order.retailer_id)
  orders: Order[];
}

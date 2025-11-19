import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
} from "typeorm";
import { Order } from "./order.entity";
import { Product } from "./products.entity";

@Entity({ name: "order_items" })
export class OrderItems {
  @PrimaryGeneratedColumn()
  id: number;
  // these colums will come as foreign keys
  @ManyToOne(() => Order, (order) => order.order_items)
  @JoinColumn({ name: "order" })
  order: Order;

  @ManyToOne(() => Product, (product) => product.order_items)
  @JoinColumn({ name: "product" })
  product: Product;
  //-----------------------------------------
  @Column({ nullable: false })
  unit_price: number;

  @Column({ nullable: false })
  quantity: number;

  @Column({ nullable: false })
  total_price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // @BeforeInsert()
  // setUnitPriceFromProduct() {
  //   if (this.product) {
  //     this.unit_price = this.product.unit_price;
  //     this.total_price = this.product.unit_price * this.quantity;
  //   }
  // }
}

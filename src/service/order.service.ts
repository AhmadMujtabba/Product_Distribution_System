import { Repository } from "typeorm";
import { Order } from "../entity/order.entity";
import { OrderItems } from "../entity/order_items.entity";
import { DataSource } from "typeorm";
import { Product } from "../entity/products.entity";

export class orderService {
  constructor(
    private orderRepository: Repository<Order>,
    private orderItemsRepository: Repository<OrderItems>,
    private productRepository: Repository<Product>,
    private datasource: DataSource
  ) {}

  async createOrder(orderData: any) {
    return await this.datasource.transaction(async (manager) => {
      const order = this.orderRepository.create({
        order_by: orderData.order_by,
        retailer_id: orderData.retailer_id,
      });
      const savedOrder = await manager.save(order);

      // const items = orderData.items.map((item: any) =>
      //   this.orderItemsRepository.create({
      //     product: item.product,
      //     quantity: item.quantity,
      //     unit_price: item.unit_price,
      //     total_price: item.quantity * item.unit_price,
      //     order: savedOrder,
      //   })
      const items = [];
      for (const item of orderData.items) {
        const product = await this.productRepository.findOne({
          where: { id: item.product },
        });
        // for (const key in item) {
        //   console.log(`${key}: ${typeof item[key]}`);
        // }
        if (!product) throw new Error(`Product does not exist`);
        if (product.stock < item.quantity) {
          throw new Error(
            `Insufficient stock for product ${product.name} (id:${product.id})`
          );
        }
        if (item.quantity <= 0) {
          throw new Error(
            `Quantity should be greater than zero : ${product.name} (id:${product.id})`
          );
        }
        product.stock -= item.quantity;
        await manager.save(product);
        const unit_price = item.unit_price
          ? Number(item.unit_price)
          : product.unit_price;
        const orderItem = this.orderItemsRepository.create({
          order: savedOrder,
          product: product,
          quantity: item.quantity,
          unit_price: unit_price,
          total_price: item.quantity * unit_price,
        });
        items.push(orderItem);
      }
      await manager.save(items);

      return { order: savedOrder, item: items };
    });
  }
}

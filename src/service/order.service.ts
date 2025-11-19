import { Repository } from "typeorm";
import { Order } from "../entity/order.entity";
import { OrderItems } from "../entity/order_items.entity";
import { DataSource } from "typeorm";

export class orderService {
  constructor(
    private orderRepository: Repository<Order>,
    private orderItemsRepository: Repository<OrderItems>,
    private datasource: DataSource
  ) {}

  async createOrder(orderData: any) {
    return await this.datasource.transaction(async (manager) => {
      const order = this.orderRepository.create({
        order_by: orderData.order_by,
        retailer_id: orderData.retailer_id,
      });
      const savedOrder = await manager.save(order);

      const items = orderData.items.map((item: any) =>
        this.orderItemsRepository.create({
          product: item.product,
          quantity: item.quantity,
          unit_price: item.unit_price,
          total_price: item.quantity * item.unit_price,
          order: savedOrder,
        })
      );

      await manager.save(items);
      // console.log(savedOrder, items);
      return { order: savedOrder, item: items };
    });
  }
}

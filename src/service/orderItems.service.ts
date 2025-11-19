import { Repository } from "typeorm";
import { OrderItems } from "../entity/order_items.entity";

export class orderItemsService {
  constructor(private orderItemsRepository: Repository<OrderItems>) {}

  async addItems(orderitems: Partial<OrderItems>): Promise<OrderItems> {
    const neworder = this.orderItemsRepository.create(orderitems);
    return await this.orderItemsRepository.save(neworder);
  }
}

import { Repository } from "typeorm";
import { Retailer } from "../entity/retailer.entity";

export class retailerService {
  constructor(private retailerRepository: Repository<Retailer>) {}

  async findAll(): Promise<Retailer[]> {
    return await this.retailerRepository.find({ relations: ["created_by"] });
  }

  async findById(id: number): Promise<Retailer | null> {
    return await this.retailerRepository.findOne({
      where: { id },
      relations: ["created_by"],
    });
  }

  async createRetailer(retailer: Retailer): Promise<Retailer> {
    const newretailer = this.retailerRepository.create(retailer);
    return await this.retailerRepository.save(newretailer);
  }

  async updateRetailer(
    id: number,
    retailerData: Partial<Retailer>
  ): Promise<Retailer | null> {
    const retailer = await this.retailerRepository.findOneBy({ id });
    if (!retailer) {
      throw new Error("Retailer not found");
    }
    this.retailerRepository.merge(retailer, retailerData);
    return await this.retailerRepository.save(retailer);
  }

  async deleteRetailer(id: number): Promise<boolean> {
    const user = await this.retailerRepository.delete({ id });
    if (user.affected === 0) {
      return false;
    }
    return true;
  }
}

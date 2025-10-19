import { Repository } from "typeorm";
import { Product } from "../entity/products.entity";

export class productService {
  constructor(private productRepository: Repository<Product>) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findById(id: number): Promise<Product | null> {
    return await this.productRepository.findOne({
      where: { id },
    });
  }

  async addProduct(product: Product): Promise<Product> {
    const newproduct = this.productRepository.create(product);
    return await this.productRepository.save(newproduct);
  }

  async updateProduct(
    id: number,
    productData: Partial<Product>
  ): Promise<Product | null> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new Error("Product not found");
    }
    this.productRepository.merge(product, productData);
    return await this.productRepository.save(product);
  }

  async deleteProduct(id: number): Promise<boolean> {
    const user = await this.productRepository.delete({ id });
    if (user.affected === 0) {
      return false;
    }
    return true;
  }
}

import { DataSource, Repository, EntityManager } from 'typeorm';
import { Product } from '../entities/product.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }

  async createProduct(product: Product): Promise<Product> {
    return this.save(product);
  }

  async findById(id: string, manager?: EntityManager): Promise<Product | null> {
    if (manager) {
      return await manager
        .getRepository(Product)
        .createQueryBuilder('product')
        .setLock('pessimistic_write')
        .where('product.id = :id', { id })
        .getOne();
    } else {
      return await this.findOneBy({ id });
    }
  }

  async setQuantityByProduct(
    product: Product,
    quantity: number,
  ): Promise<Product> {
    product.quantity = quantity;
    return this.save(product);
  }

  async decreaseQuantityAtomic(
    product: Product,
    amount: number,
  ): Promise<boolean> {
    const result = await this.createQueryBuilder()
      .update(Product)
      .set({ quantity: () => 'quantity - :amount' })
      .where('id = :id', { id: product.id })
      .andWhere('quantity >= :amount', { amount })
      .execute();

    if (result.affected === 0) {
      throw new Error('재고 부족');
    }
    return true;
  }

  async decreaseQuantityRaceCondition(
    product: Product,
    amount: number,
    manager?: EntityManager,
  ): Promise<boolean> {
    const repo = manager ? manager.getRepository(Product) : this;
    if (product.quantity >= amount) {
      product.quantity = product.quantity - amount;
      await repo.save(product);
    } else {
      throw new Error('재고 부족');
    }

    return true;
  }
}

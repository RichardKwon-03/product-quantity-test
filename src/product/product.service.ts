import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../database/typeorm/repositories/product.repository';
import { Product } from '../database/typeorm/entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { plainToInstance } from 'class-transformer';
import { SetQuantityProductDto } from './dto/set-quantity-product.dto';
import { DecrQuantityProductDto } from './dto/decr-quantity-product.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly productRepository: ProductRepository,
  ) {}

  async create(dto: CreateProductDto): Promise<Product> {
    const product = plainToInstance(Product, dto);
    return this.productRepository.createProduct(product);
  }

  async findProduct(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async setQuantity(dto: SetQuantityProductDto): Promise<Product> {
    const product = await this.productRepository.findById(dto.id);
    if (!product) {
      throw new NotFoundException(`Product with id ${dto.id} not found`);
    }
    return await this.productRepository.setQuantityByProduct(
      product,
      dto.quantity,
    );
  }

  async decrement(dto: DecrQuantityProductDto): Promise<boolean> {
    const product = await this.productRepository.findById(dto.id);
    if (!product) {
      throw new NotFoundException(`Product with id ${dto.id} not found`);
    }
    return await this.productRepository.decreaseQuantityAtomic(product, 1);
  }

  async decrementRaceCondition(dto: DecrQuantityProductDto): Promise<boolean> {
    const product = await this.productRepository.findById(dto.id);
    if (!product) {
      throw new NotFoundException(`Product with id ${dto.id} not found`);
    }
    return await this.productRepository.decreaseQuantityRaceCondition(
      product,
      1,
    );
  }

  async decrementRaceConditionTx(
    dto: DecrQuantityProductDto,
  ): Promise<boolean> {
    return await this.dataSource.transaction(async (manager) => {
      const product = await this.productRepository.findById(dto.id, manager);
      if (!product) {
        throw new NotFoundException(`Product with id ${dto.id} not found`);
      }
      return await this.productRepository.decreaseQuantityRaceCondition(
        product,
        1,
        manager,
      );
    });
  }
}

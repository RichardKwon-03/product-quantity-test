import { Controller, Post, Patch, Get, Body, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { SetQuantityProductDto } from './dto/set-quantity-product.dto';
import { DecrQuantityProductDto } from './dto/decr-quantity-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get()
  detail(@Query('id') id: string) {
    return this.productService.findProduct(id);
  }

  @Patch('quantity')
  quantity(@Body() dto: SetQuantityProductDto) {
    return this.productService.setQuantity(dto);
  }

  @Patch('quantity/decr')
  decrement(@Body() dto: DecrQuantityProductDto) {
    return this.productService.decrement(dto);
  }

  @Patch('quantity/decr-race-condition')
  decrementRaceConditionTest(@Body() dto: DecrQuantityProductDto) {
    return this.productService.decrementRaceCondition(dto);
  }

  @Patch('quantity/decr-race-condition-tx')
  decrementRaceConditionTestTx(@Body() dto: DecrQuantityProductDto) {
    return this.productService.decrementRaceConditionTx(dto);
  }

  // @Patch('quantity/decr-tx')
  // decrementWithTx(@Body() dto: DecrQuantityProductDto) {
  //   return this.productService.decrement(dto);
  // }
  //
  // @Patch('quantity/decr-redlock')
  // decrementWithRedLock(@Body() dto: DecrQuantityProductDto) {
  //   return this.productService.decrement(dto);
  // }
  //
  // @Patch('quantity/decr-redlock-tx')
  // decrementWithRedLockTx(@Body() dto: DecrQuantityProductDto) {
  //   return this.productService.decrement(dto);
  // }
}

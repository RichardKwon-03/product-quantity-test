import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string; // pk

  @Column({ length: 100 })
  name: string; // 상품명

  @Column({ type: 'int', default: 0 })
  quantity: number; // 재고 수량
}

import { IsInt, Min, IsUUID } from 'class-validator';

export class DecrQuantityProductDto {
  @IsUUID()
  readonly id: string;

  @IsInt()
  @Min(0)
  readonly quantity: number = 1;
}

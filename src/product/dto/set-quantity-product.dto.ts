import { IsUUID, IsInt, Min } from 'class-validator';

export class SetQuantityProductDto {
  @IsUUID()
  readonly id: string;

  @IsInt()
  @Min(0)
  readonly quantity: number;
}

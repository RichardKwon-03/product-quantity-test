import { IsString, IsInt, IsOptional, Length, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(1, 100)
  readonly name: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  readonly quantity: number = 0;
}

import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { ProductStatus } from '../entities/product.entity';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsNumber()
  supplierId?: number;

  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @IsEnum(ProductStatus)
  status: ProductStatus;
}

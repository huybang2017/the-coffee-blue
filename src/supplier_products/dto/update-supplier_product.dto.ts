import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplierProductDto } from './create-supplier_product.dto';
import { IsDecimal, IsInt, IsOptional } from 'class-validator';

export class UpdateSupplierProductDto extends PartialType(
  CreateSupplierProductDto,
) {
  @IsOptional()
  @IsDecimal()
  priceSupplier?: number;

  @IsOptional()
  @IsInt()
  quantityAvailable?: number;
}

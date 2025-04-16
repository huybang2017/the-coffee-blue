import { IsDecimal, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSupplierProductDto {
  @IsNumber()
  @IsNotEmpty()
  supplierId: number;

  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsDecimal()
  @IsNotEmpty()
  priceSupplier: number;

  @IsInt()
  @IsNotEmpty()
  quantityAvailable: number;
}

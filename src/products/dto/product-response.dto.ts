import { ProductStatus } from '../entities/product.entity';

export class ProductResponseDto {
  id: number;
  name: string;
  description: string;
  price: number;
  supplierId: number;
  categoryId?: number;
  status: ProductStatus;
  createdAt: Date;
  updatedAt: Date;
}

import { Module } from '@nestjs/common';
import { SupplierProductsService } from './supplier_products.service';
import { SupplierProductsController } from './supplier_products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierProduct } from 'src/supplier_products/entities/supplier_product.entity';
import { Supplier } from 'src/suppliers/entities/supplier.entity';
import { Product } from 'src/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierProduct, Supplier, Product])],
  controllers: [SupplierProductsController],
  providers: [SupplierProductsService],
})
export class SupplierProductsModule {}

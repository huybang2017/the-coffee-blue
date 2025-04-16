import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from 'src/suppliers/entities/supplier.entity';
import { Product } from 'src/products/entities/product.entity';
import { SupplierProduct } from 'src/supplier_products/entities/supplier_product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier, Product, SupplierProduct])],
  controllers: [SuppliersController],
  providers: [SuppliersService],
})
export class SuppliersModule {}

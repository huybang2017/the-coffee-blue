import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { SupplierProductResponseDto } from './dto/supplier-product-response.dto';
import { SupplierProductsService } from 'src/supplier_products/supplier_products.service';
import { CreateSupplierProductDto } from 'src/supplier_products/dto/create-supplier_product.dto';
import { UpdateSupplierProductDto } from 'src/supplier_products/dto/update-supplier_product.dto';

@Controller('supplier-products')
export class SupplierProductsController {
  constructor(
    private readonly supplierProductsService: SupplierProductsService,
  ) {}

  @Post()
  create(
    @Body() dto: CreateSupplierProductDto,
  ): Promise<SupplierProductResponseDto> {
    return this.supplierProductsService.create(dto);
  }

  @Get()
  findAll(): Promise<SupplierProductResponseDto[]> {
    return this.supplierProductsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SupplierProductResponseDto> {
    return this.supplierProductsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSupplierProductDto,
  ): Promise<SupplierProductResponseDto> {
    return this.supplierProductsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.supplierProductsService.remove(id);
  }
}

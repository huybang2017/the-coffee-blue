import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Supplier } from 'src/suppliers/entities/supplier.entity';
import { SupplierProductResponseDto } from './dto/supplier-product-response.dto';
import { SupplierProduct } from 'src/supplier_products/entities/supplier_product.entity';
import { CreateSupplierProductDto } from 'src/supplier_products/dto/create-supplier_product.dto';
import { UpdateSupplierProductDto } from 'src/supplier_products/dto/update-supplier_product.dto';

@Injectable()
export class SupplierProductsService {
  constructor(
    @InjectRepository(SupplierProduct)
    private readonly supplierProductRepository: Repository<SupplierProduct>,

    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  private toResponseDto(
    supplierProduct: SupplierProduct,
  ): SupplierProductResponseDto {
    return {
      id: supplierProduct.id,
      supplierId: supplierProduct.supplier.id,
      productId: supplierProduct.product.id,
      priceSupplier: supplierProduct.price_supplier,
      quantityAvailable: supplierProduct.quantity_available,
      createdAt: supplierProduct.created_at,
      updatedAt: supplierProduct.updated_at,
    };
  }

  async create(
    dto: CreateSupplierProductDto,
  ): Promise<SupplierProductResponseDto> {
    const supplier = await this.supplierRepository.findOne({
      where: { id: dto.supplierId },
    });
    if (!supplier) throw new NotFoundException('Supplier not found');

    const product = await this.productRepository.findOne({
      where: { id: dto.productId },
    });
    if (!product) throw new NotFoundException('Product not found');

    const supplierProduct = this.supplierProductRepository.create({
      ...dto,
      supplier,
      product,
    });

    const saved = await this.supplierProductRepository.save(supplierProduct);
    return this.toResponseDto(saved);
  }

  async findAll(): Promise<SupplierProductResponseDto[]> {
    const supplierProducts = await this.supplierProductRepository.find({
      relations: ['supplier', 'product'],
    });
    return supplierProducts.map(this.toResponseDto);
  }

  async findOne(id: number): Promise<SupplierProductResponseDto> {
    const supplierProduct = await this.supplierProductRepository.findOne({
      where: { id },
      relations: ['supplier', 'product'],
    });
    if (!supplierProduct)
      throw new NotFoundException('SupplierProduct not found');
    return this.toResponseDto(supplierProduct);
  }

  async update(
    id: number,
    dto: UpdateSupplierProductDto,
  ): Promise<SupplierProductResponseDto> {
    const supplierProduct = await this.supplierProductRepository.findOne({
      where: { id },
      relations: ['supplier', 'product'],
    });

    if (!supplierProduct) {
      throw new NotFoundException('Supplier Product not found');
    }

    const updated = this.supplierProductRepository.merge(
      supplierProduct,
      dto as unknown as DeepPartial<SupplierProduct>,
    );

    const saved = await this.supplierProductRepository.save(updated);

    return {
      id: saved.id,
      supplierId: saved.supplier.id,
      productId: saved.product.id,
      priceSupplier: saved.price_supplier,
      quantityAvailable: saved.quantity_available,
      createdAt: saved.created_at,
      updatedAt: saved.updated_at,
    };
  }

  async remove(id: number): Promise<void> {
    const supplierProduct = await this.supplierProductRepository.findOne({
      where: { id },
    });
    if (!supplierProduct)
      throw new NotFoundException('SupplierProduct not found');
    await this.supplierProductRepository.remove(supplierProduct);
  }
}

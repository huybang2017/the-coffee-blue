import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './entities/supplier.entity';
import { Product } from 'src/products/entities/product.entity';
import { SupplierProduct } from 'src/supplier_products/entities/supplier_product.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SupplierResponseDto } from './dto/supplier-response.dto';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(SupplierProduct)
    private readonly supplierProductRepository: Repository<SupplierProduct>,
  ) {}

  private toResponseDto(supplier: Supplier): SupplierResponseDto {
    return {
      id: supplier.id,
      name: supplier.name,
      contactName: supplier.contact_name,
      phone: supplier.phone,
      email: supplier.email,
      address: supplier.address,
      createdAt: supplier.createdAt,
      updatedAt: supplier.updatedAt,
    };
  }

  async create(dto: CreateSupplierDto): Promise<SupplierResponseDto> {
    const supplier = this.supplierRepository.create(dto);
    const savedSupplier = await this.supplierRepository.save(supplier);
    return this.toResponseDto(savedSupplier);
  }

  async findAll(): Promise<SupplierResponseDto[]> {
    const suppliers = await this.supplierRepository.find();
    return suppliers.map(this.toResponseDto);
  }

  async findOne(id: number): Promise<SupplierResponseDto> {
    const supplier = await this.supplierRepository.findOne({ where: { id } });
    if (!supplier) throw new NotFoundException('Supplier not found');
    return this.toResponseDto(supplier);
  }

  async update(
    id: number,
    dto: UpdateSupplierDto,
  ): Promise<SupplierResponseDto> {
    const supplier = await this.supplierRepository.findOne({ where: { id } });
    if (!supplier) throw new NotFoundException('Supplier not found');

    const updatedSupplier = this.supplierRepository.merge(supplier, dto);
    const savedSupplier = await this.supplierRepository.save(updatedSupplier);
    return this.toResponseDto(savedSupplier);
  }

  async remove(id: number): Promise<void> {
    const supplier = await this.supplierRepository.findOne({ where: { id } });
    if (!supplier) throw new NotFoundException('Supplier not found');
    await this.supplierRepository.remove(supplier);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Supplier } from 'src/suppliers/entities/supplier.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}

  private toResponseDto(product: Product): ProductResponseDto {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      supplierId: product.supplier.id,
      categoryId: product.category ? product.category.id : null,
      status: product.status,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  async create(dto: CreateProductDto): Promise<ProductResponseDto> {
    const supplier = await this.supplierRepository.findOne({
      where: { id: dto.supplierId },
    });
    if (!supplier) throw new NotFoundException('Supplier not found');

    const category = dto.categoryId
      ? await this.categoryRepository.findOne({ where: { id: dto.categoryId } })
      : null;
    if (dto.categoryId && !category)
      throw new NotFoundException('Category not found');

    const product = this.productRepository.create({
      ...dto,
      supplier,
      category,
    });

    const saved = await this.productRepository.save(product);
    return this.toResponseDto(saved);
  }

  async findAll(): Promise<ProductResponseDto[]> {
    const products = await this.productRepository.find({
      relations: ['supplier', 'category'],
    });
    return products.map(this.toResponseDto);
  }

  async findOne(id: number): Promise<ProductResponseDto> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['supplier', 'category'],
    });
    if (!product) throw new NotFoundException('Product not found');
    return this.toResponseDto(product);
  }

  async update(id: number, dto: UpdateProductDto): Promise<ProductResponseDto> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['supplier', 'category'],
    });
    if (!product) throw new NotFoundException('Product not found');

    const updated = this.productRepository.merge(product, dto);
    const saved = await this.productRepository.save(updated);
    return this.toResponseDto(saved);
  }

  async remove(id: number): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    await this.productRepository.remove(product);
  }
}

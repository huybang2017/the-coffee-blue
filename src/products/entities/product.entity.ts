import { Category } from 'src/categories/entities/category.entity';
import { OrderItem } from 'src/order_items/entities/order_item.entity';
import { SupplierProduct } from 'src/supplier_products/entities/supplier_product.entity';
import { Supplier } from 'src/suppliers/entities/supplier.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

export enum ProductStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity('products')
@Index('product_status', ['supplier_id', 'status'])
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal' })
  price: number;

  @ManyToOne(() => Supplier, (supplier) => supplier.products)
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;

  @Column()
  supplier_id: number;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(
    () => SupplierProduct,
    (supplierProduct) => supplierProduct.product,
  )
  supplierProducts: SupplierProduct[];

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.ACTIVE,
  })
  status: ProductStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    comment: 'Timestamp when user data was last updated',
  })
  updatedAt: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];
}

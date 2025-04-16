import { Product } from 'src/products/entities/product.entity';
import { SupplierProduct } from 'src/supplier_products/entities/supplier_product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('suppliers')
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  contact_name: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  address: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    comment: 'Timestamp when user data was last updated',
  })
  updatedAt: Date;

  @OneToMany(() => Product, (product) => product.supplier)
  products: Product[];

  @OneToMany(
    () => SupplierProduct,
    (supplierProduct) => supplierProduct.supplier,
  )
  supplierProducts: SupplierProduct[];
}

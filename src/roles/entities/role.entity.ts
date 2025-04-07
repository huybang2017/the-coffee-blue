import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryColumn()
  id: number;

  @Column({ unique: true })
  name: string; // 'Admin', 'User'

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    comment: 'Timestamp when role data was last updated',
  })
  updatedAt: Date;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}

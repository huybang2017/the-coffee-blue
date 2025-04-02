import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({ email, password: hashedPassword });
    return this.userRepo.save(user);
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  async update(id: number, email: string) {
    await this.userRepo.update(id, { email });
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.userRepo.delete(id);
    return { deleted: true };
  }

  findByEmail(email: string) {
    return this.userRepo.findOneBy({ email });
  }
}

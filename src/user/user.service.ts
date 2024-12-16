import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
      ) {}
    
      async createUser(login: string, email: string, password: string): Promise<User> {
        const user = this.userRepository.create({ login, email, password });
        return await this.userRepository.save(user);
      }
    
      async findAll(): Promise<User[]> {
        return this.userRepository.find();
      }
    
      async findOne(id: number): Promise<User> {
        return this.userRepository.findOneBy({ id });
      }
}

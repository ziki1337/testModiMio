import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Создание нового пользователя
  async createUser(login: string, email: string, password: string) {
    const newUser = this.userRepository.create({ login, email, password });
    return await this.userRepository.save(newUser);
  }

  // Поиск пользователя по email
  async findByLogin(login: string) {
    return this.userRepository.findOne({ where: { login } });
  }
  
  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  // Получение всех пользователей
  async findAll() {
    return this.userRepository.find();
  }

  // Получение пользователя по ID
  async findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async findAllPaginated(page: number = 1, limit: number = 10): Promise<{ data: User[]; total: number }> {
    const [data, total] = await this.userRepository.findAndCount({
      select: ['email', 'login'], // Выбираем только нужные поля
      skip: (page - 1) * limit,  // Пропускаем записи для текущей страницы
      take: limit,               // Количество записей на страницу
    });

    return { data, total };
  }
}
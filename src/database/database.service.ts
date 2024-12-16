import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, // Внедряем репозиторий
  ) {}

  // Метод для проверки и создания таблицы
  async checkAndCreateTables(): Promise<void> {
    const userTableExist = await this.userRepository.query(
      "SELECT to_regclass('public.user');", // Проверка на существование таблицы
    );
    if (!userTableExist[0].to_regclass) {
      console.log('Таблица "user" не существует. Создаю...');
      await this.userRepository.query(`CREATE TABLE user (
        id SERIAL PRIMARY KEY,
        login VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );`);
    } else {
      console.log('Таблица "user" уже существует.');
    }
  }
}
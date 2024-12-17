import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Admin } from '../admin/admin.entity';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, // Внедряем репозиторий
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
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

    const adminTableExist = await this.adminRepository.query(
      "SELECT to_regclass('public.admin');",
    );
    if (!adminTableExist[0].to_regclass) {
      console.log('Таблица "admin" не существует. Создаю...');
      await this.adminRepository.query(`CREATE TABLE admin (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );`);
    } else {
      console.log('Таблица "admin" уже существует.');
    }
  }
}
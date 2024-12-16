import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { DatabaseService } from './database.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Подключаем репозиторий User
  providers: [DatabaseService],
  exports: [DatabaseService], // Экспортируем сервис для других модулей
})
export class DatabaseModule {}
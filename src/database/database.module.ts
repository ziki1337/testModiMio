import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { DatabaseService } from './database.service';
import { Admin } from '../admin/admin.entity';
import { BlacklistedToken } from '../blacklist/blacklist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Admin, BlacklistedToken]),  // Подключаем репозиторий User
  ],
  providers: [DatabaseService],
  exports: [DatabaseService], // Экспортируем сервис для других модулей
})
export class DatabaseModule {}
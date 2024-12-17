import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module'; // Импортируем DatabaseModule
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/admin.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'modimioDB',
      entities: [User, Admin],
      synchronize: true, // Опционально: автоматически синхронизирует сущности с базой
    }),
    UserModule,
    DatabaseModule,
    AuthModule,
    AdminModule, // Добавляем DatabaseModule в imports
  ],
})
export class AppModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module'; // Импортируем DatabaseModule
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/admin.entity';
import { BlacklistModule } from './blacklist/blacklist.module';
import { DatabaseService } from './database/database.service';
import { BlacklistedToken } from './blacklist/blacklist.entity';
import { UserBlacklistModule } from './userblacklist/userblacklist.module';
import { UserBlacklistedToken } from './userblacklist/userblacklist.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'modimioDB',
      entities: [User, Admin, BlacklistedToken, UserBlacklistedToken],
      synchronize: true, 
    }),
    UserModule,
    AdminModule,
    BlacklistModule,
    UserBlacklistModule,  // Должен быть импортирован до DatabaseModule
    DatabaseModule,  
    AuthModule,
  ],
  providers: [DatabaseService],
})
export class AppModule {}
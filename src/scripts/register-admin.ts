import { NestFactory } from '@nestjs/core';
import { AdminService } from '../admin/admin.service';
import { AppModule } from '../app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const adminService = app.get(AdminService);

  // Пример данных для администратора (замените на ввод с prompt при необходимости)
  const email = 'admin@example.com';
  const password = 'securepassword';

  await adminService.registerAdminByScript(email, password);

  console.log(`Admin successfully registered with email: ${email}`);
  await app.close();
}

bootstrap().catch((err) => {
  console.error('Error:', err);
});
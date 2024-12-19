import { NestFactory } from '@nestjs/core';
import { AdminService } from '../admin/admin.service';
import { AppModule } from '../app.module';
import inquirer from 'inquirer';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const adminService = app.get(AdminService);

  // Использую inquirer для запроса данных
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'email',
      message: 'Введите email: ',
      validate: (input) => input.includes('@') ? true : 'Введите корректный email', 
    },
    {
      type: 'password', 
      name: 'password',
      message: 'Введите пароль: ',
      mask: '*',
      validate: (input) => input.length >= 6 ? true : 'Пароль должен быть не менее 6 символов',
    },
  ]);

  try {
    await adminService.registerAdminByScript(answers.email, answers.password);
    console.log(`Admin successfully registered with email: ${answers.email}`);
  } catch (err) {
    console.error('Error registering admin:', err);
  } finally {
    await app.close();
  }
}

bootstrap().catch((err) => {
  console.error('Error:', err);
});
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_blacklisted_token')  // Имя таблицы
export class UserBlacklistedToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  expiresAt: Date;
}
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class BlacklistedToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  expiresAt: Date;  // Время истечения срока действия токена
}
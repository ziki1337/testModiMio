import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('admin')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
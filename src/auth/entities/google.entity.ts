import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity(' usersgoogle')
export class UserGoogle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  sobrenome: string;

  @Column()
  email: string;

  @Column()
  senha: string;
}

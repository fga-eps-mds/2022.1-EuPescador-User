import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('token')
export class Token {
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @Column({nullable: true})
  value?: string;

  @Column({nullable: true})
  user_id?: string;
}
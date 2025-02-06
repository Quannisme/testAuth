import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;
  @Column({ name: 'name', type: 'varchar' })
  name: string;
  @Column({ name: 'password', type: 'varchar' })
  password: string;
}

import { CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity()
export class CommonEntity {
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

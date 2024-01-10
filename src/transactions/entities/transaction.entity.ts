import { IsEnum, IsNumber, IsString } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TransactionType } from './transaction.enum';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Transaction extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  @IsEnum(TransactionType)
  transaction_type: TransactionType;

  @Column()
  @IsNumber()
  amount: number;

  @Column()
  @IsNumber()
  count: number;

  @Column()
  @IsNumber()
  balance_after_transaction: number;

  @Column()
  @IsString()
  notes: string;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

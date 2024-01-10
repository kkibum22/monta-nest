import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { CommonEntity } from './common.entity';
import { IsNumber } from 'class-validator';
import { Egg } from './egg.entity';

@Entity()
export class EggInventory extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNumber()
  sell_price: number;

  @ManyToOne(() => Egg)
  @JoinColumn({ name: 'egg_id' })
  egg: Egg;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
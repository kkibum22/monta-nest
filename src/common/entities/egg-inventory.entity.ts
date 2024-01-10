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
import { Member } from 'src/members/entities/member.entity';

@Entity()
export class EggInventory extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  egg_inventory_id: string;

  @Column()
  @IsNumber()
  sell_price: number;

  @ManyToOne(() => Egg)
  @JoinColumn({ name: 'egg_id' })
  egg: Egg;

  @ManyToOne(() => Member)
  @JoinColumn({ name: 'member_id' })
  member: Member;
}

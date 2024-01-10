import { IsNumber } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Member } from 'src/members/entities/member.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Statistic extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  @IsNumber()
  total_time: number;

  @Column({ nullable: true })
  @IsNumber()
  pay_egg_count: number;

  @OneToOne(() => Member, (member) => member.statistic)
  @JoinColumn({ name: 'member_id' })
  member: Member;
}

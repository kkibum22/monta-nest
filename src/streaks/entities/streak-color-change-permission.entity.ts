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
export class StreakColorChangePermission extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  available_change: number;

  @OneToOne(() => Member, (member) => member.streak_color_change_permission)
  @JoinColumn({ name: 'member_id' })
  member: Member;
}

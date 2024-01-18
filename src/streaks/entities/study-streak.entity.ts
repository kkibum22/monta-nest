import { IsNumber } from 'class-validator';
import { CommonEntity } from '@src/common/entities/common.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Palette } from './palette.entity';
import { Member } from '@src/members/entities/member.entity';

@Entity()
export class StudyStreak extends CommonEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  study_streak_id: number;

  @Column()
  @IsNumber()
  current_streak: number;

  @Column()
  @IsNumber()
  longest_streak: number;

  @OneToOne(() => Member, (member) => member.study_streak, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @ManyToOne(
    () => Palette,
    (palette) => {
      palette.study_streaks;
    },
    { nullable: false },
  )
  @JoinColumn({ name: 'palette_id' })
  palette: Palette;
}

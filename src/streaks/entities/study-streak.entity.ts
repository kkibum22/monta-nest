import { IsNumber } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Palette } from './palette.entity';
import { Member } from 'src/members/entities/member.entity';

@Entity()
export class StudyStreak extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  current_streak: number;

  @Column()
  @IsNumber()
  longest_streak: number;

  @OneToOne(() => Member, (member) => member.account)
  @JoinColumn({ name: 'member' })
  member: Member;

  @ManyToOne(
    () => Palette,
    (palette) => {
      palette.study_streaks;
    },
  )
  @JoinColumn({ name: 'palette_id' })
  palette: Palette;
}

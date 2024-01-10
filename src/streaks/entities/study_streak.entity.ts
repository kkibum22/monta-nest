import { IsNumber } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { Palette } from './palette.entity';

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

  @OneToOne(() => User, (user) => user.account)
  user: User;

  @ManyToOne(
    () => Palette,
    (palette) => {
      palette.study_streaks;
    },
  )
  palette: Palette;
}

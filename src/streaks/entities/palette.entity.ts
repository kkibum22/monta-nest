import { IsEnum, IsString } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PaletteGrade } from './palette.enum';
import { StudyStreak } from './study-streak.entity';

@Entity()
export class Palette extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: PaletteGrade,
    default: PaletteGrade.RARE,
  })
  @IsEnum(PaletteGrade)
  grade: PaletteGrade;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  light_color: string;

  @Column()
  @IsString()
  normal_color: string;

  @Column()
  @IsString()
  dark_color: string;

  @Column()
  @IsString()
  darker_color: string;

  @OneToMany(() => StudyStreak, (studyStreak) => studyStreak.palette)
  study_streaks: StudyStreak[];
}

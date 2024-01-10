import { IsNumber, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from 'src/common/entities/common.entity';

@Entity()
export class Probability extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  probability_id: string;

  @Column()
  @IsString()
  egg_grade: string;

  @Column()
  @IsString()
  character_grade: string;

  @Column()
  @IsNumber()
  odds: number;
}

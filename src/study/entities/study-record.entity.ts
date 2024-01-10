import { IsNumber } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { StudyCategory } from './study-category.entity';

@Entity()
export class StudyRecord extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @IsNumber()
  duration: number;

  @ManyToOne(() => User, (user) => user.study_categories)
  user: User;

  @ManyToOne(
    () => StudyCategory,
    (studyCategory) => studyCategory.study_records,
  )
  study_category: StudyCategory;
}

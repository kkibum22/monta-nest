import { IsNumber } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { StudyCategory } from './study-category.entity';
import { Member } from 'src/members/entities/member.entity';

@Entity()
export class StudyRecord extends CommonEntity {
  @PrimaryGeneratedColumn()
  study_record_id: number;

  @Column()
  @IsNumber()
  duration: number;

  @ManyToOne(() => Member, (member) => member.study_categories)
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @ManyToOne(
    () => StudyCategory,
    (studyCategory) => studyCategory.study_records,
  )
  @JoinColumn({ name: 'study_category_id' })
  study_category: StudyCategory;
}

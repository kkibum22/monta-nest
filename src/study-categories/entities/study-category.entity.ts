import { IsBoolean, IsString } from 'class-validator';
import { CommonEntity } from '@src/common/entities/common.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { StudyRecord } from '../../studies/entities/study-record.entity';
import { Member } from '@src/members/entities/member.entity';

@Entity()
export class StudyCategory extends CommonEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  study_category_id: number;

  @Column({ type: 'varchar', length: 50 })
  @IsString()
  subject: string;

  @Column()
  @IsBoolean()
  hidden: boolean;

  @ManyToOne(() => Member, (member) => member.study_categories, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @OneToMany(() => StudyRecord, (studyRecord) => studyRecord.study_category)
  study_records: StudyRecord[];
}

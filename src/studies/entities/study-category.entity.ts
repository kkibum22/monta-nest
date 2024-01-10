import { IsBoolean, IsString } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { StudyRecord } from './study-record.entity';

@Entity()
export class StudyCategory extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @IsString()
  subject: string;

  @Column()
  @IsBoolean()
  hidden: boolean;

  @ManyToOne(() => User, (user) => user.study_categories)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => StudyRecord, (studyRecord) => studyRecord.study_category)
  study_records: StudyCategory[];
}

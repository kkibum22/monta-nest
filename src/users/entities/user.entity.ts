import { IsEnum, IsNumber, IsString } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserRole } from './user-role.enum';
import { Account } from 'src/auth/entities/account.entity';
import { CommonEntity } from 'src/common/entities/common.entity';
import { StudyCategory } from 'src/study/entities/study-category.entity';

@Entity()
export class User extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  nickname: string;

  @Column()
  @IsString()
  email: string;

  @Column({
    nullable: true,
  })
  @IsString()
  image_url: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  @IsEnum(UserRole)
  role: UserRole;

  @Column({
    nullable: true,
  })
  @IsString()
  active_record_id: string;

  @Column({
    nullable: true,
  })
  @IsString()
  active_egg_id: string;

  @Column({
    default: 0,
  })
  @IsNumber()
  point: number;

  @OneToOne(() => Account, (account) => account.user)
  @JoinColumn()
  account: Account;

  @OneToMany(() => StudyCategory, (studyCategory) => studyCategory.user)
  study_categories: StudyCategory[];
}

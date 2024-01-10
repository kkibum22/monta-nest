import { IsBoolean, IsString } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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
  user: User;
}

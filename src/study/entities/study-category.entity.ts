import { IsBoolean, IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class StudyCategory {
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

import { IsNumber } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class Statistic extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  @IsNumber()
  total_time: number;

  @Column({ nullable: true })
  @IsNumber()
  pay_egg_count: number;

  @OneToOne(() => User, (user) => user.statistic)
  user: User;
}

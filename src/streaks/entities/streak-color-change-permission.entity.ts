import { IsNumber } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class StreakColorChangePermission extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNumber()
  available_change: number;

  @OneToOne(() => User, (user) => user.streak_color_change_permission)
  user: User;
}

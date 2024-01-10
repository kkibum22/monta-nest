import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './user-role.enum';

@Entity()
export class User {
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
}

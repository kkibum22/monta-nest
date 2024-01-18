import { CommonEntity } from '@src/common/entities/common.entity';
import { MemberRole } from '@src/members/entities/member-role.enum';
import { Member } from '@src/members/entities/member.entity';
import { IsEnum, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class Account extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  account_id: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  @IsString()
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  @IsString()
  password: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  @IsString()
  email: string;

  @Column({
    type: 'enum',
    enum: MemberRole,
    default: MemberRole.USER,
  })
  @IsEnum(MemberRole)
  role: MemberRole;

  @OneToOne(() => Member, (member) => member.account)
  member: Member;
}
